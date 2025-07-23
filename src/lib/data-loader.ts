import { ScholarProfile, Publication, Metrics, CitationsByYear } from '@/types/scholar';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 静态数据加载器
 * 从 public/data 目录加载预生成的 JSON 数据
 */
export class StaticDataLoader {
  /**
   * 判断是否在构建时环境
   */
  private static isBuildTime(): boolean {
    return typeof window === 'undefined' && process.env.NODE_ENV !== 'development';
  }

  /**
   * 读取文件数据（构建时使用文件系统，运行时使用fetch）
   */
  private static async readDataFile(filename: string): Promise<any> {
    try {
      if (this.isBuildTime()) {
        // 构建时直接读取文件系统
        const filePath = path.join(process.cwd(), 'public', 'data', filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
      } else {
        // 运行时使用fetch
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 加载学者档案
   */
  static async loadProfile(): Promise<ScholarProfile> {
    try {
      return await this.readDataFile('scholar-profile.json');
    } catch (error) {
      console.error('Failed to load profile:', error);
      return this.getDefaultProfile();
    }
  }

  /**
   * 加载指标数据
   */
  static async loadMetrics(): Promise<Metrics> {
    try {
      return await this.readDataFile('metrics.json');
    } catch (error) {
      console.error('Failed to load metrics:', error);
      return this.getDefaultMetrics();
    }
  }

  /**
   * 加载论文列表
   */
  static async loadPublications(): Promise<Publication[]> {
    try {
      return await this.readDataFile('publications.json');
    } catch (error) {
      console.error('Failed to load publications:', error);
      return this.getDefaultPublications();
    }
  }

  /**
   * 加载按年引用数据
   */
  static async loadCitationsByYear(): Promise<CitationsByYear[]> {
    try {
      return await this.readDataFile('citations-by-year.json');
    } catch (error) {
      console.error('Failed to load citations by year:', error);
      return this.getDefaultCitationsByYear();
    }
  }

  /**
   * 加载所有数据
   */
  static async loadAllData() {
    const [profile, metrics, publications, citationsByYear] = await Promise.all([
      this.loadProfile(),
      this.loadMetrics(),
      this.loadPublications(),
      this.loadCitationsByYear()
    ]);

    return {
      profile,
      metrics,
      publications,
      citationsByYear
    };
  }

  /**
   * 获取论文按类型分组
   */
  static async loadPublicationsByType(): Promise<Record<string, Publication[]>> {
    const publications = await this.loadPublications();
    
    return publications.reduce((acc, pub) => {
      if (!acc[pub.venueType]) {
        acc[pub.venueType] = [];
      }
      acc[pub.venueType].push(pub);
      return acc;
    }, {} as Record<string, Publication[]>);
  }

  /**
   * 获取最新论文
   */
  static async loadRecentPublications(limit: number = 5): Promise<Publication[]> {
    const publications = await this.loadPublications();
    return publications
      .sort((a, b) => b.year - a.year)
      .slice(0, limit);
  }

  /**
   * 搜索论文
   */
  static async searchPublications(query: string): Promise<Publication[]> {
    const publications = await this.loadPublications();
    const lowercaseQuery = query.toLowerCase();
    
    return publications.filter(pub => 
      pub.title.toLowerCase().includes(lowercaseQuery) ||
      pub.authors.some(author => author.toLowerCase().includes(lowercaseQuery)) ||
      pub.venue.toLowerCase().includes(lowercaseQuery) ||
      pub.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
    );
  }

  // 默认数据（回退选项）
  private static getDefaultProfile(): ScholarProfile {
    return {
      name: 'Meng Xiao (肖濛)',
      nameZh: '肖濛',
      affiliation: [
        'Computer Network Information Center',
        'CAS',
        'Duke-NUS Medical School',
        'NUS'
      ],
      email: ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg'],
      homepage: 'https://coco11563.github.io',
      interests: ['AI4S', 'AI4Data', 'Data Mining'],
      image: '/indexfiles/me.png',
      verified: false
    };
  }

  private static getDefaultMetrics(): Metrics {
    return {
      totalCitations: 853,
      totalCitationsRecent: 790,
      hIndex: 16,
      hIndexRecent: 15,
      i10Index: 20,
      i10IndexRecent: 19,
      lastUpdated: new Date().toISOString()
    };
  }

  private static getDefaultPublications(): Publication[] {
    return [
      {
        id: 'pub_0',
        title: 'GCAL: Adapting Graph Models to Evolving Domain Shifts',
        authors: ['Ziyue Qiao', 'Qianyi Cai', 'Hao Dong', 'Jiawei Gu', 'Pengyang Wang', 'Meng Xiao', 'Xiao Luo', 'Hui Xiong'],
        venue: 'ICML',
        venueType: 'conference',
        year: 2025,
        citations: 0,
        keywords: ['graph', 'domain', 'adaptation'],
        urls: {}
      },
      {
        id: 'pub_1',
        title: 'Beyond Discrete Selection: Continuous Embedding Space Optimization for Generative Feature Selection',
        authors: ['Meng Xiao', 'Dongjie Wang', 'Min Wu', 'Pengfei Wang', 'Yuanchun Zhou', 'Yanjie Fu'],
        venue: 'IEEE ICDM',
        venueType: 'conference',
        year: 2023,
        citations: 28,
        keywords: ['feature', 'selection', 'optimization'],
        urls: {}
      }
    ];
  }

  private static getDefaultCitationsByYear(): CitationsByYear[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = 2019; year <= currentYear; year++) {
      years.push({
        year,
        citations: Math.floor(Math.random() * 100) + 50
      });
    }
    
    return years;
  }
}