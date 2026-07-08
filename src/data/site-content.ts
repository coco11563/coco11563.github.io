// 站点静态内容配置
// 所有需要手工维护的内容都集中在这里，改这个文件即可更新网站文案。
// 自动更新的数据（引用数、论文列表、新闻等）在 public/data/*.json 中，
// 由 scripts/fetch-scholar-data.js 每日刷新，不要在这里重复维护。

export interface SocialLink {
  label: string
  url: string
}

export interface TimelineItem {
  period: string
  title: string
  organization: string
  description: string
}

export interface Honor {
  title: string
  description: string
  year: string
}

export interface Project {
  title: string
  description: string
  status: string
  image?: string
  links: { project?: string; github?: string }
  tags: string[]
}

export interface ServiceItem {
  role: string
  detail: string
}

export const siteContent = {
  // Hero 区域
  hero: {
    overline: 'Associate Professor · CNIC, Chinese Academy of Sciences',
    tagline:
      'Working on Data-centric AI and AI for Science — teaching machines to read, organize, and reason over scientific data.',
    roles: [
      'Associate Professor @ CNIC, CAS',
      'Research Fellow @ Duke-NUS, NUS',
    ],
  },

  // 个人简介（About）
  bio: [
    'Meng Xiao received joint doctoral training from the University of Chinese Academy of Sciences and the Institute for Infocomm Research, A*STAR, Singapore, earning his Ph.D. in June 2023.',
    'He is currently an Associate Professor at the Computer Network Information Center, Chinese Academy of Sciences, and a Research Fellow at Duke-NUS Medical School, National University of Singapore.',
    'He has published over 40 papers in venues including iMeta, The Innovation Life, NeurIPS, ICLR, ICML, IEEE TKDE, IEEE ICDE, ACM SIGKDD, AIJ, and ACM TKDD, and serves the community as an (S)PC member and reviewer for premier conferences and journals.',
  ],

  // 学术档案链接（scholar-profile.json 会被脚本覆盖，所以链接放这里）
  socialLinks: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en' },
    { label: 'GitHub', url: 'https://github.com/coco11563' },
    { label: 'DBLP', url: 'https://dblp.org/pid/25/6475-1.html' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0001-5294-5776' },
  ] as SocialLink[],

  // 经历时间线
  timeline: [
    {
      period: '2026 — Present',
      title: 'Associate Professor',
      organization: 'Computer Network Information Center, Chinese Academy of Sciences',
      description: 'Scientific data mining, Data-centric AI',
    },
    {
      period: '2025 — Present',
      title: 'Research Fellow',
      organization: 'Duke-NUS Medical School, National University of Singapore',
      description: 'Single-cell data mining, AI for life science',
    },
    {
      period: '2023 — 2025',
      title: 'Assistant Researcher',
      organization: 'Computer Network Information Center, Chinese Academy of Sciences',
      description: 'Scientific data mining, Data-centric AI',
    },
    {
      period: '2019 — 2023',
      title: 'Ph.D. Student',
      organization: 'University of Chinese Academy of Sciences',
      description: 'Scientific literature mining, interdisciplinary knowledge graphs',
    },
  ] as TimelineItem[],

  // 荣誉奖项
  honors: [
    {
      title: 'CAS President Award — Special Prize',
      description: '中国科学院院长奖学金特别奖 · the highest award for CAS graduate students',
      year: '2023',
    },
    {
      title: 'Young Talent Support Project, BAST',
      description: '北京市科协青年人才托举工程 · batch of 2024–2026',
      year: '2024',
    },
    {
      title: 'Ph.D., University of Chinese Academy of Sciences',
      description: 'Joint training with Institute for Infocomm Research, A*STAR, Singapore',
      year: '2023',
    },
  ] as Honor[],

  // 精选项目
  projects: [
    {
      title: 'xCompass',
      description:
        'An AI-ready portal unifying single-cell and gene foundation models (GeneCompass, scCompass) for cross-species biological discovery. A platform I lead, now live.',
      status: 'Live 2026',
      image: '/pubfiles/xCompass.png',
      links: { project: 'https://xcompass.scimatrix.cn' },
      tags: ['Foundation Model', 'Single-cell', 'Platform'],
    },
    {
      title: 'SciHorizon',
      description:
        'A comprehensive benchmarking platform for evaluating AI systems in scientific applications, from data processing to large language model integration.',
      status: 'SIGKDD 2025',
      image: '/pubfiles/SIGKDD2025.png',
      links: { project: 'https://www.scihorizon.cn/' },
      tags: ['AI4Science', 'Benchmark', 'LLM'],
    },
    {
      title: 'scCompass',
      description:
        'An integrated database and analysis platform for single-cell RNA sequencing data across multiple species, designed for AI-ready applications.',
      status: 'Advanced Science 2025',
      image: '/pubfiles/ADVSCI2025.png',
      links: { project: 'http://www.bdbe.cn/kun#/' },
      tags: ['Bioinformatics', 'Database', 'scRNA-seq'],
    },
    {
      title: 'GeneCompass',
      description:
        'A knowledge-informed cross-species foundation model for understanding universal gene regulatory mechanisms.',
      status: 'Cell Research 2024',
      image: '/pubfiles/CellRes2024.png',
      links: { github: 'https://github.com/xCompass-AI/GeneCompass' },
      tags: ['Foundation Model', 'Gene Regulation', 'Cross-species'],
    },
    {
      title: 'Data-Centric AI Workshop Series',
      description:
        'Organizing workshops at top-tier conferences (ICDM, CIKM) to advance data-centric approaches in AI research.',
      status: 'ICDM 2023/2024 · CIKM 2024',
      image: '/pubfiles/CIKM-2024-2.png',
      links: { project: 'https://data-centric-ai-dev.github.io/' },
      tags: ['Workshop', 'Data-Centric AI', 'Community'],
    },
  ] as Project[],

  // 学术服务
  services: [
    { role: 'Area Chair', detail: 'AISTATS' },
    { role: 'Workshop Organizer', detail: 'Data-Centric AI @ ICDM 2023/2024, CIKM 2024' },
    { role: 'Conference Reviewer', detail: 'NeurIPS, ICML, ICLR, SIGKDD, and more' },
    { role: 'Journal Reviewer', detail: 'Cell Research, Scientific Reports, ACM TKDD, and more' },
  ] as ServiceItem[],

  // 合作方向
  collaboration: [
    'Foundation models for biomedical scientific discovery',
    'Agentic AI applications in life sciences and healthcare',
    'Scientific literature data mining and knowledge discovery',
    'Data-centric AI and efficient machine learning systems',
  ],
}
