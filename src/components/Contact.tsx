import { Mail, MapPin, Users, ClipboardCheck } from 'lucide-react'
import { ScholarProfile } from '@/types/scholar'
import { siteContent } from '@/data/site-content'
import { Reveal } from './Reveal'

export function Contact({ profile }: { profile: ScholarProfile }) {
  const emails = Array.isArray(profile.email) ? profile.email : [profile.email]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 联系方式 */}
      <Reveal>
        <div className="card h-full p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Mail size={17} className="text-accent-700 dark:text-accent-400" />
            Contact
          </h3>
          <ul className="mt-4 space-y-3">
            {emails.map(email => (
              <li key={email}>
                <a
                  href={`mailto:${email.replace('.at.', '@')}`}
                  className="text-sm text-stone-700 hover:text-accent-700 dark:text-stone-300 dark:hover:text-accent-400"
                >
                  {email.replace('.at.', '@')}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            {profile.affiliation.map(name => (
              <div key={name} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-stone-400 dark:text-stone-500" />
                {name}
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-lg bg-stone-100 p-3 text-xs leading-relaxed text-stone-500 dark:bg-stone-800/60 dark:text-stone-400">
            I typically respond within 2–3 business days. For urgent matters, please mention
            &ldquo;URGENT&rdquo; in the subject line.
          </p>
        </div>
      </Reveal>

      {/* 合作方向 */}
      <Reveal>
        <div className="card h-full p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Users size={17} className="text-accent-700 dark:text-accent-400" />
            Open to Collaborate on
          </h3>
          <ul className="mt-4 space-y-3">
            {siteContent.collaboration.map(topic => (
              <li key={topic} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* 学术服务 */}
      <Reveal>
        <div id="services" className="card h-full p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <ClipboardCheck size={17} className="text-accent-700 dark:text-accent-400" />
            Academic Service
          </h3>
          <dl className="mt-4 space-y-4">
            {siteContent.services.map(service => (
              <div key={service.role}>
                <dt className="text-sm font-medium text-stone-900 dark:text-stone-100">{service.role}</dt>
                <dd className="text-sm text-stone-600 dark:text-stone-400">{service.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  )
}
