# Helm Corporate Website

A high-performance, SEO-optimized marketing website built with Astro, TypeScript, and Tailwind CSS.

## Features

- **Performance Optimized**: Targeting LCP < 2.0s, CLS < 0.05, INP < 200ms
- **SEO Ready**: Meta tags, OpenGraph, JSON-LD schema, auto-generated sitemap
- **Analytics**: Google Tag Manager integration with custom event tracking
- **Forms**: Contact forms integrated with Zapier webhooks
- **Blog**: Markdown-based blog with content collections
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: WCAG 2.1 AA compliant
- **CI/CD**: GitHub Actions workflow for AWS S3 + CloudFront deployment

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Build

```bash
npm run build
```

The built site will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # AWS deployment workflow
├── docs/
│   ├── README.md               # Complete documentation
│   ├── CONTENT-EDITING.md      # Content editing guide
│   └── DEPLOYMENT.md           # Deployment guide
├── public/
│   ├── images/                 # Static images
│   ├── robots.txt              # SEO robots file
│   └── favicon.svg             # Site favicon
├── src/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── ContactForm.astro
│   │   ├── FAQAccordion.jsx    # React island
│   │   ├── Footer.astro
│   │   ├── GTM.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── SEO.astro
│   │   ├── ServiceCard.astro
│   │   ├── TestimonialCard.astro
│   │   └── TestimonialCarousel.jsx  # React island
│   ├── content/
│   │   ├── blog/               # Blog posts (markdown)
│   │   └── config.ts           # Content collections config
│   ├── data/
│   │   ├── logos.json          # Client logos
│   │   ├── redirects.json      # URL redirects
│   │   ├── services.json       # Services data
│   │   └── testimonials.json   # Testimonials data
│   ├── layouts/
│   │   └── Layout.astro        # Main layout
│   └── pages/
│       ├── api/
│       │   └── form.ts         # Form API endpoint
│       ├── blog/
│       │   ├── [...slug].astro # Blog post template
│       │   └── index.astro     # Blog listing
│       ├── 404.astro
│       ├── about.astro
│       ├── case-studies.astro
│       ├── coaching.astro
│       ├── contact.astro
│       ├── how-it-works.astro
│       ├── index.astro         # Homepage
│       ├── privacy.astro
│       ├── services.astro
│       └── terms.astro
├── .env                        # Environment variables
├── astro.config.mjs            # Astro configuration
├── package.json
├── tailwind.config.mjs         # Tailwind configuration
└── tsconfig.json
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Tag Manager
GTM_ID=GTM-XXXXXXX

# Zapier webhook for forms
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

### Required Assets

Place these images in the `public/images/` directory:

- `helm-logo.svg` - Main logo
- `helm-logo-white.svg` - White version for dark backgrounds
- `hero-regina.jpg` - Homepage hero image
- `og-default.jpg` - Default OpenGraph image
- `pattern.svg` - Background pattern

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Complete Documentation](./docs/README.md)** - Full guide to the project
- **[Content Editing Guide](./docs/CONTENT-EDITING.md)** - How to edit content
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - AWS deployment setup

## Deployment

The site deploys automatically to AWS S3 + CloudFront when you push to the `main` branch.

### Required GitHub Secrets

Configure these in your repository settings:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `GTM_ID`
- `ZAPIER_WEBHOOK_URL`

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed setup instructions.

## Key Features

### SEO Optimization

- Meta tags and OpenGraph
- JSON-LD structured data
- Auto-generated sitemap
- Semantic HTML
- Image optimization

### Analytics & Tracking

- Google Tag Manager integration
- Custom event tracking:
  - CTA clicks
  - Form submissions
  - Video interactions

### Performance

- Static site generation
- Optimized images
- Minimal JavaScript
- React islands for interactivity
- CDN delivery via CloudFront

### Forms

Contact forms post to `/api/form` which forwards to Zapier webhook:
- Honeypot spam protection
- Client-side validation
- Error handling

## Commands

| Command              | Action                                      |
| :------------------- | :------------------------------------------ |
| `npm install`        | Install dependencies                        |
| `npm run dev`        | Start dev server at `localhost:4321`        |
| `npm run build`      | Build production site to `./dist/`          |
| `npm run preview`    | Preview production build locally            |
| `npm run astro ...`  | Run Astro CLI commands                      |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Copyright 2025 Helm. All Rights Reserved.

## Support

- Email: support@helm.ceo
- Phone: 917.566.0364
- Address: 417 Grand Street, New York, NY 10002
