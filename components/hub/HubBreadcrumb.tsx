'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    items: BreadcrumbItem[];
}

/**
 * Hub Breadcrumb Component
 * 
 * Consistent breadcrumb navigation for hub pages.
 * Supports both Procedure and Provider hub navigation paths.
 */
export function HubBreadcrumb({ items }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center flex-wrap gap-1 text-[13px]">
                {/* Home */}
                <li>
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-stone-400 hover:text-emerald-600 transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1">
                        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-stone-400 hover:text-emerald-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-stone-700 font-medium">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

/**
 * Structured Data for Breadcrumbs
 */
export function BreadcrumbSchema({ items }: Props) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://asclepius.us"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://asclepius.us${item.href}` : undefined
            }))
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
