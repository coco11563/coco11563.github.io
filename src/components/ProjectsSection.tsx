'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Award, Users } from 'lucide-react'

export function ProjectsSection() {
  const projects = [
    {
      title: "SciHorizon: AI-for-Science Benchmark",
      description: "A comprehensive benchmarking platform for evaluating AI systems in scientific applications, from data processing to large language model integration.",
      status: "SIGKDD 2025",
      links: {
        project: "https://www.scihorizon.cn/",
        github: ""
      },
      tags: ["AI4Science", "Benchmark", "LLM"],
      featured: true
    },
    {
      title: "scCompass: Multi-Species scRNA-seq Database",
      description: "An integrated database and analysis platform for single-cell RNA sequencing data across multiple species, designed for AI-ready applications.",
      status: "Advanced Sciences 2025",
      links: {
        project: "http://www.bdbe.cn/kun#/",
        github: ""
      },
      tags: ["Bioinformatics", "Database", "scRNA-seq"],
      featured: true
    },
    {
      title: "GeneCompass: Gene Regulatory Foundation Model",
      description: "A knowledge-informed cross-species foundation model for understanding universal gene regulatory mechanisms.",
      status: "Cell Research 2024",
      links: {
        project: "",
        github: "https://github.com/xCompass-AI/GeneCompass"
      },
      tags: ["Foundation Model", "Gene Regulation", "Cross-species"],
      featured: true
    },
    {
      title: "Data-Centric AI Workshop Series",
      description: "Organizing workshops at top-tier conferences (ICDM, CIKM) to advance data-centric approaches in AI research.",
      status: "ICDM 2023/2024, CIKM 2024",
      links: {
        project: "https://data-centric-ai-dev.github.io/",
        github: ""
      },
      tags: ["Workshop", "Data-Centric AI", "Community"],
      featured: false
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading collaborative research initiatives and open-source contributions
          </p>
        </motion.div>

        {/* 项目网格 */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card p-6 card-hover relative ${
                project.featured ? 'border-primary-200 bg-gradient-to-br from-white to-primary-50' : ''
              }`}
            >
              {/* 特色标签 */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                    <Award size={12} />
                    Featured
                  </div>
                </div>
              )}

              {/* 状态标签 */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {project.status}
                </span>
              </div>

              {/* 项目标题 */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>

              {/* 项目描述 */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 链接 */}
              <div className="flex gap-3">
                {project.links.project && (
                  <a
                    href={project.links.project}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Visit Project
                  </a>
                )}
                
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 协作说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Users size={24} className="text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Collaborative Research
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Most projects are collaborative efforts with talented researchers from leading institutions. 
              I believe in open science and actively contribute to open-source initiatives that benefit 
              the broader research community.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}