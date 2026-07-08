import { siteContent } from '@/data/site-content'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 py-8 dark:border-stone-800">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-stone-500 sm:flex-row dark:text-stone-500">
        <p>&copy; {currentYear} Meng Xiao (肖濛)</p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {siteContent.socialLinks.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-stone-900 dark:hover:text-stone-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-stone-400 dark:text-stone-600">
          Built with Next.js · Data auto-updated daily
        </p>
      </div>
    </footer>
  )
}
