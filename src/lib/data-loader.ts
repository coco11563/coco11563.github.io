import { promises as fs } from 'fs'
import path from 'path'
import {
  ScholarProfile,
  Publication,
  Metrics,
  CitationsByYear,
  NewsItem,
} from '@/types/scholar'

// 静态数据加载：站点为 force-static / output: export，
// 所有数据都在构建时（或 dev 的服务端渲染时）从 public/data 读取。

async function readDataFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error)
    return fallback
  }
}

const defaultProfile: ScholarProfile = {
  name: 'Meng Xiao (肖濛)',
  nameZh: '肖濛',
  affiliation: [
    'Computer Network Information Center, CAS',
    'Duke-NUS Medical School, NUS',
  ],
  email: ['shaow.at.cnic.cn', 'meng.xiao.at.nus.edu.sg'],
  homepage: 'https://coco11563.github.io',
  interests: ['AI4S', 'AI4Data', 'Data Mining'],
  image: '/indexfiles/me.png',
  verified: true,
}

const defaultMetrics: Metrics = {
  totalCitations: 1163,
  totalCitationsRecent: 1163,
  hIndex: 18,
  hIndexRecent: 18,
  i10Index: 30,
  i10IndexRecent: 30,
  lastUpdated: '',
}

export async function loadProfile(): Promise<ScholarProfile> {
  return readDataFile('scholar-profile.json', defaultProfile)
}

export async function loadMetrics(): Promise<Metrics> {
  return readDataFile('metrics.json', defaultMetrics)
}

// 优先使用手工精选的论文列表，缺失时回退到自动抓取的完整列表
export async function loadPublications(): Promise<Publication[]> {
  const selected = await readDataFile<Publication[] | null>('selected-publications.json', null)
  if (selected && selected.length > 0) return selected
  return readDataFile<Publication[]>('publications.json', [])
}

export async function loadCitationsByYear(): Promise<CitationsByYear[]> {
  const data = await readDataFile<CitationsByYear[]>('citations-by-year.json', [])
  return Array.isArray(data) ? data : []
}

export async function loadNews(): Promise<NewsItem[]> {
  return readDataFile<NewsItem[]>('news.json', [])
}

export async function loadAllData() {
  const [profile, metrics, publications, citationsByYear, news] = await Promise.all([
    loadProfile(),
    loadMetrics(),
    loadPublications(),
    loadCitationsByYear(),
    loadNews(),
  ])

  return { profile, metrics, publications, citationsByYear, news }
}
