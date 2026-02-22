const fs = require('fs');
const path = require('path');

/**
 * Google Scholar 数据采集脚本
 * 使用 SerpAPI 获取真实学术数据
 *
 * 数据源优先级:
 * 1. SerpAPI (需要 SERPAPI_KEY) → Google Scholar 精确数据
 * 2. 本地 JSON 文件 → 保留现有数据不变
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
 * 判断发表类型
 */
function determineVenueType(venue) {
  const conferences = ['ICML', 'NeurIPS', 'ICLR', 'SIGKDD', 'IJCAI', 'AAAI', 'CIKM', 'ICDM', 'SDM', 'ICDE'];
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
 * 使用 SerpAPI 获取 Google Scholar 数据
 */
async function fetchScholarDataWithSerpAPI(scholarId) {
  if (!CONFIG.apiKey) {
    console.log('⚠️  未配置 SERPAPI_KEY，保留现有本地数据');
    return fetchLocalData();
  }

  try {
    console.log('🔍 正在从 Google Scholar 获取数据...');

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
    console.log('📋 回退到本地数据');
    return fetchLocalData();
  }
}

/**
 * 读取本地已有的 JSON 数据（不做任何修改）
 */
function fetchLocalData() {
  console.log('📋 使用现有本地 JSON 数据');

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

  const metrics = readJsonSafe('metrics.json', {
    totalCitations: 1163,
    totalCitationsRecent: 1163,
    hIndex: 18,
    hIndexRecent: 18,
    i10Index: 30,
    i10IndexRecent: 30,
    lastUpdated: new Date().toISOString()
  });

  const publications = readJsonSafe('publications.json', []);
  const citationsByYear = readJsonSafe('citations-by-year.json', []);

  console.log(`✅ 本地数据: ${publications.length} 篇论文, citations=${metrics.totalCitations}, h-index=${metrics.hIndex}`);

  return { profile, metrics, publications, citationsByYear };
}

/**
 * 处理和标准化 SerpAPI 返回的 Scholar 数据
 */
function processScholarData(authorData) {
  // 固定的 profile 数据，不允许自动更新覆盖
  const profile = {
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
  };

  // 从 SerpAPI cited_by.table 提取指标
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
 * 更新现有论文的引用数据
 */
function updateCitationCounts(existingPublications, newPublications) {
  console.log('🔄 更新现有论文的引用数据...');

  const newPubsMap = new Map();
  newPublications.forEach(pub => {
    const titleKey = pub.title.toLowerCase().trim();
    newPubsMap.set(titleKey, pub);
  });

  let updatedCount = 0;

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
          citations: matchedPub.urls?.citations || existingPub.urls?.citations
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
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }

  // 合并论文数据：只更新引用数，保留现有结构
  const pubsFilePath = path.join(CONFIG.dataDir, 'publications.json');
  let finalPublications = data.publications;

  if (fs.existsSync(pubsFilePath)) {
    try {
      const existingPublications = JSON.parse(fs.readFileSync(pubsFilePath, 'utf-8'));
      console.log(`📋 发现现有论文数据，共 ${existingPublications.length} 篇`);
      finalPublications = updateCitationCounts(existingPublications, data.publications);
    } catch (error) {
      console.warn('⚠️  读取现有论文数据失败，将使用新数据:', error.message);
    }
  }

  // 同样处理 selected-publications.json
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

  // Sanity check: 如果新数据的引用数骤降，拒绝更新（可能匹配到了错误的人）
  const existingMetrics = readJsonSafe('metrics.json', null);
  let finalMetrics = data.metrics;
  if (existingMetrics && existingMetrics.totalCitations > 0) {
    const ratio = data.metrics.totalCitations / existingMetrics.totalCitations;
    if (ratio < 0.7) {
      console.warn(`⚠️  新指标 (citations=${data.metrics.totalCitations}) 远低于现有数据 (${existingMetrics.totalCitations})，保留现有 metrics`);
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
    console.log(`🔑 SerpAPI: ${CONFIG.apiKey ? '已配置' : '未配置'}`);

    const data = await fetchScholarDataWithSerpAPI(CONFIG.scholarId);

    if (data) {
      await saveDataToFiles(data);
      console.log('✅ 学术数据更新完成！');

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

if (require.main === module) {
  main();
}

module.exports = {
  fetchScholarDataWithSerpAPI,
  saveDataToFiles,
  CONFIG
};
