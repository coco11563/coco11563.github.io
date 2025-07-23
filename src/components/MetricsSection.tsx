'use client'

import { motion } from 'framer-motion'
import { Metrics, CitationsByYear } from '@/types/scholar'
import { TrendingUp, BookOpen, Award, Calendar } from 'lucide-react'

interface MetricsSectionProps {
  metrics: Metrics
  citationsByYear: CitationsByYear[]
}

export function MetricsSection({ metrics, citationsByYear }: MetricsSectionProps) {
  const metricCards = [
    {
      icon: TrendingUp,
      label: "Total Citations",
      value: metrics.totalCitations,
      recent: metrics.totalCitationsRecent,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: Award,
      label: "h-index",
      value: metrics.hIndex,
      recent: metrics.hIndexRecent,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: BookOpen,
      label: "i10-index",
      value: metrics.i10Index,
      recent: metrics.i10IndexRecent,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      icon: Calendar,
      label: "Years Active",
      value: new Date().getFullYear() - 2019,
      recent: null,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Academic Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quantifying research contributions and scholarly influence
          </p>
        </motion.div>

        {/* 指标卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="metric-card card-hover"
            >
              {/* 图标 */}
              <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center mb-4`}>
                <metric.icon size={24} className={metric.textColor} />
              </div>

              {/* 数值 */}
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="metric-value"
                >
                  {metric.value.toLocaleString()}
                </motion.div>
                
                {metric.recent !== null && (
                  <div className="text-xs text-gray-500">
                    Since 2019: {metric.recent.toLocaleString()}
                  </div>
                )}
                
                <div className="metric-label">
                  {metric.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 引用趋势图 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Citation Trends Over Time
          </h3>
          
          <div className="relative">
            {/* 简化的柱状图 */}
            <div className="flex items-end justify-center space-x-2 h-64">
              {citationsByYear.map((item, index) => {
                const maxCitations = Math.max(...citationsByYear.map(d => d.citations))
                const height = (item.citations / maxCitations) * 200
                
                return (
                  <motion.div
                    key={item.year}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}px` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="group relative"
                  >
                    <div 
                      className="w-8 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t cursor-pointer hover:from-primary-700 hover:to-primary-500 transition-colors"
                      style={{ height: `${height}px` }}
                    />
                    
                    {/* 悬浮提示 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.year}: {item.citations} citations
                    </div>
                    
                    {/* 年份标签 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-gray-600">
                      {item.year}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 图表说明 */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(metrics.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}