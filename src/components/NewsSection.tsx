'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Star, Award, BookOpen, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NewsItem {
  date: string
  title: string
  description?: string
  link?: string
  type: 'publication' | 'award' | 'grant' | 'talk' | 'general'
  highlighted?: boolean
}

interface NewsSectionProps {
  className?: string
}

export function NewsSection({ className = "" }: NewsSectionProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  // 默认新闻数据（作为备用）
  const defaultNewsItems: NewsItem[] = [
    {
      date: "2025.07",
      title: "Two papers accepted by CRAD DCAI Issue and BMC Bioinformatics!",
      type: "publication",
      highlighted: true
    },
    {
      date: "2025.05", 
      title: "New survey about Gut microbiota and tuberculosis published!",
      link: "https://onlinelibrary.wiley.com/doi/10.1002/imt2.70054",
      type: "publication"
    },
    {
      date: "2025.05",
      title: "Three papers accepted by ICML 2025, SIGKDD 2025, and iMeta!",
      type: "publication", 
      highlighted: true
    },
    {
      date: "2025.04",
      title: "Five papers accepted by ICLR 2025, DASFAA 2025, IEEE ICDE 2025, Advanced Science, and ICMR 2025!",
      type: "publication",
      highlighted: true
    },
    {
      date: "2025.03",
      title: "New survey about Agentic AI published!",
      link: "https://arxiv.org/abs/2503.21460",
      type: "publication"
    },
    {
      date: "2025.01",
      title: "New survey about DCAI published!",
      link: "http://arxiv.org/abs/2501.10555", 
      type: "publication"
    },
    {
      date: "2025.01",
      title: "Nominated as Excellent Reviewer (Top-20%) for ACM SIGKDD!",
      type: "award"
    },
    {
      date: "2024.12",
      title: "Research proposal about Genomic Data Engineering granted by Natural Science Foundation of Beijing, China!",
      type: "grant"
    },
    {
      date: "2024.11",
      title: "Research proposal about Scientific Impact Evaluation granted by Natural Science Foundation of China!",
      type: "grant"
    },
    {
      date: "2024.11",
      title: "Invited talk as distinguished student for UCAS Graduate Academic Forum!",
      link: "https://scce.ucas.ac.cn/index.php/zh-CN/xwbd/3554-2024-5", 
      type: "talk"
    },
    {
      date: "2024.10",
      title: "One paper accepted by BIBM 2024!",
      type: "publication"
    }
  ]

  // 加载新闻数据
  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const response = await fetch('/data/news.json')
        if (response.ok) {
          const data = await response.json()
          setNewsItems(data)
        } else {
          setNewsItems(defaultNewsItems)
        }
      } catch (error) {
        console.error('Failed to load news data:', error)
        setNewsItems(defaultNewsItems)
      } finally {
        setLoading(false)
      }
    }

    loadNewsData()
  }, [])

  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'publication': return BookOpen
      case 'award': return Award
      case 'grant': return Star
      case 'talk': return Zap
      default: return Zap
    }
  }

  const getNewsColor = (type: string) => {
    switch (type) {
      case 'publication': return 'text-blue-600 bg-blue-50'
      case 'award': return 'text-yellow-600 bg-yellow-50'
      case 'grant': return 'text-green-600 bg-green-50'
      case 'talk': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`space-y-6 ${className}`}
    >
      {/* 标题 */}
      <div className="flex items-center space-x-3 mb-8">
        <Calendar className="text-primary-600" size={28} />
        <h3 className="text-2xl font-bold text-gray-900">Latest News</h3>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* News Timeline */}
      {!loading && (
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-200"></div>
        
        <div className="space-y-8">
          {newsItems.map((item, index) => {
            const IconComponent = getNewsIcon(item.type)
            const colorClasses = getNewsColor(item.type)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start space-x-4"
              >
                {/* Timeline Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colorClasses} flex items-center justify-center relative z-10 shadow-sm`}>
                  <IconComponent size={20} />
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
                  item.highlighted ? 'ring-2 ring-primary-200 bg-primary-50/30' : ''
                }`}>
                  {/* Date Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      <Calendar size={12} className="mr-1" />
                      {item.date}
                    </span>
                    {item.highlighted && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <Star size={10} className="mr-1" />
                        Latest
                      </span>
                    )}
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Link */}
                  {item.link && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <ExternalLink size={12} className="mr-1" />
                        View Details
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-6"
      >
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
          <Calendar size={16} className="mr-2" />
          View All News
        </button>
      </motion.div>
      )}
    </motion.div>
  )
}