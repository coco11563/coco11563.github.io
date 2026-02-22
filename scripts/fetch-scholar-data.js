const fs = require('fs');
const path = require('path');

/**
 * Google Scholar 数据采集脚本
 * 使用 SerpAPI 获取真实学术数据
 */

// 配置信息
const CONFIG = {
  scholarId: process.env.SCHOLAR_ID || 'YGwukbUAAAAJ',
  apiKey: process.env.SERPAPI_KEY,
  dataDir: path.join(__dirname, '../public/data'),
  maxRetries: 3,
  retryDelay: 2000,
};

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 带重试的API请求
 */
async function fetchWithRetry(apiCall, retries = CONFIG.maxRetries) {
  try {
    return await apiCall();
  } catch (error) {
    console.log(`API请求失败: ${error.message}`);
    if (retries > 0) {
      console.log(`等待 ${CONFIG.retryDelay}ms 后重试...`);
      await delay(CONFIG.retryDelay);
      return fetchWithRetry(apiCall, retries - 1);
    }
    throw error;
  }
}

/**
 * 使用 SerpAPI 获取 Google Scholar 数据
 */
async function fetchScholarDataWithSerpAPI(scholarId) {
  if (!CONFIG.apiKey) {
    console.log('⚠️  未配置 SERPAPI_KEY，使用备用数据源');
    return await fetchScholarDataFallback();
  }

  try {
    console.log('🔍 正在从 Google Scholar 获取数据...');
    
    // 使用原生HTTPS请求（避免依赖问题）
    const https = require('https');
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${scholarId}&api_key=${CONFIG.apiKey}&num=100&sort=cited`;
    const apiUrl = new URL(url);
    
    const authorData = await new Promise((resolve, reject) => {
      const req = https.get({
        hostname: apiUrl.hostname,
        path: apiUrl.pathname + apiUrl.search,
        headers: { 'User-Agent': 'Node.js' }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.error) {
              reject(new Error(result.error));
            } else {
              resolve(result);
            }
          } catch (parseError) {
            reject(parseError);
          }
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });

    console.log(`✅ 成功获取学者数据: ${authorData.author?.name}`);
    
    return processScholarData(authorData);
    
  } catch (error) {
    console.error('❌ SerpAPI 获取失败:', error.message);
    return await fetchScholarDataFallback();
  }
}

/**
 * 从现有JSON文件安全读取
 */
function readJsonSafe(filename, fallback) {
  const filePath = path.join(CONFIG.dataDir, filename);
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (error) {
    console.warn(`⚠️  读取 ${filename} 失败: ${error.message}`);
  }
  return fallback;
}

/**
 * 从论文列表计算指标（当无法从API获取时）
 */
function computeMetricsFromPublications(publications, existingMetrics) {
  if (!publications || publications.length === 0) return existingMetrics;

  const sorted = [...publications]
    .map(p => p.citations || 0)
    .sort((a, b) => b - a);

  const totalCitations = sorted.reduce((sum, c) => sum + c, 0);

  // 计算 h-index
  let hIndex = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] >= i + 1) hIndex = i + 1;
    else break;
  }

  // 计算 i10-index
  const i10Index = sorted.filter(c => c >= 10).length;

  return {
    totalCitations,
    totalCitationsRecent: existingMetrics?.totalCitationsRecent ?? totalCitations,
    hIndex,
    hIndexRecent: existingMetrics?.hIndexRecent ?? hIndex,
    i10Index,
    i10IndexRecent: existingMetrics?.i10IndexRecent ?? i10Index,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * 使用 Semantic Scholar API 获取数据（免费，无需API Key）
 */
async function fetchScholarDataSemanticScholar(scholarName) {
  console.log('🔬 尝试使用 Semantic Scholar API（免费）...');
  const https = require('https');

  try {
    // Step 1: 搜索作者
    const searchUrl = `https://api.semanticscholar.org/graph/v1/author/search?query=${encodeURIComponent(scholarName)}&fields=name,affiliations,citationCount,hIndex,paperCount&limit=5`;

    const searchResults = await new Promise((resolve, reject) => {
      const req = https.get(searchUrl, { headers: { 'User-Agent': 'Academic-Homepage/1.0' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    });

    if (!searchResults.data || searchResults.data.length === 0) {
      throw new Error('未找到作者');
    }

    // 找到匹配的作者（优先匹配 CAS/CNIC 相关的）
    const author = searchResults.data.find(a =>
      a.affiliations?.some(aff => aff.toLowerCase().includes('chinese academy') || aff.toLowerCase().includes('cnic'))
    ) || searchResults.data[0];

    console.log(`✅ 找到作者: ${author.name} (ID: ${author.authorId})`);

    // Step 2: 获取作者详细信息和论文
    const detailUrl = `https://api.semanticscholar.org/graph/v1/author/${author.authorId}?fields=name,citationCount,hIndex,paperCount,papers.year,papers.citationCount,papers.title`;

    const authorDetail = await new Promise((resolve, reject) => {
      const req = https.get(detailUrl, { headers: { 'User-Agent': 'Academic-Homepage/1.0' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    });

    // 从论文的引用数据计算 citations-by-year（按论文发表年份汇总）
    const citationsByYear = {};
    (authorDetail.papers || []).forEach(paper => {
      if (paper.year && paper.citationCount > 0) {
        citationsByYear[paper.year] = (citationsByYear[paper.year] || 0) + paper.citationCount;
      }
    });

    const citationsByYearArray = Object.entries(citationsByYear)
      .map(([year, citations]) => ({ year: parseInt(year), citations }))
      .sort((a, b) => a.year - b.year);

    // 读取现有数据
    const existingMetrics = readJsonSafe('metrics.json', null);

    const metrics = {
      totalCitations: authorDetail.citationCount ?? existingMetrics?.totalCitations ?? 853,
      totalCitationsRecent: existingMetrics?.totalCitationsRecent ?? authorDetail.citationCount ?? 790,
      hIndex: authorDetail.hIndex ?? existingMetrics?.hIndex ?? 16,
      hIndexRecent: existingMetrics?.hIndexRecent ?? authorDetail.hIndex ?? 15,
      i10Index: existingMetrics?.i10Index ?? 20,
      i10IndexRecent: existingMetrics?.i10IndexRecent ?? 19,
      lastUpdated: new Date().toISOString()
    };

    console.log(`📊 Semantic Scholar 数据: 引用=${metrics.totalCitations}, h-index=${metrics.hIndex}`);

    // 读取现有的profile（不覆盖）
    const profile = readJsonSafe('scholar-profile.json', {
      name: 'Meng Xiao (肖濛)',
      nameZh: '肖濛',
      affiliation: ['Computer Network Information Center, CAS', 'Duke-NUS Medical School, NUS'],
      email: ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg'],
      homepage: 'https://coco11563.github.io',
      interests: ['AI4S', 'AI4Data', 'Data Mining'],
      image: '/indexfiles/me.png',
      verified: true
    });

    // 将 Semantic Scholar 论文转为标准格式（仅用于更新引用数）
    const publications = (authorDetail.papers || [])
      .filter(p => p.title)
      .map((p, i) => ({
        id: `ss_pub_${i}`,
        title: p.title,
        authors: [],
        venue: '',
        year: p.year || new Date().getFullYear(),
        citations: p.citationCount || 0,
        abstract: '',
        urls: {},
        venueType: 'other',
        keywords: extractKeywords(p.title)
      }));

    return { profile, metrics, publications, citationsByYear: citationsByYearArray };

  } catch (error) {
    console.warn(`⚠️  Semantic Scholar API 失败: ${error.message}`);
    return null;
  }
}

/**
 * 备用数据源（先尝试 Semantic Scholar，再回退到本地JSON文件）
 */
async function fetchScholarDataFallback() {
  // 先尝试 Semantic Scholar（免费API）
  const ssData = await fetchScholarDataSemanticScholar('Meng Xiao');
  if (ssData) {
    return ssData;
  }

  console.log('📋 使用现有JSON数据作为备用数据源');

  const profile = readJsonSafe('scholar-profile.json', {
    name: 'Meng Xiao (肖濛)',
    nameZh: '肖濛',
    affiliation: [
      'Computer Network Information Center, CAS',
      'Duke-NUS Medical School, NUS'
    ],
    email: ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg'],
    homepage: 'https://coco11563.github.io',
    interests: ['AI4S', 'AI4Data', 'Data Mining'],
    image: '/indexfiles/me.png',
    verified: true
  });

  const existingMetrics = readJsonSafe('metrics.json', null);
  const publications = readJsonSafe('publications.json', []);
  const citationsByYear = readJsonSafe('citations-by-year.json', []);

  // 从论文数据重新计算指标（而不是直接使用可能过时的 metrics.json）
  const metrics = publications.length > 0
    ? computeMetricsFromPublications(publications, existingMetrics)
    : existingMetrics ?? {
        totalCitations: 0, totalCitationsRecent: 0,
        hIndex: 0, hIndexRecent: 0,
        i10Index: 0, i10IndexRecent: 0,
        lastUpdated: new Date().toISOString()
      };

  if (publications.length === 0) {
    console.log('⚠️  未找到现有论文数据，数据将为空');
  } else {
    console.log(`✅ 从现有数据读取到 ${publications.length} 篇论文`);
    console.log(`📊 计算指标: 引用=${metrics.totalCitations}, h-index=${metrics.hIndex}, i10=${metrics.i10Index}`);
  }

  return { profile, metrics, publications, citationsByYear };
}

/**
 * 从HTML中提取论文信息
 */
function extractPublicationsFromHTML(htmlContent) {
  const publications = [];
  
  // 预定义的论文数据（从现有网站提取）
  const paperData = [
    {
      title: "GCAL: Adapting Graph Models to Evolving Domain Shifts",
      authors: "Ziyue Qiao, Qianyi Cai, Hao Dong, Jiawei Gu, Pengyang Wang, Meng Xiao*, Xiao Luo, Hui Xiong",
      venue: "ICML",
      year: 2025,
      citations: 0,
      venueType: "conference"
    },
    {
      title: "FastFT: Accelerating Reinforced Feature Transformation via Advanced Exploration Strategies",
      authors: "Tianqi He, Xiaohan Huang, Yi Du, Qingqing Long, Ziyue Qiao, Min Wu, Yanjie Fu, Yuanchun Zhou, Meng Xiao*",
      venue: "IEEE ICDE",
      year: 2025,
      citations: 0,
      venueType: "conference"
    },
    {
      title: "Traceable Group-Wise Self-Optimizing Feature Transformation Learning: A Dual Optimization Perspective",
      authors: "Meng Xiao, Dongjie Wang, Min Wu, Kunpeng Liu, Hui Xiong, Yuanchun Zhou, Yanjie Fu",
      venue: "ACM TKDD",
      year: 2024,
      citations: 15,
      venueType: "journal"
    },
    {
      title: "SCReader: Prompting Large Language Models to Interpret scRNA-seq Data",
      authors: "Cong Li, Qingqing Long, Yuanchun Zhou, Meng Xiao*",
      venue: "IEEE ICDM",
      year: 2024,
      citations: 3,
      venueType: "conference"
    },
    {
      title: "Beyond Discrete Selection: Continuous Embedding Space Optimization for Generative Feature Selection",
      authors: "Meng Xiao, Dongjie Wang, Min Wu, Pengfei Wang, Yuanchun Zhou, Yanjie Fu",
      venue: "IEEE ICDM",
      year: 2023,
      citations: 28,
      venueType: "conference"
    },
    {
      title: "Reinforcement-Enhanced Autoregressive Feature Transformation: Gradient-steered Search in Continuous Space for Postfix Expressions",
      authors: "Dongjie Wang, Meng Xiao, Min Wu, Pengfei Wang, Yuanchun Zhou, Yanjie Fu",
      venue: "NeurIPS",
      year: 2023,
      citations: 42,
      venueType: "conference"
    }
  ];

  return paperData.map((paper, index) => ({
    id: `pub_${index}`,
    title: paper.title,
    authors: paper.authors.split(', '),
    venue: paper.venue,
    year: paper.year,
    citations: paper.citations,
    abstract: '',
    urls: {
      paper: '',
      code: '',
      project: ''
    },
    venueType: paper.venueType,
    keywords: extractKeywords(paper.title)
  }));
}

/**
 * 从标题提取关键词
 */
function extractKeywords(title) {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'via'];
  return title.toLowerCase()
    .split(/[\s\-:]+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .slice(0, 5);
}

/**
 * 生成模拟的按年引用数据
 */
function generateMockCitationsByYear(startYear, endYear) {
  const years = [];
  let totalCitations = 0;
  
  for (let year = startYear; year <= endYear; year++) {
    const yearCitations = Math.floor(Math.random() * 100) + 50;
    totalCitations += yearCitations;
    years.push({
      year,
      citations: yearCitations
    });
  }
  
  return years;
}

/**
 * 处理和标准化Scholar数据
 */
function processScholarData(authorData) {
  // 处理机构信息 - SerpAPI返回字符串，需要转换为数组
  const affiliationStr = authorData.author?.affiliation || authorData.author?.affiliations || '';
  const affiliationArray = typeof affiliationStr === 'string' && affiliationStr
    ? affiliationStr.split(/[;,]\s*/).filter(item => item.trim())
    : ['Computer Network Information Center, CAS', 'Duke-NUS Medical School, NUS'];

  // 处理邮箱信息
  const emailStr = authorData.author?.email || '';
  const emailArray = emailStr.includes('Verified email at') 
    ? ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg']
    : [emailStr].filter(Boolean);

  // 固定的profile数据，不允许自动更新覆盖
  const profile = {
    name: 'Meng Xiao (肖濛)',
    nameZh: '肖濛',
    affiliation: [
      'Computer Network Information Center, CAS',
      'Duke-NUS Medical School, NUS'
    ], // 固定格式，防止被覆盖
    email: ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg'],
    homepage: 'https://coco11563.github.io',
    interests: ['AI4S', 'AI4Data', 'Data Mining'], // 固定兴趣标签
    image: '/indexfiles/me.png', // 固定使用本地图片
    verified: true // 手动设置为已验证
  };

  // 改进的指标提取逻辑
  const citedByTable = authorData.cited_by?.table || [];
  
  const metrics = {
    totalCitations: citedByTable[0]?.citations?.all ??
                   authorData.cited_by?.citations?.all ?? 1163,
    totalCitationsRecent: citedByTable[0]?.citations?.since_2019 ??
                         authorData.cited_by?.citations?.since_2019 ?? 1163,
    hIndex: citedByTable[1]?.h_index?.all ??
           authorData.cited_by?.h_index?.all ?? 18,
    hIndexRecent: citedByTable[1]?.h_index?.since_2019 ??
                 authorData.cited_by?.h_index?.since_2019 ?? 18,
    i10Index: citedByTable[2]?.i10_index?.all ??
             authorData.cited_by?.i10_index?.all ?? 30,
    i10IndexRecent: citedByTable[2]?.i10_index?.since_2019 ??
                   authorData.cited_by?.i10_index?.since_2019 ?? 30,
    lastUpdated: new Date().toISOString()
  };

  const publications = (authorData.articles || []).map((article, index) => ({
    id: `pub_${index}`,
    title: article.title || '',
    authors: article.authors ? article.authors.split(', ') : [],
    venue: article.publication || '',
    year: article.year || new Date().getFullYear(),
    citations: article.cited_by?.value || 0,
    citationsId: article.cited_by?.cites_id || '',
    abstract: '',
    urls: {
      paper: article.link || '',
      citations: article.cited_by?.link || ''
    },
    venueType: determineVenueType(article.publication || ''),
    keywords: extractKeywords(article.title || '')
  }));

  return {
    profile,
    metrics,
    publications,
    citationsByYear: authorData.cited_by?.graph || []
  };
}

/**
 * 判断发表类型
 */
function determineVenueType(venue) {
  const conferences = ['ICML', 'NeurIPS', 'ICLR', 'SIGKDD', 'IJCAI', 'AAAI', 'CIKM', 'ICDM', 'SDM'];
  const journals = ['Nature', 'Science', 'TKDE', 'TKDD', 'TPAMI', 'IJCV', 'JMLR'];
  
  const venueUpper = venue.toUpperCase();
  
  if (conferences.some(conf => venueUpper.includes(conf))) {
    return 'conference';
  } else if (journals.some(journal => venueUpper.includes(journal))) {
    return 'journal';
  }
  return 'other';
}

/**
 * 更新现有论文的引用数据
 */
function updateCitationCounts(existingPublications, newPublications) {
  console.log('🔄 更新现有论文的引用数据...');
  
  // 创建新论文的标题映射，用于匹配
  const newPubsMap = new Map();
  newPublications.forEach(pub => {
    const titleKey = pub.title.toLowerCase().trim();
    newPubsMap.set(titleKey, pub);
  });

  let updatedCount = 0;
  
  // 更新现有论文的引用数据
  const updatedPublications = existingPublications.map(existingPub => {
    const titleKey = existingPub.title.toLowerCase().trim();
    const matchedPub = newPubsMap.get(titleKey);
    
    if (matchedPub && matchedPub.citations !== existingPub.citations) {
      console.log(`📈 更新论文引用: "${existingPub.title}" (${existingPub.citations} -> ${matchedPub.citations})`);
      updatedCount++;
      return {
        ...existingPub,
        citations: matchedPub.citations,
        citationsId: matchedPub.citationsId || existingPub.citationsId,
        urls: {
          ...existingPub.urls,
          citations: matchedPub.urls.citations || existingPub.urls.citations
        }
      };
    }
    
    return existingPub;
  });

  console.log(`✅ 共更新了 ${updatedCount} 篇论文的引用数据`);
  return updatedPublications;
}

/**
 * 保存数据到静态JSON文件
 */
async function saveDataToFiles(data) {
  // 确保目录存在
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }

  // 检查是否存在现有的publications.json文件
  const pubsFilePath = path.join(CONFIG.dataDir, 'publications.json');
  let finalPublications = data.publications;
  
  if (fs.existsSync(pubsFilePath)) {
    try {
      const existingPublications = JSON.parse(fs.readFileSync(pubsFilePath, 'utf-8'));
      console.log(`📋 发现现有论文数据，共 ${existingPublications.length} 篇`);
      
      // 只更新引用数据，保留现有结构
      finalPublications = updateCitationCounts(existingPublications, data.publications);
    } catch (error) {
      console.warn('⚠️  读取现有论文数据失败，将使用新数据:', error.message);
    }
  }

  // 同样处理selected-publications.json
  const selectedPubsFilePath = path.join(CONFIG.dataDir, 'selected-publications.json');
  if (fs.existsSync(selectedPubsFilePath)) {
    try {
      const existingSelectedPubs = JSON.parse(fs.readFileSync(selectedPubsFilePath, 'utf-8'));
      console.log(`📋 发现现有精选论文数据，共 ${existingSelectedPubs.length} 篇`);
      
      const updatedSelectedPubs = updateCitationCounts(existingSelectedPubs, data.publications);
      fs.writeFileSync(selectedPubsFilePath, JSON.stringify(updatedSelectedPubs, null, 2));
      console.log(`✅ 已更新: selected-publications.json`);
    } catch (error) {
      console.warn('⚠️  读取现有精选论文数据失败:', error.message);
    }
  }

  // Sanity check: reject metrics that look like a wrong-author match
  const existingMetrics = readJsonSafe('metrics.json', null);
  let finalMetrics = data.metrics;
  if (existingMetrics && existingMetrics.totalCitations > 0) {
    const ratio = data.metrics.totalCitations / existingMetrics.totalCitations;
    if (ratio < 0.7) {
      console.warn(`⚠️  新指标 (citations=${data.metrics.totalCitations}) 远低于现有数据 (${existingMetrics.totalCitations})，疑似匹配到错误作者，保留现有 metrics`);
      finalMetrics = { ...existingMetrics, lastUpdated: new Date().toISOString() };
    }
  }

  const files = [
    { name: 'scholar-profile.json', data: data.profile },
    { name: 'metrics.json', data: finalMetrics },
    { name: 'publications.json', data: finalPublications },
    { name: 'citations-by-year.json', data: data.citationsByYear }
  ];

  for (const file of files) {
    const filePath = path.join(CONFIG.dataDir, file.name);
    fs.writeFileSync(filePath, JSON.stringify(file.data, null, 2));
    console.log(`✅ 已保存: ${file.name}`);
  }

  console.log(`📊 数据统计:`);
  console.log(`   论文数量: ${finalPublications.length}`);
  console.log(`   总引用数: ${finalMetrics.totalCitations}`);
  console.log(`   H指数: ${finalMetrics.hIndex}`);
}

/**
 * 主执行函数
 */
async function main() {
  try {
    console.log('🚀 开始更新学术数据...');
    console.log(`📋 学者ID: ${CONFIG.scholarId}`);
    
    const data = await fetchScholarDataWithSerpAPI(CONFIG.scholarId);
    
    if (data) {
      await saveDataToFiles(data);
      console.log('✅ 学术数据更新完成！');
      
      // 生成更新日志
      const updateLog = {
        timestamp: new Date().toISOString(),
        publicationsCount: data.publications.length,
        totalCitations: data.metrics.totalCitations,
        hIndex: data.metrics.hIndex,
        lastUpdate: data.metrics.lastUpdated
      };
      
      fs.writeFileSync(
        path.join(CONFIG.dataDir, 'update-log.json'),
        JSON.stringify(updateLog, null, 2)
      );
      
    } else {
      console.error('❌ 数据获取失败');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 执行失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  fetchScholarDataWithSerpAPI,
  saveDataToFiles,
  CONFIG
};