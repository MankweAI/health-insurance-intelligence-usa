'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
    getCPTEntry,
    getPriceVsAverage,
    getProviderBySlug,
    getPlanBySlug,
    getCPTBySlug,
    getProviderPriceRanking
} from '@/data';

// Use consistent locale to prevent hydration mismatch
const formatUSD = (value: number) => value.toLocaleString('en-US');

interface Props {
    procedureName: string;
    providerName: string;
    planName: string;
    estimatedCost: number;
    procedureSlug?: string;
    providerSlug?: string;
    planSlug?: string;
}

interface FAQ {
    question: string;
    answer: string;
    type: 'medical' | 'cost' | 'insurance' | 'provider';
}

/**
 * Dynamic FAQ Generation
 * 
 * Generates FAQs based on actual data, not just templated text.
 * This ensures each page has unique, contextually relevant FAQs.
 */
function generateDynamicFAQs(
    procedureName: string,
    providerName: string,
    planName: string,
    estimatedCost: number,
    procedureSlug?: string,
    providerSlug?: string,
    planSlug?: string
): FAQ[] {
    const faqs: FAQ[] = [];

    // Get enriched data
    const procedure = procedureSlug ? getCPTBySlug(procedureSlug) : null;
    const provider = providerSlug ? getProviderBySlug(providerSlug) : null;
    const plan = planSlug ? getPlanBySlug(planSlug) : null;

    // Get price comparison data
    const priceComparison = procedure && provider && planSlug
        ? getPriceVsAverage(procedure.code, provider.npi, planSlug)
        : null;

    // Get ranking data
    const priceRanking = procedure && provider && planSlug
        ? getProviderPriceRanking(procedure.code, provider.npi, planSlug)
        : null;

    // ========================================================================
    // 1. PROCEDURE-SPECIFIC MEDICAL FAQs (from CPT Encyclopedia)
    // ========================================================================
    if (procedure?.faqs) {
        procedure.faqs.forEach(faq => {
            faqs.push({
                question: faq.question,
                answer: faq.answer,
                type: 'medical'
            });
        });
    }

    // ========================================================================
    // 2. DATA-DRIVEN PRICE FAQs (with specific price ranges and comparisons)
    // ========================================================================

    // National price range FAQ (unique per procedure)
    if (procedure?.nationalStats) {
        const { low, high, median } = procedure.nationalStats;
        faqs.push({
            question: `What is the typical cost range for ${procedureName} nationally?`,
            answer: `Nationally, ${procedureName} costs between $${formatUSD(low)} and $${formatUSD(high)}, with a median of $${formatUSD(median)}. ${priceComparison ? `At ${providerName}, the negotiated rate is $${formatUSD(priceComparison.rate)}, which is ${priceComparison.percentDiff < 0 ? `${Math.abs(priceComparison.percentDiff)}% below` : `${priceComparison.percentDiff}% above`} the regional average.` : ''}`,
            type: 'cost'
        });
    }

    // Ranking FAQ (unique per provider/plan combination)
    if (priceRanking && priceComparison) {
        faqs.push({
            question: `How does ${providerName}'s price compare to other hospitals?`,
            answer: `For ${procedureName} with ${planName}, ${providerName} ranks #${priceRanking.rank} out of ${priceRanking.total} in-network providers. Their rate of $${formatUSD(priceComparison.rate)} is ${priceComparison.difference < 0 ? `$${formatUSD(Math.abs(Math.round(priceComparison.difference)))} below` : `$${formatUSD(Math.round(priceComparison.difference))} above`} the average of $${formatUSD(Math.round(priceComparison.average))}. ${priceRanking.rank <= 3 ? 'This places them among the most affordable options.' : priceRanking.percentile >= 75 ? 'This represents above-average value.' : ''}`,
            type: 'cost'
        });
    }

    // If this provider is significantly cheaper than average
    if (priceComparison && priceComparison.percentDiff < -15) {
        faqs.push({
            question: `Why is ${providerName} cheaper than average for ${procedureName}?`,
            answer: `${providerName}'s negotiated rate of $${formatUSD(priceComparison.rate)} is ${Math.abs(priceComparison.percentDiff)}% below the plan average of $${formatUSD(Math.round(priceComparison.average))}. This typically reflects their volume-based network agreements with ${planName}, operational efficiencies, and regional cost-of-living factors. Lower prices don't necessarily mean lower quality—check the quality metrics above.`,
            type: 'cost'
        });
    }

    // If this provider is significantly MORE expensive than average
    if (priceComparison && priceComparison.percentDiff > 15) {
        faqs.push({
            question: `Why is ${providerName} more expensive than average for ${procedureName}?`,
            answer: `${providerName}'s rate of $${formatUSD(priceComparison.rate)} is ${priceComparison.percentDiff}% above the regional average of $${formatUSD(Math.round(priceComparison.average))}. Factors include: academic medical center status, specialized equipment, higher nursing ratios, and complex case expertise. Compare with the ${priceRanking ? priceRanking.total - 1 : 'other'} nearby facilities to find the best value for your needs.`,
            type: 'cost'
        });
    }

    // ========================================================================
    // 3. PROVIDER-SPECIFIC FAQs (based on actual provider data)
    // ========================================================================

    if (provider) {
        // Quality rating FAQ (only if they have good ratings)
        if (provider.metrics.cmsStarRating && provider.metrics.cmsStarRating >= 4) {
            faqs.push({
                question: `What is ${providerName}'s quality rating?`,
                answer: `${providerName} has a ${provider.metrics.cmsStarRating}-star rating from CMS Hospital Compare, with a patient experience score of ${provider.metrics.patientExperienceScore || 'N/A'}/100. ${provider.metrics.readmissionRate === 'Below' ? 'Their readmission rate is below the national average, indicating good post-procedure outcomes.' : ''}`,
                type: 'provider'
            });
        }

        // Network status FAQ
        faqs.push({
            question: `Is ${providerName} in-network for ${planName}?`,
            answer: `Based on our price transparency data, ${providerName} has a negotiated rate with ${planName}, which strongly indicates in-network status. However, we recommend confirming directly with your insurance company before scheduling, as network status can change.`,
            type: 'insurance'
        });

        // Specialization FAQ (if relevant to procedure category)
        if (provider.specializations.length > 0) {
            const relevantSpec = getRelevantSpecialization(procedure?.category || '', provider.specializations);
            if (relevantSpec) {
                faqs.push({
                    question: `Does ${providerName} specialize in this type of procedure?`,
                    answer: `Yes, ${providerName} lists ${relevantSpec} as one of their clinical specializations. They also hold ${provider.certifications.join(', ')} certifications, indicating commitment to quality standards.`,
                    type: 'provider'
                });
            }
        }
    }

    // ========================================================================
    // 4. PLAN-SPECIFIC FAQs (based on actual plan data)
    // ========================================================================

    if (plan) {
        faqs.push({
            question: `How does ${plan.planName} typically cover ${procedureName}?`,
            answer: `${plan.planName} is a ${plan.networkType} plan from ${plan.payerName}. With typical cost-sharing, you would pay your remaining deductible (if any), then ${plan.costSharing.typicalCoinsurance}% coinsurance until reaching your $${formatUSD(plan.costSharing.outOfPocketMax)} out-of-pocket maximum. Use our calculator above to estimate your specific responsibility.`,
            type: 'insurance'
        });
    }

    // ========================================================================
    // 5. CONTEXTUAL GENERAL FAQs (based on procedure category)
    // ========================================================================

    if (procedure?.category === 'Inpatient') {
        faqs.push({
            question: `What should I expect for an inpatient ${procedureName}?`,
            answer: `${procedureName} is typically an inpatient procedure requiring at least one overnight hospital stay. Your estimated cost includes facility fees, surgeon fees, anesthesia, and standard supplies. Additional charges may apply for extended stays, special equipment, or complications. Ask the hospital for a complete estimate.`,
            type: 'medical'
        });
    }

    if (procedure?.category === 'Imaging') {
        faqs.push({
            question: `Can I get ${procedureName} at a lower-cost facility?`,
            answer: `Imaging procedures like ${procedureName} often cost 40-60% less at freestanding imaging centers compared to hospital outpatient facilities. If your doctor approves, consider getting quotes from independent imaging centers in your area. Make sure they're in-network with ${planName}.`,
            type: 'cost'
        });
    }

    // ========================================================================
    // 6. ALWAYS INCLUDE: FINANCIAL ASSISTANCE FAQ
    // ========================================================================

    if (estimatedCost > 5000) {
        faqs.push({
            question: `What if I can't afford the estimated $${formatUSD(Math.round(estimatedCost))} cost?`,
            answer: `Options include: (1) Ask ${providerName}'s billing department about payment plans—many offer 0% interest financing. (2) Check if you qualify for hospital financial assistance programs. (3) Compare prices at nearby facilities. (4) Ask your doctor if the procedure can be performed at a lower-cost outpatient facility. (5) Consider HSA/FSA funds if available.`,
            type: 'cost'
        });
    }

    // Limit to 6 FAQs max for readability
    return faqs.slice(0, 6);
}

