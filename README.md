# portfolio

Static GitHub Pages-friendly build of the portfolio. The site uses Next.js static export and an offline concierge (no server-side AI routes).

## Local development

```bash
npm install
npm run dev
```

## Build for GitHub Pages

Project Pages (repo name is not `username.github.io`):

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

User/Organization Pages (repo named `username.github.io`):

```bash
npm run build
```

The static output is generated in `out/`. Publish that folder to GitHub Pages (via a `gh-pages` branch or `/docs`).

## GitHub Actions

This repo includes a workflow that builds the static export and deploys `out/` to GitHub Pages on pushes to `main`. The base path is inferred from `GITHUB_REPOSITORY` unless you set `NEXT_PUBLIC_BASE_PATH`.
