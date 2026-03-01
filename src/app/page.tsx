import { StaticDataLoader } from '@/lib/data-loader'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { MetricsSection } from '@/components/MetricsSection'
import { PublicationsSection } from '@/components/PublicationsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ContactSection } from '@/components/ContactSection'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default async function HomePage() {
  // 在构建时获取所有数据 (Static Site Generation)
  const { profile, metrics, publications, citationsByYear, news } =
    await StaticDataLoader.loadAllData()

  return (
    <>
      {/* 导航栏 */}
      <Navigation />

      {/* 主要内容 */}
      <main className="relative">
        {/* 英雄区域 */}
        <HeroSection profile={profile} />

        {/* 关于我 */}
        <AboutSection profile={profile} news={news} />

        {/* 联系方式 */}
        <ContactSection profile={profile} />

        {/* 学术指标 */}
        <MetricsSection
          metrics={metrics}
          citationsByYear={citationsByYear}
        />

        {/* 项目展示 */}
        <ProjectsSection />

        {/* 论文发表 - 移到最后 */}
        <PublicationsSection
          publications={publications}
          scholarUrl={profile.socialLinks?.find(l => l.label === 'Google Scholar')?.url}
        />
      </main>

      {/* 页脚 */}
      <Footer news={news} profile={profile} />
    </>
  )
}

// 确保页面在构建时生成
export const dynamic = 'force-static'