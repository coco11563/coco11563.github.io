'use client'

import { motion } from 'framer-motion'
import { ScholarProfile } from '@/types/scholar'
import { Mail, MapPin, ExternalLink, Github, Users, Award } from 'lucide-react'

interface ContactSectionProps {
  profile: ScholarProfile
}

export function ContactSection({ profile }: ContactSectionProps) {
  const socialLinks = [
    {
      icon: ExternalLink,
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en",
      color: "text-blue-600 hover:text-blue-700"
    },
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/coco11563", 
      color: "text-gray-800 hover:text-gray-900"
    },
    {
      icon: ExternalLink,
      label: "DBLP",
      url: "https://dblp.org/pid/25/6475-1.html",
      color: "text-orange-600 hover:text-orange-700"
    },
    {
      icon: Award,
      label: "ORCID",
      url: "https://orcid.org/0000-0001-5294-5776",
      color: "text-green-600 hover:text-green-700"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interested in collaboration, research opportunities, or academic discussions?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 左侧：联系信息 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 联系方式 */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {/* 邮箱 */}
                <div className="space-y-3">
                  {Array.isArray(profile.email) 
                    ? profile.email.map((email, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Mail size={20} className="text-primary-600 flex-shrink-0" />
                          <div>
                            <a
                              href={`mailto:${email.replace('.at.', '@')}`}
                              className="text-gray-700 hover:text-primary-600 transition-colors"
                            >
                              {email.replace('.at.', '@')}
                            </a>
                            <p className="text-sm text-gray-500">
                              {index === 0 ? 'Work Email' : 'Academic Email'}
                            </p>
                          </div>
                        </div>
                      ))
                    : (
                        <div className="flex items-center space-x-3">
                          <Mail size={20} className="text-primary-600 flex-shrink-0" />
                          <div>
                            <a
                              href={`mailto:${profile.email.replace('.at.', '@')}`}
                              className="text-gray-700 hover:text-primary-600 transition-colors"
                            >
                              {profile.email.replace('.at.', '@')}
                            </a>
                          </div>
                        </div>
                      )
                  }
                </div>

                {/* 地址 */}
                <div className="space-y-3">
                  {profile.affiliation.map((aff, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <MapPin size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{aff}</p>
                        {index === 1 && (
                          <p className="text-sm text-gray-500">
                            8 College Road, Singapore, 169857
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 社交媒体链接 */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Academic Profiles
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${link.color}`}
                  >
                    <link.icon size={20} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧：合作机会 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 研究合作 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Research Collaboration
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  I&apos;m always interested in collaborating with researchers and practitioners in:
                </p>
                
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Data-centric AI and machine learning systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>AI applications in life sciences and healthcare</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Scientific data mining and knowledge discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Foundation models for scientific applications</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 学术服务 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Award size={24} className="text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Academic Services
                </h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">Area Chair</p>
                  <p>AISTAT 2025</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">Workshop Organizer</p>
                  <p>Data-Centric AI (ICDM 2023/2024, CIKM 2024)</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">Reviewer</p>
                  <p>NeurIPS, ICML, ICLR, SIGKDD, and more</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">Guest Editor</p>
                  <p>Electronics Special Issue</p>
                </div>
              </div>
            </div>

            {/* 响应时间 */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-800">
                <strong>Response Time:</strong> I typically respond to emails within 2-3 business days. 
                For urgent matters, please mention &quot;URGENT&quot; in the subject line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}