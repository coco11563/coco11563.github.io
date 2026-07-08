'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// 把 ['A','B','C'] 格式化为 "A, B, and C"
function formatList(items: string[]): string {
  if (items.length <= 1) return items.join('')
  if (items.length === 2) return items.join(' and ')
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

interface AboutBioProps {
  paragraphs: string[]
  memberships: string[]
}

export function AboutBio({ paragraphs, memberships }: AboutBioProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex h-full flex-col">
      <div
        className={`relative space-y-5 text-base leading-relaxed text-stone-700 dark:text-stone-300 ${
          expanded ? '' : 'max-h-56 overflow-hidden'
        }`}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p>He is a member of {formatList(memberships)}.</p>

        {/* 收起时底部渐隐 */}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper-light to-transparent dark:from-paper-dark" />
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
      >
        {expanded ? (
          <>
            Show less
            <ChevronUp size={15} />
          </>
        ) : (
          <>
            Read more
            <ChevronDown size={15} />
          </>
        )}
      </button>
    </div>
  )
}
