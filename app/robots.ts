import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/profile/',
                '/_next/',
            ],
        },
        sitemap: 'https://asclepius.us/sitemap.xml',
    };
}