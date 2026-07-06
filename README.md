# Meng Xiao (肖濛) - Academic Homepage

Personal academic homepage built with Next.js, featuring automated Google Scholar data synchronization.

**Live site**: [coco11563.github.io](https://coco11563.github.io)

## Tech Stack

- **Framework**: Next.js 14 (Static Export, mostly React Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (light/dark mode, self-hosted Inter & Newsreader fonts)
- **Data Source**: Google Scholar via SerpAPI
- **Deployment**: GitHub Pages + GitHub Actions

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
│   ├── Hero               # Landing hero with academic metrics strip
│   ├── About              # Short bio and profile links
│   ├── News               # Recent updates (client, expandable)
│   ├── Publications       # Selected papers grouped by year
│   ├── Projects           # Featured research projects
│   ├── Experience         # Positions timeline + honors
│   ├── Contact            # Contact, collaboration, academic service
│   ├── Navigation         # Top nav bar with theme toggle (client)
│   ├── Section / Reveal   # Section wrapper & scroll-reveal helper
│   └── Footer
├── data/
│   └── site-content.ts    # All hand-maintained content (bio, timeline, projects...)
├── lib/              # Data loading utilities
└── types/            # TypeScript type definitions
scripts/
└── fetch-scholar-data.js  # Scholar data fetcher (SerpAPI)
public/data/               # Static JSON data (auto-updated)
.github/workflows/
├── deploy.yml             # Build & deploy to GitHub Pages
└── update-data.yml        # Scheduled Scholar data sync
```

## Editing Content

- **Text, timeline, projects, services**: edit `src/data/site-content.ts`
- **Selected publications**: edit `public/data/selected-publications.json`
- **News**: edit `public/data/news.json`
- **Metrics / citations**: auto-updated daily, do not edit by hand

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
