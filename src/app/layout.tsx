import type { Metadata } from 'next'
// 自托管字体（构建时打包，不依赖 Google Fonts 网络请求）
import '@fontsource-variable/inter'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/newsreader/wght-italic.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://coco11563.github.io'),
  title: 'Meng Xiao (肖濛) - Academic Homepage',
  description: 'Personal academic homepage of Meng Xiao, PhD researcher in Data-centric AI, AI4LifeScience, and Scientific Data Mining.',
  keywords: [
    'Meng Xiao',
    '肖濛',
    'Academic Homepage',
    'Chinese Academy of Sciences',
    'DUKE-NUS Medical School',
    'Data-centric AI',
    'AI4LifeScience',
    'Scientific Data Mining',
    'Machine Learning',
    'Computer Science'
  ].join(', '),
  authors: [{ name: 'Meng Xiao', url: 'https://coco11563.github.io' }],
  creator: 'Meng Xiao',
  publisher: 'GitHub Pages',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coco11563.github.io',
    title: 'Meng Xiao (肖濛) - Academic Homepage',
    description: 'Personal academic homepage showcasing research in Data-centric AI and Scientific Data Mining.',
    siteName: 'Meng Xiao Academic Homepage',
    images: [
      {
        url: '/indexfiles/me.jpeg',
        width: 270,
        height: 270,
        alt: 'Meng Xiao Profile Photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meng Xiao (肖濛) - Academic Homepage',
    description: 'Personal academic homepage showcasing research in Data-centric AI and Scientific Data Mining.',
    images: ['/indexfiles/me.jpeg'],
  },
  verification: {
    google: 'b0739eb76fca0344',
  },
  alternates: {
    canonical: 'https://coco11563.github.io',
  },
}

// 在渲染前根据 localStorage / 系统偏好设置暗色模式，避免闪烁
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    var dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        {children}

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Meng Xiao",
              "alternateName": "肖濛",
              "url": "https://coco11563.github.io",
              "image": "https://coco11563.github.io/indexfiles/me.jpeg",
              "jobTitle": "Associate Professor",
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Computer Network Information Center, Chinese Academy of Sciences"
                },
                {
                  "@type": "Organization",
                  "name": "DUKE-NUS Medical School, National University of Singapore"
                }
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "University of Chinese Academy of Sciences"
              },
              "knowsAbout": [
                "Data-centric AI",
                "AI4LifeScience",
                "Scientific Data Mining",
                "Machine Learning",
                "Deep Learning"
              ],
              "email": "mailto:shaow.at.cnic.cn",
              "sameAs": [
                "https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en",
                "https://github.com/coco11563",
                "https://dblp.org/pid/25/6475-1.html",
                "https://orcid.org/0000-0001-5294-5776"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
