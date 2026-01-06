import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Asclepius.US | Medical Rate Data Explorer',
  description: 'Search and browse hospital negotiated rates from official Transparency in Coverage filings.',
};

// Site-wide Schema: Organization + WebSite with SearchAction
function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema for E-E-A-T
      {
        "@type": "Organization",
        "@id": "https://asclepius.us/#organization",
        "name": "Asclepius.US",
        "alternateName": "asclepius.us",
        "url": "https://asclepius.us",
        "logo": {
          "@type": "ImageObject",
          "url": "https://asclepius.us/logo.png"
        },
        "description": "Medical rate data explorer helping Americans browse official healthcare price transparency filings.",
        "founder": {
          "@type": "Person",
          "name": "Mankwe Mokgabudi",
          "jobTitle": "Software Engineer & Data Scientist"
        },
        "foundingDate": "2024",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@asclepius.us",
          "contactType": "customer service"
        }
      },
      // WebSite Schema with SearchAction (enables sitelinks search box)
      {
        "@type": "WebSite",
        "@id": "https://asclepius.us/#website",
        "url": "https://asclepius.us",
        "name": "Asclepius.US",
        "description": "Medical Rate Data Explorer - Browse official hospital price filings",
        "publisher": {
          "@id": "https://asclepius.us/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://asclepius.us/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <SiteSchema />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
