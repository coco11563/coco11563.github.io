import Image from 'next/image'
import { ExternalLink, FileText, Code, Quote, Trophy } from 'lucide-react'
import { Publication } from '@/types/scholar'
import { Reveal } from './Reveal'

interface PublicationsProps {
  publications: Publication[]
  scholarUrl?: string
}

const venueStyles: Record<string, string> = {
  journal: 'chip bg-sky-50 text-sky-800 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-900/40 dark:text-sky-300 dark:ring-sky-400/20',
  conference: 'chip-accent',
  workshop: 'chip bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-400/20',
}

const roleLabels: Record<string, string> = {
  'first-author': 'First Author',
  'co-first-author': 'Co-first Author',
  'corresponding-author': 'Corresponding Author',
}

function AuthorList({ authors, collapse }: { authors: string[]; collapse?: boolean }) {
  // 作者过多时只显示前 4 位 + … + 末位（完整列表仍保留在数据中）
  const shown = collapse && authors.length > 6 ? [...authors.slice(0, 4), '…', authors[authors.length - 1]] : authors

  return (
    <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      {shown.map((author, i) => {
        const isMe = author.includes('Meng Xiao') || author.includes('肖濛')
        return (
          <span key={i} className={isMe ? 'font-semibold text-stone-800 dark:text-stone-200' : ''}>
            {author}
            {i < shown.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </p>
  )
}

function PublicationLinks({ urls }: { urls: Publication['urls'] }) {
  const links = [
    { url: urls.paper, label: 'Paper', icon: FileText },
    { url: urls.code, label: 'Code', icon: Code },
    { url: urls.project, label: 'Project', icon: ExternalLink },
    { url: urls.citations, label: 'Cited by', icon: Quote },
  ].filter(link => link.url)

  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4">
      {links.map(({ url, label, icon: Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 hover:underline dark:text-accent-400"
        >
          <Icon size={13} />
          {label}
        </a>
      ))}
    </div>
  )
}

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="group grid gap-4 border-l-2 border-stone-200 pl-5 transition-colors hover:border-accent-600 sm:grid-cols-[1fr,auto] dark:border-stone-800 dark:hover:border-accent-400">
      <div className="space-y-2.5">
        {/* 标签行 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={venueStyles[pub.venueType] ?? 'chip-neutral'}>{pub.venue}</span>
          <span className="text-xs text-stone-400 dark:text-stone-500">{pub.year}</span>
          {pub.authorRole && roleLabels[pub.authorRole] && (
            <span className="chip-neutral">{roleLabels[pub.authorRole]}</span>
          )}
          {pub.award && (
            <span className="chip bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-400/20">
              <Trophy size={11} />
              {pub.award}
            </span>
          )}
          {pub.citations > 0 && (
            <span className="text-xs text-stone-400 dark:text-stone-500">{pub.citations} citations</span>
          )}
        </div>

        {/* 标题 + 作者 */}
        <h3 className="text-base font-semibold leading-snug text-stone-900 dark:text-stone-100">
          {pub.title}
        </h3>
        <AuthorList authors={pub.authors} collapse={pub.collapseAuthors} />

        <PublicationLinks urls={pub.urls} />
      </div>

      {/* 缩略图 */}
      {pub.image && (
        <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-stone-200 sm:block dark:border-stone-800">
          <Image
            src={pub.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      )}
    </article>
  )
}

export function Publications({ publications, scholarUrl }: PublicationsProps) {
  const surveys = publications
    .filter(pub => pub.isSurvey)
    .sort((a, b) => b.year - a.year)

  const research = publications.filter(pub => !pub.isSurvey)

  const researchByYear = research.reduce((acc, pub) => {
    ;(acc[pub.year] ??= []).push(pub)
    return acc
  }, {} as Record<number, Publication[]>)

  const years = Object.keys(researchByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div>
      {/* 综述与评论 */}
      {surveys.length > 0 && (
        <Reveal className="mb-14">
          <div className="grid gap-6 sm:grid-cols-[5rem,1fr]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-700 sm:sticky sm:top-24 sm:self-start dark:text-accent-400">
              Surveys &amp; Reviews
            </h3>
            <div className="space-y-8">
              {surveys.map(pub => (
                <PublicationCard key={pub.id} pub={pub} />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* 按年份分组的研究论文 */}
      <div className="space-y-14">
        {years.map(year => (
          <Reveal key={year}>
            <div className="grid gap-6 sm:grid-cols-[5rem,1fr]">
              <div className="font-serif text-3xl font-medium text-stone-300 sm:sticky sm:top-24 sm:self-start dark:text-stone-700">
                {year}
              </div>
              <div className="space-y-8">
                {researchByYear[year].map(pub => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {scholarUrl && (
        <Reveal className="mt-14 text-center">
          <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            View full publication list on Google Scholar
            <ExternalLink size={15} />
          </a>
        </Reveal>
      )}
    </div>
  )
}
