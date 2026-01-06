import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Asclepius Healthcare Rate Explorer',
        short_name: 'Asclepius',
        description: 'Explore hospital negotiated rates from official CMS transparency filings.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F1F5F9',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/intellihealth-favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}

