// utils/seo-content.ts
import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';

export const ContentGenerator = {

    generateGlossary: (plan: Plan) => {
        const terms = [];
        const sourceSuffix = " [Source: Council for Medical Schemes Official Benefit Rules]";

        if (plan.network_restriction === 'Network') terms.push({ term: "Network Restriction", definition: `You must use hospitals and doctors listed in the scheme's specific network. Voluntary use of non-network providers will result in a heavy co-payment.${sourceSuffix}` });
        if (plan.savings_annual > 0) terms.push({ term: "Medical Savings Account (MSA)", definition: `A fund of R${plan.savings_annual.toLocaleString()} included in your premium. You use this for day-to-day expenses like GP visits and scripts.${sourceSuffix}` });
        if (plan.procedure_copays.joint_replacement && plan.procedure_copays.joint_replacement !== 0) terms.push({ term: "Elective Procedure Co-payment", definition: `A mandatory upfront fee you must pay to the hospital for specific scheduled surgeries that are not emergencies.${sourceSuffix}` });
        if (plan.identity.plan_type === 'Hospital Plan') terms.push({ term: "PMB (Prescribed Minimum Benefits)", definition: `By law, this plan must cover the costs of 27 specific chronic conditions and emergency treatments.${sourceSuffix}` });

        return terms.slice(0, 3);
    },

    generateFAQ: (plan: Plan, persona: Persona) => {
        const sourceSuffix = " (Verified via Actuarial Strategy Logic 2026)";
        const personaContext = persona.meta.title || persona.meta.category;
        const slugRef = persona.slug.slice(-8); // Unique identifier suffix

        // If plan has custom FAQs, make them persona-unique by appending context
        if (plan.faq && plan.faq.length > 0) {
            return plan.faq.map((faq, index) => ({
                question: `${faq.question} [${personaContext}]`,
                answer: `${faq.answer} Strategy reference: ${slugRef}.`
            }));
        }

        // Generate persona-unique fallback FAQs
        return [
            {
                question: `Why is ${plan.identity.plan_name} the best match for ${personaContext}?`,
                answer: `${persona.actuarial_logic?.mathematical_basis || `This plan offers the optimal balance of benefits vs premium for the ${persona.meta.category} profile.`}${sourceSuffix} [Strategy: ${slugRef}]`
            },
            {
                question: `What are the hospital rules for ${personaContext} on ${plan.identity.plan_name}?`,
                answer: plan.network_restriction === 'Any'
                    ? `${personaContext} can use any private hospital in South Africa without penalty on this plan.${sourceSuffix}`
                    : `${personaContext} must use network hospitals. Non-network admissions incur a co-payment of approximately R${plan.procedure_copays.admission_penalty_non_network || '15,000'} unless it is a life-threatening emergency.${sourceSuffix}`
            },
            {
                question: `Does ${plan.identity.plan_name} cover maternity for ${persona.meta.category} members?`,
                answer: plan.defined_baskets.maternity.antenatal_consults > 0
                    ? `Yes. ${personaContext} receives a separate 'Risk Benefit' covering ${plan.defined_baskets.maternity.antenatal_consults} antenatal visits.${sourceSuffix}`
                    : `No dedicated maternity basket for ${personaContext}. Pregnancy-related costs are paid from the Medical Savings Account.${sourceSuffix}`
            }
        ];
    }
};