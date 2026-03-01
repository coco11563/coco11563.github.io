'use client'

import { Heart } from 'lucide-react'
import { NewsItem, ScholarProfile } from '@/types/scholar'

interface FooterProps {
  news: NewsItem[]
  profile: ScholarProfile
}

export function Footer({ news, profile }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const latestNews = news.slice(0, 3)

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 左侧：个人信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg">Meng Xiao</span>
            </div>

            <p className="text-gray-400 text-sm">
              Associate Professor passionate about Data-centric AI and Scientific Data Mining.
            </p>

            <p className="text-gray-400 text-sm">
              Computer Network Information Center, Chinese Academy of Sciences
            </p>
          </div>

          {/* 中间：快速链接 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#publications" className="text-gray-400 hover:text-white transition-colors">
                Publications
              </a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              {profile.socialLinks?.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* 右侧：最新动态（从news.json动态生成） */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Latest Updates</h3>
            <div className="text-sm text-gray-400 space-y-2">
              {latestNews.map((item, index) => (
                <p key={index} className="truncate">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      [{item.date}] {item.title}
                    </a>
                  ) : (
                    <span>[{item.date}] {item.title}</span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>&copy; {currentYear} Meng Xiao. All rights reserved.</span>
            </div>

            {/* 制作信息 */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </div>
          </div>

          {/* 技术栈信息 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Deployed on GitHub Pages &bull; Data auto-updated daily
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
