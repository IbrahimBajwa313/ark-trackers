import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add any paths you want to disallow here, for example:
      // disallow: '/private/',
    },
    sitemap: 'https://arktrackers.com/sitemap.xml', // Replace with your actual domain
  }
}
