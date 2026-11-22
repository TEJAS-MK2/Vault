# PIJUSH — Personal Website

A personal website and creative portfolio for Pijush.

**Live website:** https://pijush.runs-on.dev/  
**Repository:** https://github.com/TEJAS-MK2/Vault

A dark, editorial personal site for Pijush, with a live public GitHub activity timeline, keyboard navigation and a machine-readable public profile.

## Direction

- Creative developer identity
- Dark visual system with a restrained signal-lime accent
- Experimental motion with reduced-motion support
- Personal storytelling and a live public activity timeline
- Keyboard command palette (Ctrl/⌘ + K)
- Read-only Agent Mode with `/llms.txt` and `/profile.json`
- No project catalogue or private activity exposure
- Responsive, accessible React application

## Stack

- React 19
- TypeScript
- Vite
- GitHub Pages + GitHub Actions

## Routes

- `/` — Home
- `/about` — About
- `/llms.txt` — Public site guide for automated readers
- `/profile.json` — Structured public profile
- `/experiments` — Experiments
- `/writing` — Writing
- `/uses` — Tools and setup
- `/now` — Current focus
- `/contact` — Contact

## Development

Requirements: Node.js 22+ and npm.

```sh
npm ci
npm run dev
npm run build
npm test
npm run test:smoke
```

## Privacy and infrastructure

The public website does not need Supabase authentication or storage. The old Supabase project, private bucket, stored objects, authentication users and policies are intentionally left untouched during this frontend migration. Infrastructure decommissioning, if ever desired, must be a separate reviewed task after data retention is resolved.

## Deployment

GitHub Actions builds the Vite application and publishes the `dist/` directory to GitHub Pages. The custom domain is configured through the repository's `CNAME` file.

## Content accuracy

The GitHub timeline reads only the public events API for `TEJAS-MK2`; it does not request private activity. Agent Mode is a public information view, not an interactive AI agent. No private account data, credentials, fabricated metrics or project catalogue are exposed.

## License

See [LICENSE](LICENSE).
