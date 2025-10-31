# Deployment Guide

This guide explains how to deploy the Helm website to AWS S3 + CloudFront.

## Prerequisites

- AWS Account with appropriate permissions
- GitHub repository
- Domain configured in Route 53 (or your DNS provider)

## Initial AWS Setup

### 1. Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://helm-website

# Enable static website hosting
aws s3 website s3://helm-website \
  --index-document index.html \
  --error-document 404.html
```

### 2. Configure Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::helm-website/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket helm-website \
  --policy file://bucket-policy.json
```

### 3. Request SSL Certificate

```bash
# Request certificate in us-east-1 (required for CloudFront)
aws acm request-certificate \
  --domain-name helm.ceo \
  --subject-alternative-names www.helm.ceo \
  --validation-method DNS \
  --region us-east-1
```

**Note**: You'll need to add DNS validation records to your domain.

### 4. Create CloudFront Distribution

Create `cloudfront-config.json`:

```json
{
  "Comment": "Helm Corporate Site",
  "Enabled": true,
  "Origins": [
    {
      "Id": "S3-helm-website",
      "DomainName": "helm-website.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ],
  "DefaultRootObject": "index.html",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-helm-website",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": ["GET", "HEAD", "OPTIONS"],
    "CachedMethods": ["GET", "HEAD"],
    "Compress": true,
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "PriceClass": "PriceClass_100",
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Aliases": ["helm.ceo", "www.helm.ceo"]
}
```

Create the distribution:

```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

**Note**: Replace the ACM certificate ARN with your certificate's ARN.

### 5. Configure Custom Error Responses

Add error responses to handle client-side routing:

```bash
aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --custom-error-responses \
    ErrorCode=404,ResponseCode=404,ResponsePagePath=/404.html
```

### 6. Configure DNS

Add these records to your DNS:

**For apex domain (helm.ceo):**
- Type: A
- Alias: Yes
- Target: CloudFront distribution domain

**For www subdomain:**
- Type: CNAME
- Target: CloudFront distribution domain

## GitHub Actions Setup

### 1. Create IAM User for Deployment

Create an IAM user with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::helm-website",
        "arn:aws:s3:::helm-website/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

### 2. Configure GitHub Secrets

Go to GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

#### AWS Configuration
- `AWS_ACCESS_KEY_ID`: IAM user access key
- `AWS_SECRET_ACCESS_KEY`: IAM user secret key
- `AWS_REGION`: Your AWS region (e.g., `us-east-1`)
- `AWS_S3_BUCKET`: Your bucket name (e.g., `helm-website`)
- `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID

#### Application Configuration
- `GTM_ID`: Your Google Tag Manager container ID
- `ZAPIER_WEBHOOK_URL`: Your Zapier webhook URL

### 3. Test Deployment

Push to the `main` branch:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

Check the Actions tab on GitHub to monitor the deployment.

## Manual Deployment

If you need to deploy manually:

### Build the Site

```bash
npm run build
```

### Upload to S3

```bash
# Sync all files except HTML
aws s3 sync ./dist s3://helm-website/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "robots.txt" \
  --exclude "sitemap*"

# Upload HTML with no-cache
aws s3 sync ./dist s3://helm-website/ \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"

# Upload special files
aws s3 sync ./dist s3://helm-website/ \
  --exclude "*" \
  --include "robots.txt" \
  --include "sitemap*" \
  --cache-control "public, max-age=3600"
```

### Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Deployment Checklist

Before deploying to production:

- [ ] Test site locally (`npm run dev`)
- [ ] Run build successfully (`npm run build`)
- [ ] Check all images load
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Test in multiple browsers
- [ ] Verify GTM is configured
- [ ] Check sitemap.xml
- [ ] Verify robots.txt
- [ ] Test 404 page

## Rollback Procedure

If you need to rollback:

1. Find the previous working commit:
   ```bash
   git log --oneline
   ```

2. Revert to that commit:
   ```bash
   git revert COMMIT_HASH
   git push origin main
   ```

3. Or manually deploy an older build:
   ```bash
   git checkout COMMIT_HASH
   npm run build
   # Deploy manually
   ```

## Monitoring Deployment

### Check CloudFront Status

```bash
aws cloudfront get-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --query 'Distribution.Status'
```

### View Invalidation Status

```bash
aws cloudfront list-invalidations \
  --distribution-id YOUR_DISTRIBUTION_ID
```

### Monitor S3 Uploads

```bash
aws s3 ls s3://helm-website/ --recursive
```

## Cost Optimization

### CloudFront Pricing Class

Use `PriceClass_100` for North America and Europe only:

```bash
aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --price-class PriceClass_100
```

### S3 Lifecycle Rules

Configure lifecycle rules to delete old files if needed.

## Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs
2. Verify all secrets are set
3. Check IAM permissions
4. Verify AWS credentials

### Images Not Loading

1. Check S3 bucket policy
2. Verify image paths start with `/`
3. Clear CloudFront cache
4. Check file permissions

### 404 Errors

1. Verify error document is set
2. Check CloudFront custom error responses
3. Ensure 404.html exists in build
4. Clear CloudFront cache

### Slow Deployment

CloudFront invalidations can take 5-15 minutes. Be patient.

## Support

For AWS-specific issues:
- AWS Documentation: https://docs.aws.amazon.com/
- AWS Support: https://console.aws.amazon.com/support/

For site issues:
- Email: support@helm.ceo
- Phone: 917.566.0364
