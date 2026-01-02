import { MetadataRoute } from 'next';
import { MOCK_DB, CPT_ENCYCLOPEDIA, PROVIDERS } from '@/data';

/**
 * Dynamic Sitemap for asclepius.us
 * 
 * Generates URLs for:
 * - Static pages (about, how-it-works, glossary, legal)
 * - Hub pages (procedure and provider aggregation pages)
 * - Dynamic cost pages (procedure/provider/plan combinations)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://asclepius.us';
    const lastModified = new Date();

    // 1. Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/how-it-works`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/glossary`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // 2. Hub pages - higher priority aggregation pages
    const hubPages: MetadataRoute.Sitemap = [
        // Procedure index
        {
            url: `${baseUrl}/procedure`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        // Provider index
        {
            url: `${baseUrl}/provider`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
    ];

    // Procedure hub pages
    for (const procedure of CPT_ENCYCLOPEDIA) {
        hubPages.push({
            url: `${baseUrl}/procedure/${procedure.slug}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.85,
        });
    }

    // Provider hub pages
    for (const provider of PROVIDERS) {
        hubPages.push({
            url: `${baseUrl}/provider/${provider.slug}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.85,
        });
    }

    // 3. Dynamic cost pages - generate from data
    const costPages: MetadataRoute.Sitemap = [];

    // Generate URLs for all procedure/provider/plan combinations
    for (const procedure of MOCK_DB.procedures) {
        for (const provider of MOCK_DB.providers) {
            for (const plan of MOCK_DB.plans) {
                costPages.push({
                    url: `${baseUrl}/cost/${procedure.slug}/${provider.slug}/${plan.slug}`,
                    lastModified,
                    changeFrequency: 'weekly',
                    priority: 0.9,
                });
            }
        }
    }

    return [...staticPages, ...hubPages, ...costPages];
}

