'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Github, ChevronDown, ChevronUp } from 'lucide-react'
import { siteContent, Project } from '@/data/site-content'
import { Reveal } from './Reveal'

const DEFAULT_VISIBLE = 2

function ProjectCard({ project }: { project: Project }) {
  return (
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
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const projects = siteContent.projects
  const visible = showAll ? projects : projects.slice(0, DEFAULT_VISIBLE)
  const hiddenCount = projects.length - DEFAULT_VISIBLE

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map(project => (
          <Reveal key={project.title}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:bg-stone-800"
          >
            {showAll ? (
              <>
                Show fewer projects
                <ChevronUp size={15} />
              </>
            ) : (
              <>
                Show {hiddenCount} more {hiddenCount === 1 ? 'project' : 'projects'}
                <ChevronDown size={15} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
