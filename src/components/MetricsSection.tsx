'use client'

import { motion } from 'framer-motion'
import { Metrics, CitationsByYear } from '@/types/scholar'
import { TrendingUp, BookOpen, Award, Zap } from 'lucide-react'

interface MetricsSectionProps {
  metrics: Metrics
  citationsByYear: CitationsByYear[]
}

export function MetricsSection({ metrics, citationsByYear }: MetricsSectionProps) {
  const metricCards = [
    {
      icon: Zap,
      label: "Total Citations",
      value: metrics.totalCitations,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: Award,
      label: "h-index",
      value: metrics.hIndex,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: BookOpen,
      label: "i10-index",
      value: metrics.i10Index,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
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

                <div className="metric-label">
                  {metric.label}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Citation Trends 柱状图卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: metricCards.length * 0.1 }}
            className="metric-card card-hover"
          >
            {/* 图标 */}
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
              <TrendingUp size={24} className="text-orange-600" />
            </div>

            {/* 数值 */}
            <div className="space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: metricCards.length * 0.1 + 0.2, type: "spring" }}
                className="metric-value flex justify-center items-center"
              >
                {/* 柱状图作为主要数值显示 */}
                <div className="flex items-end justify-center space-x-1" style={{ height: '48px' }}>
                  {citationsByYear.slice(-6).map((item, index) => {
                    const maxCitations = Math.max(...citationsByYear.slice(-6).map(d => d.citations))
                    const heightPx = maxCitations > 0 ? Math.max((item.citations / maxCitations) * 40, 3) : 3
                    
                    return (
                      <motion.div
                        key={item.year}
                        initial={{ scaleY: 0, originY: 1 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (metricCards.length * 0.1) + (index * 0.1), duration: 0.6 }}
                        className="group relative"
                      >
                        <div 
                          className="w-2 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t transition-all duration-300"
                          style={{ height: `${heightPx}px` }}
                        />
                        
                        {/* 悬浮提示 */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {item.year}: {item.citations}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
              
              <div className="text-xs text-gray-500">
                Past 6 Years
              </div>
              
              <div className="metric-label">
                Citation Trends
              </div>
            </div>
          </motion.div>
        </div>

        {/* 更新说明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-gray-500">
            Last updated: {new Date(metrics.lastUpdated).toLocaleDateString()}
          </p>
        </motion.div>
      </div>
    </section>
  )
}