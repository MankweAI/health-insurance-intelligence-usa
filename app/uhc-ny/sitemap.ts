import { MetadataRoute } from 'next';
import { getProceduresWithCMSData, getAllCMSProviders } from '@/data/cms/enriched';

const BASE_URL = 'https://asclepius.us';

/**
 * UHC-NY Sitemap
 * 
 * Generates sitemap entries for all UHC New York pages:
 * - Landing page
 * - Procedure hub and individual procedures
 * - Provider hub and individual providers
 * - Cost pages (procedure + provider combinations)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const procedures = getProceduresWithCMSData();
    const providers = getAllCMSProviders();

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // UHC-NY Landing
    sitemapEntries.push({
        url: `${BASE_URL}/uhc-ny`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    });

    // Procedure Hub
    sitemapEntries.push({
        url: `${BASE_URL}/uhc-ny/procedure`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    });

    // Individual Procedures
    for (const proc of procedures) {
        sitemapEntries.push({
            url: `${BASE_URL}/uhc-ny/procedure/${proc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        });
    }

    // Provider Hub
    sitemapEntries.push({
        url: `${BASE_URL}/uhc-ny/provider`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    });

    // Individual Providers (limit to avoid massive sitemap)
    const providerLimit = 500; // Top 500 providers
    for (const prov of providers.slice(0, providerLimit)) {
        sitemapEntries.push({
            url: `${BASE_URL}/uhc-ny/provider/${prov.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    }

    // Cost Pages (procedure + provider combinations)
    // This can generate many pages, so we limit to most important combinations
    const costPageLimit = 1000;
    let costPageCount = 0;

    for (const proc of procedures) {
        if (costPageCount >= costPageLimit) break;

        // For each procedure, include top providers
        for (const prov of providers.slice(0, 100)) {
            if (costPageCount >= costPageLimit) break;

            sitemapEntries.push({
                url: `${BASE_URL}/uhc-ny/cost/${proc.slug}/${prov.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            });
            costPageCount++;
        }
    }

    return sitemapEntries;
}
