# Meng Xiao (肖濛) - Academic Homepage

Personal academic homepage built with Next.js, featuring automated Google Scholar data synchronization.

**Live site**: [coco11563.github.io](https://coco11563.github.io)

## Tech Stack

- **Framework**: Next.js 14 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, tsParticles
- **Data Source**: Google Scholar via SerpAPI
- **Deployment**: GitHub Pages + GitHub Actions

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
│   ├── HeroSection        # Landing hero with particle background
│   ├── AboutSection       # Bio and research interests
│   ├── MetricsSection     # Citation stats & trend chart
│   ├── PublicationsSection # Paper list from Scholar
│   ├── ProjectsSection    # Research projects
│   ├── NewsSection        # Recent updates
│   ├── ContactSection     # Contact info
│   ├── Navigation         # Top nav bar
│   └── Footer
├── lib/              # Data loading utilities
└── types/            # TypeScript type definitions
scripts/
└── fetch-scholar-data.js  # Scholar data fetcher (SerpAPI)
public/data/               # Static JSON data (auto-updated)
.github/workflows/
├── deploy.yml             # Build & deploy to GitHub Pages
└── update-data.yml        # Scheduled Scholar data sync
```

## Development

```bash
npm install
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (static export)
npm run fetch-data   # Manually refresh Scholar data (requires SERPAPI_KEY)
```

## Scholar Data Automation

A GitHub Actions workflow (`update-data.yml`) periodically fetches the latest metrics and publications from Google Scholar and commits updated JSON to `public/data/`. See `SERPAPI_SETUP.md` for API key configuration.

## License

MIT - see [LICENSE](LICENSE).
