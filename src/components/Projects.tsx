import Image from 'next/image'
import { ArrowUpRight, Github } from 'lucide-react'
import { siteContent } from '@/data/site-content'
import { Reveal } from './Reveal'

export function Projects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {siteContent.projects.map(project => (
        <Reveal key={project.title}>
          <div className="card group flex h-full flex-col overflow-hidden">
            {project.image && (
              <div className="relative h-44 overflow-hidden border-b border-stone-200/80 bg-stone-100 dark:border-stone-800 dark:bg-stone-800">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl font-medium">{project.title}</h3>
                <span className="chip-accent shrink-0">{project.status}</span>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="chip-neutral">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-4">
                {project.links.project && (
                  <a
                    href={project.links.project}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
                  >
                    Visit project
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
