import { Section } from './Section'
import { Reveal } from './Reveal'
import { ArrowUpRight } from 'lucide-react'
import { siteContent } from '@/data/site-content'

export function About() {
  return (
    <Section id="about" kicker="About" title="Short Bio">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-stone-700 dark:text-stone-300">
            {siteContent.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Find me on
            </h3>
            <ul className="mt-4 space-y-1">
              {siteContent.socialLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-accent-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-accent-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={15}
                      className="text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-700 dark:group-hover:text-accent-400"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
