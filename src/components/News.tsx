'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Award, Star, Megaphone } from 'lucide-react'
import { NewsItem } from '@/types/scholar'

const DEFAULT_VISIBLE = 5

function NewsIcon({ type }: { type: NewsItem['type'] }) {
  const className = 'shrink-0 text-accent-700 dark:text-accent-400'
  switch (type) {
    case 'publication':
      return <BookOpen size={16} className={className} />
    case 'award':
      return <Award size={16} className={className} />
    case 'grant':
      return <Star size={16} className={className} />
    default:
      return <Megaphone size={16} className={className} />
  }
}

export function News({ news }: { news: NewsItem[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleNews = showAll ? news : news.slice(0, DEFAULT_VISIBLE)

  if (news.length === 0) return null

  return (
    <div className="max-w-3xl">
      <ul className="divide-y divide-stone-200 dark:divide-stone-800">
        {visibleNews.map((item, index) => (
          <li key={index} className="flex items-baseline gap-4 py-4">
            <span className="w-20 shrink-0 font-mono text-xs text-stone-400 dark:text-stone-500">
              {item.date}
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="relative top-0.5">
                <NewsIcon type={item.type} />
              </span>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {item.title}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center gap-1 whitespace-nowrap align-baseline text-xs font-medium text-accent-700 hover:underline dark:text-accent-400"
                  >
                    Link
                    <ExternalLink size={11} />
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {news.length > DEFAULT_VISIBLE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
        >
          {showAll ? (
            <>
              Show less
              <ChevronUp size={15} />
            </>
          ) : (
            <>
              Show all {news.length} updates
              <ChevronDown size={15} />
            </>
          )}
        </button>
      )}
    </div>
  )
}
