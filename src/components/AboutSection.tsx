'use client'

import { motion } from 'framer-motion'
import { ScholarProfile, NewsItem } from '@/types/scholar'
import { GraduationCap, Award, Star, Users } from 'lucide-react'
import { NewsSection } from './NewsSection'

interface AboutSectionProps {
  profile: ScholarProfile
  news: NewsItem[]
}

export function AboutSection({ profile, news }: AboutSectionProps) {
  const achievements = [
    {
      icon: Award,
      title: "CAS President Award - Special Prize (中国科学院院长奖学金特别奖)",
      description: "The highest award for graduate students of the CAS",
      year: "2023"
    },
    {
      icon: Star,
      title: "Young Talent Support Project by BAST (北京市科协青年人才托举工程)",
      description: "Batch of 2024-2026",
      year: "2024"
    },
    {
      icon: GraduationCap,
      title: "Doctoral Degree (博士学位)",
      description: "University of Chinese Academy of Sciences (中国科学院大学)",
      year: "2023"
    },
    {
      icon: Users,
      title: "Published 40+ Research Articles",
      description: "Includes top journals and conferences",
      year: "To Date"
    }
  ]

  const timeline = [
    {
      year: "2026-Present",
      title: "Associate Professor",
      organization: "Computer Network Information Center, CAS",
      description: "Scientific Data Mining, Data-centric AI"
    },
    {
      year: "2025-Present",
      title: "Research Fellow",
      organization: "DUKE-NUS Medical School, NUS",
      description: "Single-cell Data Mining, AI for lifescience"
    },
    {
      year: "2023-2025",
      title: "Assistant Researcher",
      organization: "Computer Network Information Center, CAS",
      description: "Scientific Data Mining, Data-centric AI"
    },
    {
      year: "2019-2023",
      title: "PhD Student",
      organization: "University of Chinese Academy of Sciences",
      description: "Scientific Literature Mining, Interdisciplinary Knowledge Graph"
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate researcher dedicated to advancing AI for scientific discovery and life sciences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 左侧：个人介绍 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Meng Xiao received joint doctoral training from the University of Chinese Academy of Sciences 
                and Institute for Infocomm Research, Agency for Science, Technology and Research (ASTAR), 
                Singapore in June 2023.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Currently, he is an associate professor at the <strong>Computer Network Information Center, Chinese Academy of Sciences</strong>.
                He is also a research fellow at <strong>DUKE-NUS Medical School, National University of Singapore</strong>.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Meng Xiao has published over 40 papers, including <strong>iMeta, the Innovation Life, NeurIPS, ICLR, ICML, IEEE TKDE,
                IEEE ICDE, ACM SIGKDD, AIJ, and ACM TKDD</strong>. He actively contributes to the academic community
                as a (s)PC member or reviewer on many premier international conferences and journals.
              </p>
            </div>

            {/* 研究兴趣 */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* News 部分 */}
            <div id="news" className="mt-12">
              <NewsSection news={news} />
            </div>
          </motion.div>

          {/* 右侧：成就和时间线 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 主要成就 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Achievements</h3>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <achievement.icon size={20} className="text-primary-600 mt-1" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <span className="text-xs text-primary-600 font-medium">{achievement.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 教育和工作经历时间线 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Timeline</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-primary-200"
                  >
                    {/* 时间点 */}
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow" />
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className="text-sm text-primary-600 font-medium">{item.year}</span>
                      </div>
                      <p className="font-medium text-gray-700">{item.organization}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}