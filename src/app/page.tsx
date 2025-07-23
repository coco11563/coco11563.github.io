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
  const { profile, metrics, publications, citationsByYear } = 
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
        <AboutSection profile={profile} />
        
        {/* 学术指标 */}
        <MetricsSection 
          metrics={metrics} 
          citationsByYear={citationsByYear} 
        />
        
        {/* 论文发表 */}
        <PublicationsSection publications={publications} />
        
        {/* 项目展示 */}
        <ProjectsSection />
        
        {/* 联系方式 */}
        <ContactSection profile={profile} />
      </main>
      
      {/* 页脚 */}
      <Footer />
    </>
  )
}

// 确保页面在构建时生成
export const dynamic = 'force-static'