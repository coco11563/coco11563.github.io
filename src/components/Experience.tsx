import { Trophy } from 'lucide-react'
import { siteContent } from '@/data/site-content'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* 时间线 */}
      <Reveal>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Positions
        </h3>
        <ol className="relative space-y-8 border-l border-stone-200 pl-6 dark:border-stone-800">
          {siteContent.timeline.map(item => (
            <li key={item.period} className="relative">
              <span className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper-light bg-accent-600 dark:border-paper-dark dark:bg-accent-400" />
              <p className="font-mono text-xs text-stone-400 dark:text-stone-500">{item.period}</p>
              <h4 className="mt-1 font-semibold text-stone-900 dark:text-stone-100">{item.title}</h4>
              <p className="text-sm text-stone-600 dark:text-stone-400">{item.organization}</p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">{item.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* 荣誉 */}
      <Reveal>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Honors & Awards
        </h3>
        <div className="space-y-4">
          {siteContent.honors.map(honor => (
            <div key={honor.title} className="card flex items-start gap-4 p-5">
              <div className="mt-0.5 rounded-lg bg-accent-50 p-2 text-accent-700 dark:bg-accent-900/40 dark:text-accent-400">
                <Trophy size={16} />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">{honor.title}</h4>
                  <span className="font-mono text-xs text-stone-400 dark:text-stone-500">{honor.year}</span>
                </div>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{honor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
