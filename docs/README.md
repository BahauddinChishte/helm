# Helm Corporate Site Documentation

This documentation provides everything you need to manage, update, and deploy the Helm corporate website.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Editing Content](#editing-content)
3. [Managing Images](#managing-images)
4. [Redirects](#redirects)
5. [Deployment](#deployment)
6. [GA4 Events](#ga4-events)
7. [Performance](#performance)

## Getting Started

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

The site will be available at `http://localhost:4321`

### Build

```bash
npm run build
```

The built site will be in the `dist` directory.

## Editing Content

### Homepage Content

The homepage content is in `/src/pages/index.astro`. Key sections:

- **Hero**: Edit title, description, and CTA buttons
- **Services**: Managed via `/src/data/services.json`
- **Testimonials**: Managed via `/src/data/testimonials.json`
- **Logos**: Managed via `/src/data/logos.json`
- **FAQs**: Inline in the page file

### Services

Edit `/src/data/services.json` to add, remove, or modify services:

```json
{
  "id": "service-id",
  "title": "Service Name",
  "description": "Service description...",
  "icon": "icon-name"
}
```

### Testimonials

Edit `/src/data/testimonials.json`:

```json
{
  "id": 1,
  "name": "Client Name",
  "title": "Title",
  "company": "Company",
  "quote": "Testimonial text...",
  "image": "/images/testimonials/photo.jpg",
  "videoUrl": "https://youtube.com/..."
}
```

### Blog Posts

Blog posts are in `/src/content/blog/`. Create a new markdown file:

```markdown
---
title: "Post Title"
description: "Post description"
pubDate: 2024-01-15
author: "Author Name"
image: "/images/blog/image.jpg"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Static Pages

Edit these files directly:
- `/src/pages/about.astro`
- `/src/pages/services.astro`
- `/src/pages/how-it-works.astro`
- `/src/pages/case-studies.astro`
- `/src/pages/contact.astro`

## Managing Images

### Image Locations

All images go in `/public/images/`:
- `/public/images/logos/` - Client logos
- `/public/images/testimonials/` - Testimonial photos
- `/public/images/blog/` - Blog post images
- `/public/images/` - General site images

### Image Optimization

1. Use WebP format when possible
2. Provide width and height attributes
3. Use descriptive alt text
4. Compress images before uploading
5. Use loading="lazy" for below-fold images

### Hero Images

Replace `/public/images/hero-regina.jpg` with your hero image. Recommended size: 1200x800px

## Redirects

### Managing Redirects

Edit `/src/data/redirects.json` to add old → new URL mappings:

```json
[
  {
    "from": "/old-page",
    "to": "/new-page",
    "status": 301
  }
]
```

### Implementation

Redirects are handled at the CloudFront level. The build process generates redirect rules that need to be configured in your CloudFront distribution.

For S3-only deployments, you'll need to handle redirects differently:

1. Create error documents in S3
2. Use Lambda@Edge functions
3. Configure redirect rules in CloudFront

## Deployment

### Automatic Deployment (GitHub Actions)

Pushes to the `main` branch automatically trigger deployment.

### Required GitHub Secrets

Set these in your repository settings (Settings → Secrets and variables → Actions):

#### AWS Configuration
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `AWS_S3_BUCKET` - S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID

#### Application Secrets
- `GTM_ID` - Google Tag Manager container ID
- `ZAPIER_WEBHOOK_URL` - Zapier webhook URL for forms

### Manual Deployment

```bash
# Build the site
npm run build

# Upload to S3
aws s3 sync ./dist s3://YOUR_BUCKET_NAME/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### AWS Setup

#### S3 Bucket Configuration

1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public read access
4. Configure CORS if needed

Example bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

#### CloudFront Setup

1. Create distribution pointing to S3 bucket
2. Configure SSL certificate
3. Set custom error responses (404 → /404.html)
4. Configure cache behaviors
5. Enable compression

Recommended cache policy:
- Min TTL: 0
- Max TTL: 31536000
- Default TTL: 86400

## GA4 Events

### Tracked Events

The site automatically tracks:

1. **CTA Clicks**
   - Event: `cta_click`
   - Properties: `cta_text`, `cta_location`, `cta_url`

2. **Form Submissions**
   - Event: `form_submission`
   - Properties: `form_id`, `form_location`

3. **Video Interactions**
   - Event: `video_play`
   - Properties: `video_title`, `video_location`

### Adding Custom Tracking

Add `data-track="location-name"` to any link:

```html
<a href="/page" data-track="custom-cta">
  Click me
</a>
```

### GTM Configuration

Set `GTM_ID` in your `.env` file:

```
GTM_ID=GTM-XXXXXXX
```

The GTM container should be configured to listen for these custom events.

## Performance

### Core Web Vitals Targets

- **LCP**: < 2.0s (mobile)
- **CLS**: < 0.05
- **INP**: < 200ms

### Optimization Techniques

1. **Images**
   - Use WebP format
   - Provide width/height
   - Lazy load below-fold images
   - Use appropriate sizes

2. **Fonts**
   - Preconnect to font providers
   - Use font-display: swap

3. **JavaScript**
   - Minimal client-side JS
   - Use React islands sparingly
   - Load GTM asynchronously

4. **CSS**
   - Inline critical CSS
   - Use Tailwind's purge feature

### Testing Performance

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://helm.ceo --view

# PageSpeed Insights
# Visit: https://pagespeed.web.dev/
```

### Cache Headers

The deployment sets these cache headers:

- Static assets: `max-age=31536000, immutable`
- HTML files: `max-age=0, must-revalidate`
- Sitemaps/robots: `max-age=3600`

## Troubleshooting

### Build Failures

1. Check Node.js version (18+)
2. Clear node_modules and reinstall
3. Check for TypeScript errors
4. Verify all images exist

### Form Not Working

1. Check `ZAPIER_WEBHOOK_URL` is set
2. Test webhook URL with curl
3. Check browser console for errors
4. Verify CORS headers

### Images Not Loading

1. Verify image paths start with `/`
2. Check images exist in `/public/`
3. Clear CloudFront cache
4. Check S3 bucket permissions

## Support

For questions or issues:
- Email: support@helm.ceo
- Phone: 917.566.0364
