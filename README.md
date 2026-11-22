# PIJUSH — Personal Website

A personal website and creative portfolio for Pijush.

**Live website:** https://pijush.runs-on.dev/  
**Repository:** https://github.com/TEJAS-MK2/Vault

The site is being rebuilt from a private cloud-storage application into a dark, editorial portfolio for software projects, experiments and writing.

## Direction

- Creative developer identity
- Dark visual system with a restrained signal-lime accent
- Experimental motion with reduced-motion support
- Project-led storytelling and real repository links
- Responsive, accessible React application

## Stack

- React 19
- TypeScript
- Vite
- GitHub Pages + GitHub Actions

## Routes

- `/` — Home
- `/about` — About
- `/projects` — Project index
- `/projects/:slug` — Project details
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

Project summaries are based on their repositories' documentation. Project status and feature details should be verified before publication. No metrics, testimonials or capabilities are fabricated.

## License

See [LICENSE](LICENSE).
