// Scholar 数据类型定义

export interface ScholarProfile {
  name: string;
  nameZh?: string;
  affiliation: string[];
  email: string | string[];
  homepage?: string;
  interests: string[];
  image: string;
  verified: boolean;
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