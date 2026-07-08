import Image from 'next/image'
import { Mail, MapPin, ArrowUpRight, BadgeCheck } from 'lucide-react'
import { ScholarProfile, Metrics, CitationsByYear } from '@/types/scholar'
import { siteContent } from '@/data/site-content'

interface HeroProps {
  profile: ScholarProfile
  metrics: Metrics
  citationsByYear: CitationsByYear[]
}

function CitationSparkline({ data }: { data: CitationsByYear[] }) {
  const recent = data.slice(-8)
  if (recent.length === 0) return null
  const max = Math.max(...recent.map(d => d.citations), 1)

  return (
    <div className="flex items-end gap-1" aria-label="Citations per year">
      {recent.map(item => (
        <div key={item.year} className="group relative flex flex-col items-center">
          <div
            className="w-2.5 rounded-t-sm bg-accent-600/70 transition-colors group-hover:bg-accent-600 dark:bg-accent-400/60 dark:group-hover:bg-accent-400"
            style={{ height: `${Math.max((item.citations / max) * 44, 3)}px` }}
          />
          <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-stone-100 dark:text-stone-900">
            {item.year}: {item.citations}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Hero({ profile, metrics, citationsByYear }: HeroProps) {
  const emails = Array.isArray(profile.email) ? profile.email : [profile.email]
  const lastUpdated = metrics.lastUpdated
    ? new Date(metrics.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  const stats = [
    { label: 'Citations', value: metrics.totalCitations.toLocaleString() },
    { label: 'h-index', value: String(metrics.hIndex) },
    { label: 'i10-index', value: String(metrics.i10Index) },
    { label: 'Publications', value: '40+' },
  ]

  return (
    <header id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* 背景：非常轻的点阵 + 顶部渐隐 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(120 113 108 / 0.35) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 90%)',
        }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr,auto]">
          {/* 左侧：文字信息 */}
          <div className="max-w-2xl">
            <p className="section-kicker mb-4">{siteContent.hero.overline}</p>

            <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              {profile.nameZh ? profile.name.replace(`(${profile.nameZh})`, '').trim() : profile.name}
              {profile.nameZh && (
                <span className="ml-4 align-middle font-serif text-3xl text-stone-400 sm:text-4xl dark:text-stone-500">
                  {profile.nameZh}
                </span>
              )}
            </h1>

            {/* 职位 */}
            <div className="mt-6 space-y-2">
              {siteContent.hero.roles.map(role => (
                <div key={role.title} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-700 dark:text-stone-300">
                  <MapPin size={15} className="shrink-0 text-accent-700 dark:text-accent-400" />
                  <span>{role.title}</span>
                  {role.lab && (
                    <>
                      <span className="text-stone-400 dark:text-stone-600">·</span>
                      <a
                        href={role.lab.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-inline"
                      >
                        {role.lab.name}
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* 关键词标签：可点击跳转 Wikipedia */}
            <div className="mt-6 flex flex-wrap gap-2">
              {siteContent.keywords.map(keyword => (
                <a
                  key={keyword.label}
                  href={keyword.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-accent transition-colors hover:bg-accent-100 hover:ring-accent-600/40 dark:hover:bg-accent-900/60 dark:hover:ring-accent-400/40"
                >
                  {keyword.label}
                </a>
              ))}
            </div>

            {/* 行动按钮 */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {siteContent.socialLinks.slice(0, 2).map((link, index) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={index === 0 ? 'btn-primary' : 'btn-secondary'}
                >
                  {link.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
              <a href={`mailto:${emails[0]?.replace('.at.', '@')}`} className="btn-secondary">
                <Mail size={15} />
                Email
              </a>
            </div>
          </div>

          {/* 右侧：照片 */}
          <div className="justify-self-center lg:justify-self-end">
            <div className="relative">
              {/* 错位边框装饰 */}
              <div className="absolute -inset-0 translate-x-3 translate-y-3 rounded-full border border-accent-600/30 dark:border-accent-400/20" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-stone-200 shadow-lg sm:h-72 sm:w-72 dark:border-stone-800">
                <Image
                  src={profile.image}
                  alt={`${profile.name} profile photo`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 224px, 288px"
                />
              </div>
              {profile.verified && (
                <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full border border-stone-200 bg-white py-1.5 pl-2 pr-3 text-xs font-medium text-stone-700 shadow-md dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
                  <BadgeCheck size={15} className="text-accent-600 dark:text-accent-400" />
                  Verified Scholar
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 学术指标条 */}
        <div className="card mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="font-serif text-2xl font-medium sm:text-3xl">{stat.value}</div>
                <div className="mt-0.5 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-500">
                  {stat.label}
                </div>
              </div>
            ))}
            <div className="hidden sm:block">
              <CitationSparkline data={citationsByYear} />
              <div className="mt-1 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-500">
                Citation Trend
              </div>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-xs text-stone-400 dark:text-stone-600">
              Auto-updated from Google Scholar · {lastUpdated}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
