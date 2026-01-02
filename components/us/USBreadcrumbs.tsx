'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    items: BreadcrumbItem[];
}

export default function USBreadcrumbs({ items }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-1 text-xs text-slate-500">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span className="sr-only sm:not-sr-only">Home</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" aria-hidden="true" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-emerald-600 transition-colors truncate max-w-[120px] sm:max-w-none"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="text-slate-700 font-semibold truncate max-w-[150px] sm:max-w-none"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
