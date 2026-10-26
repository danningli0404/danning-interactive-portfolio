# Danning Li · Interactive portfolio

An independent bilingual portfolio with a dark interactive homepage and eight projects. Four main case studies follow the supplied PNG design frames through semantic HTML, CSS and SVG. Photographs, product renders and individual app screens are original source assets, not sliced page layouts.

## Develop

Node.js 22.18+ and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
NEXT_PUBLIC_PAGES_BASE_PATH=/danning-interactive-portfolio pnpm build:pages
node --test tests/*.mjs
```

## Update content

The four frame-based cases live in `components/faithful-project.tsx` with styles in `app/faithful.css`. The remaining projects and all three graduate studio records use `lib/portfolio-data.json`. Keep Chinese and English text paired. Mark ongoing work with `progress: true`. All photos and renders remain independent image assets under `public/`.

The homepage includes a responsive pointer field, global cursor glow and trail, project hover feedback, motion-pause control and reduced-motion support. Project images can be enlarged and closed with Escape.

## Publish

The GitHub Actions workflow builds and validates the site before publishing it to GitHub Pages. This repository is separate from the previous portfolio and does not modify that site.

Project material belongs to Danning Li and the credited project teams. Original resumes and research transcripts are not included.
