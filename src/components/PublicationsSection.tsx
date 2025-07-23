'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Publication } from '@/types/scholar'
import { ExternalLink, FileText, Code, Quote, Calendar, Users } from 'lucide-react'

interface PublicationsSectionProps {
  publications: Publication[]
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 按类型过滤
  const venueTypes = ['all', 'conference', 'journal', 'workshop', 'other']
  const typeLabels = {
    all: 'All',
    conference: 'Conferences',
    journal: 'Journals', 
    workshop: 'Workshops',
    other: 'Others'
  }

  // 过滤论文
  const filteredPublications = publications.filter(pub => {
    const typeMatch = selectedType === 'all' || pub.venueType === selectedType
    const searchMatch = searchQuery === '' || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchQuery.toLowerCase())
    
    return typeMatch && searchMatch
  })

  // 按年份分组
  const publicationsByYear = filteredPublications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = []
    }
    acc[pub.year].push(pub)
    return acc
  }, {} as Record<number, Publication[]>)

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a) // 降序排列

  const getVenueColor = (venueType: string) => {
    switch (venueType) {
      case 'journal': return 'tag-journal'
      case 'conference': return 'tag-conference'
      case 'workshop': return 'tag-workshop'
      default: return 'tag-preprint'
    }
  }

  return (
    <section id="publications" className="py-20 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Publications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Research contributions across leading venues in AI, machine learning, and data mining
          </p>
        </motion.div>

        {/* 过滤器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* 搜索框 */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search publications by title, author, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* 类型过滤 */}
          <div className="flex flex-wrap justify-center gap-2">
            {venueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {typeLabels[type as keyof typeof typeLabels]} ({
                  type === 'all' 
                    ? publications.length 
                    : publications.filter(p => p.venueType === type).length
                })
              </button>
            ))}
          </div>
        </motion.div>

        {/* 论文列表 */}
        <div className="space-y-12">
          {years.map((year) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* 年份标题 */}
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-2">
                {year}
              </h3>

              {/* 该年份的论文 */}
              <div className="space-y-6">
                {publicationsByYear[year].map((publication, index) => (
                  <motion.div
                    key={publication.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="publication-card"
                  >
                    {/* 标签和指标 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`tag ${getVenueColor(publication.venueType)}`}>
                          {publication.venue}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {publication.year}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Quote size={14} />
                          {publication.citations} citations
                        </span>
                      </div>
                    </div>

                    {/* 论文标题 */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {publication.title}
                    </h4>

                    {/* 作者列表 */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                      <Users size={14} className="flex-shrink-0" />
                      <p className="text-clamp-2">
                        {publication.authors.map((author, i) => (
                          <span key={i} className={
                            author.includes('Meng Xiao') || author.includes('肖濛')
                              ? 'font-semibold text-primary-600' 
                              : ''
                          }>
                            {author}{i < publication.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* 关键词 */}
                    {publication.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {publication.keywords.slice(0, 5).map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="flex flex-wrap gap-2">
                      {publication.urls.paper && (
                        <a
                          href={publication.urls.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md text-sm transition-colors"
                        >
                          <FileText size={14} />
                          Paper
                        </a>
                      )}
                      
                      {publication.urls.code && (
                        <a
                          href={publication.urls.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-md text-sm transition-colors"
                        >
                          <Code size={14} />
                          Code
                        </a>
                      )}
                      
                      {publication.urls.project && (
                        <a
                          href={publication.urls.project}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-md text-sm transition-colors"
                        >
                          <ExternalLink size={14} />
                          Project
                        </a>
                      )}
                      
                      {publication.urls.citations && (
                        <a
                          href={publication.urls.citations}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-md text-sm transition-colors"
                        >
                          <Quote size={14} />
                          Citations
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 如果没有结果 */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No publications found matching your criteria.
            </p>
          </motion.div>
        )}

        {/* 查看更多链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <ExternalLink size={16} className="mr-2" />
            View Full Publication List
          </a>
        </motion.div>
      </div>
    </section>
  )
}