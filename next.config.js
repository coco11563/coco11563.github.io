/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // GitHub Pages 配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',

  // 图片优化（适配静态导出）
  images: {
    unoptimized: true,
  },
  
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
  },
  
  // 自定义 webpack 配置
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 在服务器端构建时可以执行的任务
    }
    return config;
  },
  
  // 环境变量
  env: {
    SCHOLAR_ID: process.env.SCHOLAR_ID || 'YGwukbUAAAAJ',
  },
}

module.exports = nextConfig