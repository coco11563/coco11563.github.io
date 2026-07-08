'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navigationItems = [
  { name: 'News', href: '#news' },
  { name: 'Publications', href: '#publications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const sections = navigationItems.map(item => item.href.slice(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      setActiveSection(current ?? '')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-stone-200/80 bg-paper-light/90 backdrop-blur-md dark:border-stone-800 dark:bg-paper-dark/90'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="font-serif text-lg font-medium tracking-tight">
            Meng Xiao
            <span className="ml-2 text-stone-400 dark:text-stone-500">肖濛</span>
          </a>

          {/* 桌面端导航 */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-accent-700 dark:text-accent-400'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="ml-2 border-l border-stone-200 pl-2 dark:border-stone-800">
              <ThemeToggle />
            </div>
          </div>

          {/* 移动端按钮 */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isOpen && (
          <div className="border-t border-stone-200 pb-4 md:hidden dark:border-stone-800">
            {navigationItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-accent-700 dark:text-accent-400'
                    : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
