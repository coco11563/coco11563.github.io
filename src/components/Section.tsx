import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  kicker: string
  title: string
  lead?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, kicker, title, lead, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="container-page">
        <Reveal>
          <p className="section-kicker mb-1.5 text-sm">{kicker}</p>
          <h2 className="section-heading">{title}</h2>
          {lead && (
            <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">{lead}</p>
          )}
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  )
}
