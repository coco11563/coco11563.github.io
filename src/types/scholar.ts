// Scholar 数据类型定义

export interface SocialLink {
  label: string;
  url: string;
}

export interface AffiliationInfo {
  name: string;
  address?: string;
}

export interface ScholarProfile {
  name: string;
  nameZh?: string;
  affiliation: string[];
  affiliationDetails?: AffiliationInfo[];
  email: string | string[];
  homepage?: string;
  interests: string[];
  image: string;
  verified: boolean;
  socialLinks?: SocialLink[];
  roles?: string[];
}

export interface Metrics {
  totalCitations: number;
  totalCitationsRecent: number;
  hIndex: number;
  hIndexRecent: number;
  i10Index: number;
  i10IndexRecent: number;
  lastUpdated: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueType: 'journal' | 'conference' | 'workshop' | 'preprint' | 'other';
  year: number;
  citations: number;
  citationsId?: string;
  abstract?: string;
  keywords: string[];
  urls: {
    paper?: string;
    code?: string;
    project?: string;
    citations?: string;
    bibtex?: string;
  };
  // 新增字段用于精选论文
  image?: string;  // 论文配图
  authorRole?: 'first-author' | 'co-first-author' | 'corresponding-author' | 'co-author';  // 作者角色
  highlighted?: boolean;  // 是否为重点论文
  award?: string;  // 获奖信息
}

export interface NewsItem {
  date: string;
  title: string;
  description?: string;
  link?: string;
  type: 'publication' | 'award' | 'grant' | 'talk' | 'general';
  highlighted?: boolean;
}

export interface CitationsByYear {
  year: number;
  citations: number;
}

export interface UpdateLog {
  timestamp: string;
  publicationsCount: number;
  totalCitations: number;
  hIndex: number;
  lastUpdate: string;
}

export interface ScholarData {
  profile: ScholarProfile;
  metrics: Metrics;
  publications: Publication[];
  citationsByYear: CitationsByYear[];
}