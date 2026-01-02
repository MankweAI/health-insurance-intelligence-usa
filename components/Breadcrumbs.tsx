// components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Persona } from '@/utils/persona';

interface BreadcrumbsProps {
    persona: Persona;
}

export default function Breadcrumbs({ persona }: BreadcrumbsProps) {
    const category = persona.meta.category;
    const displayTitle = persona.display_title || persona.meta.title;

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center flex-wrap gap-1 text-xs text-slate-500">
                <li className="flex items-center">
                    <Link href="/" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                        <Home className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" />
                </li>
                <li className="flex items-center">
                    <Link
                        href={`/?category=${encodeURIComponent(category)}`}
                        className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors font-medium"
                    >
                        {category}
                    </Link>
                </li>
                <li className="flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" />
                </li>
                <li className="flex items-center">
                    <span className="text-slate-700 font-semibold truncate" aria-current="page">
                        {displayTitle}
                    </span>
                </li>
            </ol>
        </nav>
    );
}