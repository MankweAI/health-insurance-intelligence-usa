// utils/seo-schema.ts
import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ContentGenerator } from '@/utils/seo-content';

/**
 * Generates FAQPage JSON-LD schema
 */
export function generateFAQSchema(plan: Plan, persona: Persona) {
    const faqs = ContentGenerator.generateFAQ(plan, persona);
    if (!faqs || faqs.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };
}

/**
 * Generates WebPage JSON-LD schema
 * Simplified to avoid LocalBusiness "Missing Field" warnings.
 */
export function generateInsuranceWebPageSchema(persona: Persona, canonicalUrl: string) {
    const name = persona.display_title || persona.meta.marketing_heading || persona.meta.title;
    const description = persona.human_insight || persona.actuarial_logic?.mathematical_basis || persona.meta.description;

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': name,
        'description': description,
        'url': canonicalUrl,
        'lastReviewed': new Date().toISOString().split('T')[0],
        // Note: mainEntity removed to avoid conflict with FAQPage schema's mainEntity
        'about': {
            '@type': 'HealthInsurancePlan',
            'name': `Medical Aid Strategy: ${persona.meta.category}`,
            'description': `Actuarial optimization strategy for ${persona.meta.category} medical aid profiles.`
        }
    };
}

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(persona: Persona, canonicalUrl: string) {
    const category = persona.meta.category;
    const displayTitle = persona.display_title || persona.meta.title;

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://www.intellihealth.co.za/'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': category,
                'item': `https://www.intellihealth.co.za/?category=${encodeURIComponent(category)}`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': displayTitle,
                'item': canonicalUrl
            }
        ]
    };
}

/**
 * Generates Product/Offer JSON-LD schema
 * Added 'image' and 'sku' (required for full Product enhancement)
 */
export function generateProductSchema(plan: Plan, persona: Persona, canonicalUrl: string) {
    const productName = `${plan.identity.scheme_name} ${plan.identity.plan_name}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productName,
        'image': 'https://www.intellihealth.co.za/og-image.png', // Mandatory for Google Product Snippet
        'description': persona.meta.description,
        'sku': plan.id, // Helps Google uniquely identify the 'product'
        'brand': {
            '@type': 'Brand',
            'name': plan.identity.scheme_name
        },
        'offers': {
            '@type': 'Offer',
            'price': plan.price || 0,
            'priceCurrency': 'ZAR',
            'availability': 'https://schema.org/InStock',
            'priceValidUntil': '2026-12-31',
            'url': canonicalUrl
        }
    };
}

export function generateAllSchemas(plan: Plan, persona: Persona, canonicalUrl: string) {
    const schemas = [];
    const faqSchema = generateFAQSchema(plan, persona);
    if (faqSchema) schemas.push(faqSchema);

    schemas.push(generateInsuranceWebPageSchema(persona, canonicalUrl));
    schemas.push(generateProductSchema(plan, persona, canonicalUrl));
    schemas.push(generateBreadcrumbSchema(persona, canonicalUrl));

    return schemas;
}