# 肖濛 (Meng Xiao) - 个人学术主页

这是肖濛博士的个人学术主页网站，展示其学术成果、研究项目和个人信息。

## 👨‍🎓 个人信息

- **姓名**: Meng Xiao (肖濛)
- **职位**: PhD, Assistant Researcher (助理研究员)
- **机构**: 
  - Computer Network Information Center (计算机网络信息中心), Chinese Academy of Sciences (中国科学院)
  - DUKE-NUS Medical School, National University of Singapore (新加坡国立大学)
- **研究领域**: Data-centric AI, AI4LifeScience, Scientific Data Mining
- **联系方式**: 
  - 📧 shaow.at.cnic.cn (工作邮箱)
  - 📧 meng.xiao.at.nus.edu.sg (学术邮箱)
- **地址**: 8 College Road, Singapore, 169857

## 🏆 主要成就

- 中国科学院院长奖学金特别奖 (2023年首位CNIC获得者)
- 北京市科协青年人才托举工程 (2024-2026)
- 发表学术论文30余篇，包括iMeta、NeurIPS、ICLR、ICML、IEEE TKDE等顶级期刊和会议

## 🛠 技术栈

### 前端技术
- **HTML5** - 页面结构
- **CSS3** - 样式设计和响应式布局
- **JavaScript (ES6+)** - 交互功能和动态效果

### 后端服务
- **Firebase Realtime Database** - 实时数据存储
- **Firebase Hosting** - 静态网站托管（可选）

### 开发工具
- **Git** - 版本控制
- **GitHub Pages** - 网站部署
- **Node.js** - 包管理和本地开发

## 🗄️ 数据库信息

### Firebase 配置
- **项目ID**: `personal-pages-d1060`
- **数据库URL**: `https://personal-pages-d1060-default-rtdb.asia-southeast1.firebasedatabase.app`
- **区域**: Asia Southeast 1 (Singapore)

### 数据结构
```json
{
  "hobbyData": {
    "shaker": { "count": 0, "full": 0, "timestamp": 0 },
    "guitar": { "count": 0, "full": 0, "timestamp": 0 },
    "beer": { "count": 0, "full": 0, "timestamp": 0 }
  }
}
```

### 数据库安全规则
- 读取权限：完全开放
- 写入权限：限制频率（防刷新）
- 数据验证：确保数据格式正确

## 🚀 快速开始

### 环境要求
- Node.js 14.0+ 
- npm 或 yarn
- Git

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/coco11563/mengxiao.github.io.git
   cd mengxiao.github.io
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动本地服务器**
   ```bash
   npm start
   # 或者使用 Python
   python -m http.server 8000
   ```

4. **访问网站**
   打开浏览器访问 `http://localhost:8000`

### 部署到 GitHub Pages

1. **推送代码到主分支**
   ```bash
   git add .
   git commit -m "Update homepage"
   git push origin main
   ```

2. **GitHub Pages 自动部署**
   - 网站将自动发布到 `https://coco11563.github.io`

## 📁 项目结构

```
.
├── index.html              # 主页面
├── main.css               # 主样式文件
├── main_style.css         # 附加样式
├── package.json           # 项目配置和依赖
├── firebase.json          # Firebase 配置
├── database.rules.json    # 数据库安全规则
├── sitemap.xml           # 网站地图
├── .gitignore            # Git 忽略文件
├── indexfiles/           # 个人图片和图标
│   ├── me.png           # 个人照片
│   ├── googlescholar.png
│   └── ...
└── pubfiles/            # 论文和项目图片
    ├── ICML2025.png
    ├── CIKM24.jpg
    └── ...
```

## ✨ 特色功能

### 交互式爱好组件
- **鸡尾酒调制** 🍸 - 点击体验调酒动画
- **吉他演奏** 🎸 - 点击体验摇滚动画  
- **啤酒酿造** 🍺 - 点击体验酿酒动画
- **进度跟踪** - 实时显示点击进度
- **烟花效果** - 达成目标时的庆祝动画
- **防刷机制** - 200ms 冷却时间防止恶意点击

### 响应式设计
- 适配桌面端和移动端
- 流畅的动画效果
- 优雅的视觉设计

### 学术内容展示
- 个人简介和研究方向
- 最新学术动态
- 发表论文列表
- 项目经历展示
- 获奖情况
- 学术服务

## 🔧 配置说明

### 环境变量 (.env)
```env
# Firebase 配置 (如需要本地开发)
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=personal-pages-d1060
FIREBASE_DATABASE_URL=https://personal-pages-d1060-default-rtdb.asia-southeast1.firebasedatabase.app
```

### 本地开发脚本
```json
{
  "scripts": {
    "start": "python -m http.server 8000",
    "deploy": "git push origin main",
    "build": "echo 'No build process needed for static site'",
    "lint": "echo 'Add linting tools if needed'"
  }
}
```

## 📱 浏览器兼容性

- Chrome 60+
- Firefox 55+  
- Safari 11+
- Edge 79+

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📞 联系方式

- **学术合作**: meng.xiao.at.nus.edu.sg
- **技术支持**: shaow.at.cnic.cn
- **GitHub**: [coco11563](https://github.com/coco11563)
- **Google Scholar**: [Meng Xiao](https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en)

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有合作者和导师的支持：
- Prof. Yuanchun Zhou (周园春教授)
- Prof. Yi Du (杜一教授)  
- Prof. Yanjie Fu (付妍杰教授)
- Dr. Min Wu (吴敏博士)
- Prof. Jinmiao Chen (陈金苗教授)

---

*最后更新: 2025年7月*