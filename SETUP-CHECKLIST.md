# Helm Website Setup Checklist

Use this checklist to ensure your Helm website is fully configured and ready for deployment.

## Pre-Deployment Checklist

### 1. Assets & Images ✅/❌

- [✅] Add Helm logo files to `/public/`
  - [✅] Main logo added as image.png (used in header and footer)
  - [✅] Logo automatically inverted for dark backgrounds
- [ ] Add hero image: `/public/images/hero-regina.jpg`
- [ ] Add OpenGraph image: `/public/images/og-default.jpg`
- [ ] Add background pattern: `/public/images/pattern.svg`
- [ ] Add testimonial photos to `/public/images/testimonials/`
  - [ ] david-rosenberg.jpg
  - [ ] renan-cortez.jpg
  - [ ] matt-warnock.jpg
  - [ ] danielle-weed.jpg
- [ ] Add client logos to `/public/images/logos/` (14 logos)
- [ ] Add blog images to `/public/images/blog/`

See [docs/ASSETS.md](./docs/ASSETS.md) for detailed image requirements.

### 2. Environment Variables ✅/❌

Configure `.env` file:

- [ ] `GTM_ID` - Replace GTM-XXXXXXX with your Google Tag Manager ID
- [ ] `ZAPIER_WEBHOOK_URL` - Replace with your Zapier webhook URL

### 3. Google Tag Manager Setup ✅/❌

- [ ] Create GTM container at tagmanager.google.com
- [ ] Add GTM ID to `.env`
- [ ] Configure tags for custom events:
  - [ ] cta_click
  - [ ] form_submission
  - [ ] video_play
- [ ] Set up Google Analytics 4 in GTM
- [ ] Test GTM is loading (check browser console)

### 4. Zapier Webhook Setup ✅/❌

- [ ] Create Zapier account
- [ ] Create webhook trigger
- [ ] Copy webhook URL to `.env`
- [ ] Configure action (email, CRM, etc.)
- [ ] Test form submission

### 5. AWS Setup ✅/❌

#### S3 Bucket

- [ ] Create S3 bucket
- [ ] Enable static website hosting
- [ ] Configure bucket policy for public read
- [ ] Set up CORS if needed

#### CloudFront

- [ ] Create CloudFront distribution
- [ ] Point to S3 bucket
- [ ] Configure SSL certificate (ACM)
- [ ] Set up custom error responses
- [ ] Configure cache behaviors
- [ ] Enable compression

#### DNS

- [ ] Point helm.ceo to CloudFront (A record/Alias)
- [ ] Point www.helm.ceo to CloudFront (CNAME)
- [ ] Verify DNS propagation

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed AWS setup.

### 6. GitHub Repository Setup ✅/❌

- [ ] Create GitHub repository
- [ ] Push code to repository
- [ ] Configure GitHub Secrets:
  - [ ] AWS_ACCESS_KEY_ID
  - [ ] AWS_SECRET_ACCESS_KEY
  - [ ] AWS_REGION
  - [ ] AWS_S3_BUCKET
  - [ ] CLOUDFRONT_DISTRIBUTION_ID
  - [ ] GTM_ID
  - [ ] ZAPIER_WEBHOOK_URL

### 7. Content Review ✅/❌

- [ ] Review homepage content
- [ ] Verify all services are listed correctly
- [ ] Check testimonials are accurate
- [ ] Verify client logos are correct
- [ ] Review About page
- [ ] Review How It Works page
- [ ] Check Services page
- [ ] Verify contact information
- [ ] Review FAQ content
- [ ] Check all links work

### 8. SEO Configuration ✅/❌

- [ ] Verify meta descriptions for all pages
- [ ] Check page titles are unique and descriptive
- [ ] Verify OpenGraph images
- [ ] Test social sharing (Twitter, LinkedIn, Facebook)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Search Console
- [ ] Configure robots.txt if needed

### 9. Testing ✅/❌

#### Functionality

- [ ] Test contact form submission
- [ ] Verify form validation works
- [ ] Test all navigation links
- [ ] Check mobile menu works
- [ ] Test testimonial carousel
- [ ] Test FAQ accordion
- [ ] Verify all CTAs work

#### Performance

- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Check LCP < 2.0s
- [ ] Check CLS < 0.05
- [ ] Check INP < 200ms
- [ ] Test page load speed
- [ ] Verify images are optimized

#### Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

#### Responsiveness

- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1440px+)

#### Analytics

- [ ] GTM loads correctly
- [ ] CTA clicks are tracked
- [ ] Form submissions are tracked
- [ ] Video plays are tracked
- [ ] Check Google Analytics receives data

### 10. Security ✅/❌

- [ ] HTTPS is enforced
- [ ] Security headers configured in CloudFront
- [ ] No sensitive data in client-side code
- [ ] Form has honeypot protection
- [ ] Rate limiting configured (if needed)

### 11. Documentation ✅/❌

- [ ] Team knows how to edit content
- [ ] Team knows how to add blog posts
- [ ] Team knows how to deploy
- [ ] Contact information documented
- [ ] Emergency procedures documented

## Post-Deployment Checklist

### Immediate (Day 1)

- [ ] Verify site is live at helm.ceo
- [ ] Test all critical user paths
- [ ] Check SSL certificate is valid
- [ ] Verify redirects work
- [ ] Monitor error logs
- [ ] Test contact form with real submission
- [ ] Check GTM is tracking

### First Week

- [ ] Monitor Google Analytics
- [ ] Check Search Console for errors
- [ ] Review CloudWatch logs (if configured)
- [ ] Monitor site speed
- [ ] Check for broken links
- [ ] Verify email notifications work

### First Month

- [ ] Review analytics data
- [ ] Check SEO rankings
- [ ] Monitor Core Web Vitals
- [ ] Review user feedback
- [ ] Plan content updates
- [ ] Update blog posts

## Maintenance Schedule

### Weekly

- [ ] Check site is accessible
- [ ] Review form submissions
- [ ] Monitor analytics

### Monthly

- [ ] Review content for updates
- [ ] Check for broken links
- [ ] Update blog content
- [ ] Review SEO performance
- [ ] Check dependencies for updates

### Quarterly

- [ ] Full site audit
- [ ] Performance review
- [ ] Security updates
- [ ] Content refresh
- [ ] User testing

## Quick Links

- [Complete Documentation](./docs/README.md)
- [Content Editing Guide](./docs/CONTENT-EDITING.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Assets Guide](./docs/ASSETS.md)

## Support Contacts

**Technical Issues:**
- Developer documentation: See `/docs` folder
- Emergency: Contact your development team

**Content Updates:**
- See: [Content Editing Guide](./docs/CONTENT-EDITING.md)

**General Support:**
- Email: support@helm.ceo
- Phone: 917.566.0364

## Notes

Use this space to track progress or add custom notes:

```
Date: _______________
Completed by: _______________
Notes:
_______________________
_______________________
_______________________
```

---

**Ready to launch?** Make sure all checkboxes are marked before going live!
