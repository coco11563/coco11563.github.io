import { loadAllData } from '@/lib/data-loader'
import { siteContent } from '@/data/site-content'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Section } from '@/components/Section'
import { News } from '@/components/News'
import { Publications } from '@/components/Publications'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default async function HomePage() {
  // 构建时读取 public/data 下的静态数据 (SSG)
  const { profile, metrics, publications, citationsByYear, news } = await loadAllData()

  const scholarUrl = siteContent.socialLinks.find(l => l.label === 'Google Scholar')?.url

  return (
    <>
      <Navigation />

      <main>
        <Hero profile={profile} metrics={metrics} citationsByYear={citationsByYear} />

        <About />

        <Section id="news" kicker="News" title="Latest Updates">
          <News news={news} />
        </Section>

        <Section id="publications" kicker="Research" title="Selected Publications">
          <Publications publications={publications} scholarUrl={scholarUrl} />
        </Section>

        <Section id="projects" kicker="Projects" title="Featured Projects">
          <Projects />
        </Section>

        <Section id="experience" kicker="Background" title="Experience & Honors">
          <Experience />
        </Section>

        <Section id="contact" kicker="Contact" title="Get in Touch">
          <Contact profile={profile} />
        </Section>
      </main>

      <Footer />
    </>
  )
}

// 静态导出：页面在构建时生成
export const dynamic = 'force-static'
