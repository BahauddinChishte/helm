# Helm Corporate Website

A high-performance, SEO-optimized corporate website for Helm Staffing and Coaching services. Built with Astro, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **UI Components**: Astro + React (Islands Architecture)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Analytics**: Google Tag Manager
- **Deployment**: Netlify

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
├── .astro/                     # Astro cache and generated types
├── docs/                       # Project documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── README.md              # Complete documentation
├── public/                     # Static assets (served as-is)
│   └── images/
│       ├── client-pictures/   # Client testimonial photos
│       ├── coaching-page/     # Coaching page images
│       ├── company-logo/      # Client company logos
│       ├── executive-assistant-page/  # EA page images
│       ├── learn-more/        # Learn more modal images
│       ├── logo/              # Helm branding assets
│       ├── people/            # Team member photos
│       ├── privacy-page/      # Privacy page background
│       ├── resources-page/    # Resources page images
│       ├── sections-picture/  # Generic section images
│       ├── service-card-logo/ # Service icon images
│       ├── staffing-company-logo/  # Staffing client logos
│       └── video-thumbnail/   # Video preview thumbnails
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── BookModal.jsx      # Book appointment modal (React)
│   │   ├── Button.astro       # Button component
│   │   ├── CompanyLogos.astro # Client logo grid
│   │   ├── ContactForm.astro  # Contact form component
│   │   ├── FAQAccordion.jsx   # FAQ accordion (React)
│   │   ├── FAQSection.astro   # FAQ section wrapper
│   │   ├── Footer.astro       # Site footer
│   │   ├── GTM.astro          # Google Tag Manager (head)
│   │   ├── GTMBody.astro      # Google Tag Manager (body)
│   │   ├── Header.astro       # Site header & navigation
│   │   ├── Hero.astro         # Hero section component
│   │   ├── LearnMoreModal.jsx # Learn more modal (React)
│   │   ├── QuoteModal.jsx     # Request quote modal (React)
│   │   ├── SEO.astro          # SEO meta tags component
│   │   ├── ServiceCard.astro  # Service card component
│   │   ├── SupportServicesGrid.astro  # Support services grid
│   │   ├── TestimonialCarousel.jsx    # Testimonial slider (React)
│   │   ├── VideoTestimonials.jsx      # Video testimonials (React)
│   │   └── role-components/   # Role-specific components
│   │       ├── HowItWorksSteps.astro
│   │       ├── RoleTestimonials.astro
│   │       └── WhyChoose.astro
│   ├── content/               # Content collections
│   │   └── blog/              # Blog posts (Markdown)
│   │       ├── best-va-services.md
│   │       ├── company-audit-five-minutes.md
│   │       └── the-system-ebook.md
│   ├── data/                  # Static data (JSON)
│   │   ├── logos.json         # Client company logos
│   │   ├── services.json      # Core services data
│   │   ├── support-services.json  # Support services data
│   │   ├── testimonials.json  # Client testimonials
│   │   └── video-testimonials.json  # Video testimonial data
│   ├── layouts/
│   │   └── Layout.astro       # Main site layout
│   ├── pages/                 # File-based routing
│   │   ├── free-resources/
│   │   │   └── index.astro    # Resources listing page
│   │   ├── services/          # Service detail pages
│   │   │   ├── admin-support.astro
│   │   │   ├── customer-support.astro
│   │   │   └── finance-support.astro
│   │   ├── about.astro
│   │   ├── case-studies.astro
│   │   ├── coaching.astro     # Coaching services page
│   │   ├── contact.astro      # Contact page
│   │   ├── disclaimer.astro
│   │   ├── executive-assistant.astro
│   │   ├── how-companies-get-their-sht-together.astro
│   │   ├── how-it-works.astro
│   │   ├── how-to-audit-your-entire-company-in-five-minutes-to-see-whats-working-and-whats-not.astro
│   │   ├── index.astro        # Homepage
│   │   ├── manifesto.astro
│   │   ├── privacy-policy.astro
│   │   ├── services.astro     # Services overview
│   │   ├── staffing.astro     # Staffing services page
│   │   └── the-best-va-services-for-your-business.astro
│   ├── styles/
│   │   └── global.css         # Global styles
│   └── env.d.ts               # TypeScript environment types
├── .env                       # Environment variables (not in git)
├── .gitignore
├── astro.config.mjs           # Astro configuration
├── DESIGN-SYSTEM.md           # Design system documentation
├── netlify.toml               # Netlify configuration
├── package.json
├── README.md
├── SETUP-CHECKLIST.md         # Setup checklist
├── tailwind.config.mjs        # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Key Concepts

### File-Based Routing