/**
 * Helper to find relevant specialization based on procedure category
 */
function getRelevantSpecialization(category: string, specializations: string[]): string | null {
    const categoryToSpecs: Record<string, string[]> = {
        'Inpatient': ['Cardiology', 'Orthopedics', 'Neurology', 'Oncology'],
        'Outpatient': ['Gastroenterology', 'Ophthalmology', 'Urology'],
        'Imaging': ['Radiology', 'Cardiology', 'Neurology'],
    };

    const relevant = categoryToSpecs[category] || [];
    return specializations.find(s => relevant.some(r => s.toLowerCase().includes(r.toLowerCase()))) || null;
}

export function FAQSection({
    procedureName,
    providerName,
    planName,
    estimatedCost,
    procedureSlug,
    providerSlug,
    planSlug
}: Props) {
    const faqs = generateDynamicFAQs(
        procedureName,
        providerName,
        planName,
        estimatedCost,
        procedureSlug,
        providerSlug,
        planSlug
    );

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Only render schema if we have FAQs
    if (faqs.length === 0) return null;

    // JSON-LD Schema for FAQPage
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    // Type badge colors
    const typeBadgeColors: Record<FAQ['type'], string> = {
        medical: 'bg-blue-50 text-blue-600',
        cost: 'bg-emerald-50 text-emerald-600',
        insurance: 'bg-purple-50 text-purple-600',
        provider: 'bg-amber-50 text-amber-600'
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                {/* Header */}
                <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">❓</span>
                        <span className="font-bold text-stone-900 text-[14px] font-sans">FREQUENTLY ASKED QUESTIONS</span>
                    </div>
                    <p className="text-stone-400 text-[11px] mt-1">
                        Questions specific to this procedure, provider, and plan
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-stone-100 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                            >
                                <div className="flex items-start gap-2 pr-4">
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-medium shrink-0 mt-0.5 ${typeBadgeColors[faq.type]}`}>
                                        {faq.type}
                                    </span>
                                    <span className="font-medium text-stone-900 text-[13px] font-sans">
                                        {faq.question}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-4 pb-4 pt-0">
                                    <p className="text-stone-600 text-[13px] font-sans leading-relaxed pl-[52px]">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
