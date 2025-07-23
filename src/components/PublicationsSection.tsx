'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Publication } from '@/types/scholar'
import { ExternalLink, FileText, Code, Quote, Calendar, Users, Award, Star } from 'lucide-react'

interface PublicationsSectionProps {
  publications: Publication[]
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  // 直接使用所有论文，不进行过滤
  const filteredPublications = publications

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

  const getAuthorRoleInfo = (role?: string) => {
    switch (role) {
      case 'first-author':
        return { label: 'First Author', color: 'bg-blue-100 text-blue-800', icon: Star }
      case 'co-first-author':
        return { label: 'Co-first Author', color: 'bg-purple-100 text-purple-800', icon: Star }
      case 'corresponding-author':
        return { label: 'Corresponding Author', color: 'bg-green-100 text-green-800', icon: Award }
      case 'co-author':
        return { label: 'Co-author', color: 'bg-gray-100 text-gray-800', icon: Users }
      default:
        return null
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
            Selected Publications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selected publications as first author, co-first author, and corresponding author in top-tier venues
          </p>
        </motion.div>

        {/* 论文统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-600">
            {publications.length} selected publications • First author, co-first author, and corresponding author works
          </p>
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
                    className={`publication-card ${publication.highlighted ? 'ring-2 ring-primary-200' : ''}`}
                  >
                    <div className="flex gap-6">
                      {/* 论文图片 */}
                      {publication.image && (
                        <div className="flex-shrink-0">
                          <div className="w-32 h-24 relative rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={publication.image}
                              alt={`${publication.title} thumbnail`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* 论文内容 */}
                      <div className="flex-1 min-w-0">
                        {/* 标签和指标 */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`tag ${getVenueColor(publication.venueType)}`}>
                              {publication.venue}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {publication.year}
                            </span>
                            {/* 作者角色标识 */}
                            {publication.authorRole && (() => {
                              const roleInfo = getAuthorRoleInfo(publication.authorRole)
                              if (roleInfo) {
                                const IconComponent = roleInfo.icon
                                return (
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                                    <IconComponent size={12} />
                                    {roleInfo.label}
                                  </span>
                                )
                              }
                              return null
                            })()}
                            {/* 获奖标识 */}
                            {publication.award && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Award size={12} />
                                {publication.award}
                              </span>
                            )}
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
                      </div>
                    </div>

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