Astro uses file-based routing. Each `.astro` file in `src/pages/` becomes a route:

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/services/admin-support.astro` → `/services/admin-support`

### Components

**Astro Components** (`.astro` files):
- Server-rendered by default
- Zero JavaScript shipped to client
- Used for layouts, static content, and UI structure
- Examples: `Header.astro`, `Footer.astro`, `Hero.astro`

**React Components** (`.jsx` files):
- Used for interactive features
- Only load JavaScript when needed (Islands Architecture)
- Examples: `TestimonialCarousel.jsx`, `FAQAccordion.jsx`, `BookModal.jsx`

### Data Management

**Static Data** (`src/data/*.json`):
- Client logos
- Services information
- Testimonials
- Video testimonials metadata

This data is imported directly into components at build time.

**Content Collections** (`src/content/blog/`):
- Blog posts written in Markdown
- Managed through Astro's Content Collections API
- Supports frontmatter for metadata

### Layouts

The main layout (`src/layouts/Layout.astro`) wraps all pages and includes:
- SEO meta tags
- Google Tag Manager
- Header
- Footer
- Global styles

### Public Assets

Files in `public/` are served as-is at the root path:
- `public/images/logo/helm-white-logo-1.webp` → `/images/logo/helm-white-logo-1.webp`

**Image Organization**:
- `client-pictures/` - Individual client testimonial photos
- `company-logo/` - Client company logos for trust section
- `coaching-page/` - Images specific to coaching page
- `executive-assistant-page/` - EA service page assets
- `resources-page/` - Blog and resource thumbnails
- `sections-picture/` - Generic section backgrounds/images
- `service-card-logo/` - Icons for service cards
- `staffing-company-logo/` - Logos for staffing clients section

## Environment Variables

Create a `.env` file in the root directory:

```env
# Google Tag Manager
PUBLIC_GTM_ID=GTM-XXXXXXX

# Supabase (if using database features)
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Note**: Environment variables prefixed with `PUBLIC_` are exposed to the client-side code.

## Styling

### Tailwind CSS

The project uses Tailwind CSS with custom brand colors:

```js
// tailwind.config.mjs
colors: {
  brand: {
    navy: '#343A5A',        // Primary navy
    navyDark: '#2A2F47',    // Darker navy for hovers
    orange: '#EC7A00',       // Primary orange
    orangeDark: '#D06E00',   // Darker orange for hovers
    slate: '#64748B',        // Text gray
  }
}
```

### Global Styles

Custom global styles are in `src/styles/global.css`.

## Key Features

### SEO

- Meta tags via `SEO.astro` component
- OpenGraph and Twitter Card support
- Semantic HTML structure
- Image optimization

### Analytics

- Google Tag Manager integration
- Custom event tracking throughout the site
- Form submission tracking

### Modals

Interactive modals use React for client-side functionality:
- `BookModal.jsx` - Book appointment
- `QuoteModal.jsx` - Request a quote
- `LearnMoreModal.jsx` - Additional information

### Forms

Contact forms use the `ContactForm.astro` component and can be integrated with:
- Zapier webhooks
- Email services
- Supabase database

## Adding New Content

### Adding a New Page

1. Create a new `.astro` file in `src/pages/`
2. Use the Layout component
3. Add your content

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="New Page" description="Page description">
  <h1>New Page Content</h1>
</Layout>
```

### Adding a Blog Post

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter:

```markdown
---
title: "Post Title"
description: "Post description"
pubDate: 2025-01-15
image: "/images/resources-page/post-image.webp"
---

Your content here...
```

### Adding a Service

Update `src/data/services.json` with the new service information.

### Adding a Testimonial

Update `src/data/testimonials.json` with:
```json
{
  "name": "Client Name",
  "company": "Company Name",
  "role": "Job Title",
  "content": "Testimonial text",
  "image": "/images/client-pictures/client-name.webp"
}
```

### Adding Client Logos

1. Add logo to `public/images/company-logo/`
2. Update `src/data/logos.json`

## Development Guidelines

### Component Organization

- Keep components focused and single-purpose
- Use Astro components for static content
- Use React components only for interactive features
- Extract reusable logic into separate components

### File Naming

- Use kebab-case for files: `my-component.astro`
- Use PascalCase for React components: `MyComponent.jsx`
- Use lowercase for folders: `my-folder/`

### Image Optimization

- Use WebP format when possible
- Include appropriate alt text
- Use loading="lazy" for below-fold images
- Use loading="eager" for above-fold images

### Responsive Design

- Mobile-first approach
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on multiple screen sizes

## Commands Reference

| Command              | Action                                      |
| :------------------- | :------------------------------------------ |
| `npm install`        | Install dependencies                        |
| `npm run dev`        | Start dev server at `localhost:4321`        |
| `npm run build`      | Build production site to `./dist/`          |
| `npm run preview`    | Preview production build locally            |
| `npm run astro ...`  | Run Astro CLI commands                      |

## Deployment

The site is configured for Netlify deployment:

- Builds are triggered on git push
- Configuration is in `netlify.toml`
- Environment variables are set in Netlify dashboard

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Documentation

For more detailed information, see:

- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design system and component guidelines
- **[SETUP-CHECKLIST.md](./SETUP-CHECKLIST.md)** - Initial setup checklist
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment guide
- **[docs/README.md](./docs/README.md)** - Complete documentation

## Support

- **Email**: support@helm.ceo
- **Phone**: 917.566.0364
- **Office**: 417 Grand Street, New York, NY 10002

## License

Copyright 2025 Helm. All Rights Reserved.
