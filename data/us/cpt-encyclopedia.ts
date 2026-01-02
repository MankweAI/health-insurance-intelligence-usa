/**
 * CPT Code Encyclopedia
 * 
 * Rich procedure content for SEO-defensible pages.
 * This structure mirrors what would come from a medical content API.
 * 
 * Phase 1: Curated sample data for 10 common procedures
 * Phase 2: Expand via CMS HCPCS file + medical content API
 */

import { CPTEntry } from '@/types/us-tic';

export const CPT_ENCYCLOPEDIA: CPTEntry[] = [
    {
        code: '27130',
        name: 'Total Hip Replacement',
        slug: 'total-hip-replacement',
        category: 'Inpatient',
        description: 'Total hip arthroplasty (THA) is a surgical procedure where the damaged hip joint is completely replaced with artificial components. The procedure involves removing the damaged femoral head and replacing it with a metal stem and ball, while the damaged acetabulum (hip socket) is replaced with a metal cup lined with plastic, ceramic, or metal.',
        typicalDuration: '1-2 hours',
        recoveryTime: '3-6 months for full recovery; 4-6 weeks before resuming light activities',
        anesthesiaType: 'General',
        preparation: [
            'Complete pre-operative physical examination and blood work',
            'Stop blood-thinning medications 7-10 days before surgery',
            'Arrange for home assistance during recovery',
            'No food or drink after midnight before surgery',
            'Prepare your home with safety rails and elevated toilet seat'
        ],
        risks: [
            'Blood clots (deep vein thrombosis)',
            'Infection at the surgical site',
            'Hip dislocation',
            'Leg length inequality',
            'Implant wear or loosening over time',
            'Nerve damage'
        ],
        relatedCodes: ['27447', '27236', '27132'],
        nationalStats: {
            low: 18000,
            median: 32000,
            high: 65000,
            sampleSize: 245000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'How long does a hip replacement last?',
                answer: 'Modern hip implants typically last 15-25 years. However, longevity depends on factors like activity level, body weight, and implant material. Younger, more active patients may need revision surgery sooner.'
            },
            {
                question: 'Will I need physical therapy after hip replacement?',
                answer: 'Yes, physical therapy is essential for recovery. Most patients begin PT within 24 hours of surgery and continue for 6-12 weeks. PT helps restore mobility, strength, and teaches proper movement techniques.'
            },
            {
                question: 'When can I drive after hip replacement?',
                answer: 'Most patients can resume driving 4-6 weeks after surgery, once they can safely operate the pedals and have stopped taking narcotic pain medications. Right hip replacements may require a longer wait.'
            }
        ]
    },
    {
        code: '27447',
        name: 'Total Knee Replacement',
        slug: 'total-knee-replacement',
        category: 'Inpatient',
        description: 'Total knee arthroplasty (TKA) is a surgical procedure that resurfaces a knee damaged by arthritis or injury. Metal and plastic components are used to cap the ends of the bones that form the knee joint along with the underside of the kneecap. This procedure is typically recommended when conservative treatments like medication, physical therapy, and lifestyle modifications fail to provide relief.',
        typicalDuration: '1-2 hours',
        recoveryTime: '3-6 months for full recovery; walking with assistance within 24 hours',
        anesthesiaType: 'General',
        preparation: [
            'Stop anti-inflammatory medications 1 week before surgery',
            'Complete dental work before surgery to reduce infection risk',
            'Practice using crutches or a walker before the procedure',
            'Donate blood in advance if autologous transfusion is planned',
            'Shower with antiseptic soap the night before surgery'
        ],
        risks: [
            'Blood clots in leg veins',
            'Infection requiring additional surgery',
            'Stiffness and limited range of motion',
            'Implant problems (loosening, wear)',
            'Continued pain (occurs in 10-15% of patients)',
            'Damage to nerves or blood vessels'
        ],
        relatedCodes: ['27130', '27446', '27486'],
        nationalStats: {
            low: 20000,
            median: 35000,
            high: 70000,
            sampleSize: 320000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'Is knee replacement very painful?',
                answer: 'Modern pain management protocols significantly reduce post-operative pain. Most patients experience moderate pain for 2-3 weeks, controlled with medication. By 6 weeks, most patients report significant pain improvement compared to before surgery.'
            },
            {
                question: 'Can I kneel after knee replacement?',
                answer: 'About 60% of patients can kneel comfortably after full recovery. While kneeling is not harmful to the implant, some patients experience discomfort. Using a cushioned pad and limiting kneeling duration is recommended.'
            },
            {
                question: 'How soon can I return to work after knee replacement?',
                answer: 'Desk jobs: 4-6 weeks. Light physical work: 6-8 weeks. Heavy physical labor: 3-6 months or may not be advisable. Each case varies based on job requirements and individual recovery.'
            }
        ]
    },
    {
        code: '45378',
        name: 'Colonoscopy (Diagnostic)',
        slug: 'colonoscopy-diagnostic',
        category: 'Outpatient',
        description: 'A diagnostic colonoscopy is a procedure that allows a physician to examine the inner lining of the large intestine (colon) using a thin, flexible tube with a camera (colonoscope). It is the gold standard for colorectal cancer screening and can detect polyps, tumors, ulcers, inflammation, and other abnormalities.',
        typicalDuration: '30-60 minutes',
        recoveryTime: 'Same day; most patients resume normal activities within 24 hours',
        anesthesiaType: 'Sedation',
        preparation: [
            'Follow a clear liquid diet 1-3 days before the procedure',
            'Complete bowel prep solution as prescribed',
            'Stop iron supplements 5-7 days before',
            'Arrange transportation home (you cannot drive after sedation)',
            'Avoid red or purple liquids during prep'
        ],
        risks: [
            'Bleeding (especially if polyps are removed)',
            'Perforation of the colon (rare, <1%)',
            'Adverse reaction to sedation',
            'Post-polypectomy syndrome',
            'Incomplete examination requiring repeat procedure'
        ],
        relatedCodes: ['45380', '45385', '45384'],
        nationalStats: {
            low: 800,
            median: 2500,
            high: 5500,
            sampleSize: 890000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'How often should I get a colonoscopy?',
                answer: 'For average-risk adults, screening begins at age 45 and repeats every 10 years if normal. Those with polyps, family history, or other risk factors may need more frequent screenings. Your doctor will recommend an appropriate schedule.'
            },
            {
                question: 'Is the colonoscopy prep as bad as people say?',
                answer: 'Bowel preparation has improved significantly. While still the most challenging part, newer low-volume preps are more tolerable. Split-dose regimens (half the night before, half in the morning) reduce discomfort.'
            },
            {
                question: 'Will I be awake during the colonoscopy?',
                answer: 'Most colonoscopies use conscious sedation where you are relaxed and drowsy but can respond to instructions. Many patients have no memory of the procedure. Some facilities offer deeper sedation or anesthesia upon request.'
            }
        ]
    },
    {
        code: '70551',
        name: 'MRI of Brain (without contrast)',
        slug: 'mri-brain',
        category: 'Imaging',
        description: 'Magnetic Resonance Imaging (MRI) of the brain is a non-invasive diagnostic procedure that uses powerful magnets and radio waves to create detailed images of brain structures. This version without contrast is used for evaluating brain anatomy, detecting tumors, stroke damage, dementia, developmental abnormalities, and other neurological conditions.',
        typicalDuration: '30-60 minutes',
        recoveryTime: 'None; normal activities can resume immediately',
        anesthesiaType: 'None',
        preparation: [
            'Remove all metal objects including jewelry and hearing aids',
            'Inform staff of any implanted devices (pacemakers, cochlear implants)',
            'Notify if you have claustrophobia (sedation may be available)',
            'No special dietary restrictions unless sedation is planned',
            'Wear comfortable clothing without metal fasteners'
        ],
        risks: [
            'No radiation exposure (MRI uses magnets, not X-rays)',
            'Discomfort from loud machine noise',
            'Anxiety in enclosed space (claustrophobia)',
            'Heating of metal implants (rare with MRI-safe devices)',
            'May require repeat if motion artifacts occur'
        ],
        relatedCodes: ['70552', '70553', '70544'],
        nationalStats: {
            low: 400,
            median: 1200,
            high: 3500,
            sampleSize: 420000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'Is an MRI safe?',
                answer: 'MRI is very safe for most people as it does not use radiation. The main concerns are for patients with certain metal implants, pacemakers, or other electronic devices. Always disclose your complete medical history to the imaging staff.'
            },
            {
                question: 'Why is MRI so expensive?',
                answer: 'MRI machines cost $1-3 million, require special facilities with magnetic shielding, highly trained technologists, and radiologists for interpretation. Costs vary significantly by location and facility type—freestanding imaging centers often charge 40-60% less than hospitals.'
            },
            {
                question: 'What if I am claustrophobic?',
                answer: 'Options include open MRI machines (less confining), mild sedation, bringing someone for support, or using relaxation techniques. Many patients manage better than expected, especially with wide-bore machines. Discuss concerns with your doctor beforehand.'
            }
        ]
    },
    {
        code: '71250',
        name: 'CT Scan of Chest (without contrast)',
        slug: 'ct-chest',
        category: 'Imaging',
        description: 'Computed Tomography (CT) of the chest is a diagnostic imaging procedure that uses X-rays and computer processing to create detailed cross-sectional images of the chest cavity. This includes the lungs, heart, blood vessels, airways, and lymph nodes. It is commonly used to detect lung cancer, pulmonary embolism, infections, and other chest abnormalities.',
        typicalDuration: '10-15 minutes',
        recoveryTime: 'None; normal activities can resume immediately',
        anesthesiaType: 'None',
        preparation: [
            'Wear comfortable, loose-fitting clothing',
            'Remove metal objects from the chest area',
            'May need to fast for 4 hours if contrast might be added',
            'Inform staff of any allergies or kidney problems',
            'You will need to hold your breath briefly during the scan'
        ],
        risks: [
            'Low dose of radiation exposure',
            'Not recommended during pregnancy',
            'Incidental findings may require additional testing',
            'Small risk if contrast is added later (allergic reaction, kidney issues)'
        ],
        relatedCodes: ['71260', '71270', '71271'],
        nationalStats: {
            low: 200,
            median: 650,
            high: 2200,
            sampleSize: 680000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'How much radiation is in a chest CT?',
                answer: 'A chest CT delivers about 7 mSv of radiation, equivalent to about 2 years of natural background radiation. Modern low-dose CT protocols for lung cancer screening use only about 1.5 mSv. The diagnostic benefit typically outweighs the minimal risk.'
            },
            {
                question: 'What is the difference between CT and MRI?',
                answer: 'CT uses X-rays and is faster, better for bones and acute bleeding, and less expensive. MRI uses magnets with no radiation, provides better soft tissue detail, but takes longer and is more expensive. Your doctor chooses based on what they need to see.'
            },
            {
                question: 'Can a chest CT detect heart problems?',
                answer: 'Standard chest CT shows basic heart structure but is not optimized for cardiac evaluation. Cardiac CT (CT angiography) with contrast and special protocols is needed for detailed heart and coronary artery assessment.'
            }
        ]
    },
    {
        code: '43239',
        name: 'Upper GI Endoscopy with Biopsy',
        slug: 'upper-gi-endoscopy',
        category: 'Outpatient',
        description: 'Upper gastrointestinal endoscopy (also called EGD - esophagogastroduodenoscopy) is a procedure where a thin, flexible scope is passed through the mouth to examine the esophagus, stomach, and duodenum. This code includes taking tissue samples (biopsies) for laboratory analysis. It is used to diagnose ulcers, inflammation, GERD, celiac disease, and detect early cancers.',
        typicalDuration: '15-30 minutes',
        recoveryTime: '1-2 hours in recovery area; mild sore throat for 24-48 hours',
        anesthesiaType: 'Sedation',
        preparation: [
            'No eating or drinking for 6-8 hours before the procedure',
            'Stop blood thinners as directed by your doctor',
            'Arrange for someone to drive you home',
            'Continue taking most regular medications with a small sip of water',
            'Inform your doctor of any loose teeth or dental work'
        ],
        risks: [
            'Bleeding from biopsy site (usually minor)',
            'Perforation of the GI tract (very rare, <0.1%)',
            'Reaction to sedation',
            'Aspiration (breathing in stomach contents)',
            'Sore throat or bloating after procedure'
        ],
        relatedCodes: ['43235', '43249', '43255'],
        nationalStats: {
            low: 1200,
            median: 2800,
            high: 5500,
            sampleSize: 520000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'How do I know if I need an upper endoscopy?',
                answer: 'Common reasons include persistent heartburn unresponsive to treatment, difficulty swallowing, unexplained weight loss, chronic nausea, upper abdominal pain, or anemia. Your gastroenterologist will recommend it based on your symptoms and history.'
            },
            {
                question: 'Will I gag during the procedure?',
                answer: 'Sedation effectively prevents the gag reflex for most patients. A mouth guard protects your teeth and helps keep your mouth open. Most patients have no memory of any discomfort due to the sedation.'
            },
            {
                question: 'When will I get my biopsy results?',
                answer: 'Biopsy results typically take 3-7 business days. Your doctor will contact you to discuss findings. If H. pylori testing is performed, rapid urease test results may be available immediately.'
            }
        ]
    },
    {
        code: '66984',
        name: 'Cataract Surgery with IOL',
        slug: 'cataract-surgery',
        category: 'Outpatient',
        description: 'Cataract extraction with intraocular lens (IOL) implant is a procedure where the clouded natural lens of the eye is removed and replaced with an artificial lens. This is typically performed using phacoemulsification, where ultrasound breaks up the cataract for removal through a small incision. It is one of the most common and successful surgeries performed, with over 3 million procedures annually in the US.',
        typicalDuration: '15-30 minutes per eye',
        recoveryTime: 'Vision improvement within 24-48 hours; full healing in 4-6 weeks',
        anesthesiaType: 'Local',
        preparation: [
            'Pre-operative eye measurements to determine IOL power',
            'Stop certain eye drops as directed before surgery',
            'Arrange for transportation (you cannot drive day of surgery)',
            'No makeup or facial creams on the day of surgery',
            'Begin antibiotic eye drops 1-3 days before as prescribed'
        ],
        risks: [
            'Infection (endophthalmitis, <0.1%)',
            'Retinal detachment',
            'Posterior capsule opacity (secondary cataract)',
            'Dry eye (usually temporary)',
            'Need for glasses for certain distances',
            'Glare or halos around lights'
        ],
        relatedCodes: ['66982', '66985', '66821'],
        nationalStats: {
            low: 2500,
            median: 4500,
            high: 9000,
            sampleSize: 1200000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'Will I still need glasses after cataract surgery?',
                answer: 'It depends on the IOL type. Standard monofocal IOLs typically require reading glasses. Premium IOLs (multifocal, toric, accommodating) can reduce or eliminate glasses dependency but may cost extra as insurance often covers only basic lenses.'
            },
            {
                question: 'Can both eyes be done at once?',
                answer: 'Simultaneous bilateral cataract surgery (SBCS) is increasingly offered but most surgeons still prefer waiting 1-4 weeks between eyes. This allows the first eye to heal and provides a "backup" if any complications occur.'
            },
            {
                question: 'How long do artificial lenses last?',
                answer: 'IOLs are designed to be permanent and typically last a lifetime. They do not wear out, degrade, or need replacement. However, the capsule behind the lens may become cloudy (PCO), treatable with a quick in-office laser procedure.'
            }
        ]
    },
    {
        code: '33533',
        name: 'Coronary Artery Bypass Graft (CABG)',
        slug: 'coronary-artery-bypass',
        category: 'Inpatient',
        description: 'Coronary artery bypass grafting (CABG) is a major cardiac surgery that restores blood flow to the heart muscle by creating new pathways around blocked coronary arteries. Blood vessels from the leg (saphenous vein) or chest wall (internal mammary artery) are grafted to bypass severely narrowed or blocked coronary arteries. This procedure significantly improves blood flow and relieves angina symptoms.',
        typicalDuration: '3-6 hours',
        recoveryTime: '6-12 weeks; hospital stay of 4-7 days',
        anesthesiaType: 'General',
        preparation: [
            'Complete cardiac catheterization to map blockages',
            'Stop aspirin, blood thinners, and NSAIDs as directed',
            'Optimize diabetes and blood pressure control',
            'Stop smoking immediately (improves outcomes significantly)',
            'Review all medications with your cardiac surgery team'
        ],
        risks: [
            'Stroke (1-2%)',
            'Heart attack during or after surgery',
            'Wound infection',
            'Kidney problems',
            'Memory or cognitive changes (usually temporary)',
            'Atrial fibrillation (25-40%)',
            'Bleeding requiring transfusion'
        ],
        relatedCodes: ['33534', '33535', '33536'],
        nationalStats: {
            low: 70000,
            median: 123000,
            high: 250000,
            sampleSize: 165000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'Is CABG better than stents?',
                answer: 'For extensive coronary artery disease (especially in diabetics or those with left main disease), CABG often provides better long-term outcomes than stents. For single or double vessel disease, stents may be preferred. Your cardiologist and surgeon will discuss the best option for your specific situation.'
            },
            {
                question: 'What is the survival rate for bypass surgery?',
                answer: 'CABG has an overall survival rate of 97-98% for elective surgery. Long-term survival is excellent, with 85-90% of patients alive at 5 years. Risk varies based on urgency, age, and other health conditions.'
            },
            {
                question: 'Will my chest bone heal after surgery?',
                answer: 'The sternum (breastbone) takes 6-8 weeks to heal. During this time, you should avoid lifting more than 5-10 pounds, pushing or pulling heavy objects, and driving. Most patients return to normal activities by 12 weeks.'
            }
        ]
    },
    {
        code: '22612',
        name: 'Spinal Fusion (Lumbar)',
        slug: 'spinal-fusion-lumbar',
        category: 'Inpatient',
        description: 'Lumbar spinal fusion is a surgical procedure that permanently connects two or more vertebrae in the lower spine to eliminate motion between them. This is typically performed to treat spinal instability, degenerative disc disease, spondylolisthesis, or spinal stenosis. The procedure may include insertion of bone graft, screws, rods, and cages to facilitate bone healing and fusion.',
        typicalDuration: '2-6 hours',
        recoveryTime: '3-6 months for bone fusion; 6-12 months for full recovery',
        anesthesiaType: 'General',
        preparation: [
            'Optimize weight and nutrition before surgery',
            'Stop smoking at least 4 weeks before (nicotine inhibits bone healing)',
            'Physical therapy to strengthen core muscles',
            'Adjust medications as directed by surgeon',
            'Prepare home environment for limited mobility'
        ],
        risks: [
            'Failed fusion (pseudoarthrosis)',
            'Infection',
            'Nerve damage causing pain, weakness, or numbness',
            'Blood clots',
            'Hardware failure (screws loosening)',
            'Adjacent segment disease (stress on nearby spine levels)'
        ],
        relatedCodes: ['22630', '22633', '22614'],
        nationalStats: {
            low: 50000,
            median: 90000,
            high: 180000,
            sampleSize: 200000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'Will I lose flexibility after spinal fusion?',
                answer: 'Single-level fusions typically cause minimal noticeable loss of flexibility. Multi-level fusions may noticeably reduce bending and twisting ability. The remaining spine segments often compensate over time. Most patients find the trade-off acceptable for pain relief.'
            },
            {
                question: 'Why do some spinal fusions fail?',
                answer: 'Risk factors include smoking (most significant), obesity, diabetes, poor nutrition, osteoporosis, and multi-level fusions. Following post-operative instructions carefully, especially avoiding nicotine, significantly improves fusion success rates.'
            },
            {
                question: 'How long until I can return to work?',
                answer: 'Sedentary work: 4-8 weeks. Light physical work: 3-4 months. Heavy labor: 6-12 months or may require job modification. Some physical occupations may not be advisable after fusion surgery.'
            }
        ]
    },
    {
        code: '77067',
        name: 'Digital Mammography (Screening)',
        slug: 'mammography-digital',
        category: 'Imaging',
        description: 'Screening digital mammography is a preventive X-ray examination of the breast used to detect breast cancer in women who have no symptoms. It uses low-dose radiation to create detailed images of breast tissue. Digital mammography allows for computer-enhanced images that can be magnified and adjusted for better detection, especially in women with dense breast tissue.',
        typicalDuration: '15-30 minutes',
        recoveryTime: 'None; normal activities can resume immediately',
        anesthesiaType: 'None',
        preparation: [
            'Schedule for 1-2 weeks after your period (breasts less tender)',
            'Do not wear deodorant, powder, or lotion on the chest area',
            'Wear a two-piece outfit for convenience',
            'Bring prior mammogram images if from another facility',
            'Inform technologist of any breast symptoms or concerns'
        ],
        risks: [
            'Low radiation exposure (equivalent to about 7 weeks of background radiation)',
            'Discomfort from breast compression (brief)',
            'False positives leading to additional testing',
            'False negatives (no test is 100% accurate)',
            'Overdiagnosis of slow-growing cancers that may never cause harm'
        ],
        relatedCodes: ['77066', '77065', '77063'],
        nationalStats: {
            low: 100,
            median: 250,
            high: 600,
            sampleSize: 2100000,
            dataYear: 2025
        },
        faqs: [
            {
                question: 'How often should I get a mammogram?',
                answer: 'Current guidelines vary: USPSTF recommends every 2 years from ages 50-74; American Cancer Society suggests annual screening from age 45 (biennial at 55+). Women at higher risk may need earlier and more frequent screening. Discuss with your doctor.'
            },
            {
                question: 'Why are mammograms uncomfortable?',
                answer: 'Breast compression is necessary to spread tissue thin for clearer images and reduce radiation dose. Modern machines minimize pressure needed. If you experience significant pain, tell the technician—adjustments can often be made.'
            },
            {
                question: 'What if I have dense breasts?',
                answer: 'Dense breasts are normal (half of women have them) but make cancers harder to detect. Many states now require density notification. Supplemental screening with ultrasound or MRI may be recommended for women with very dense breasts and other risk factors.'
            }
        ]
    }
];

/**
 * Get a CPT entry by code
 */
export function getCPTEntry(code: string): CPTEntry | undefined {
    return CPT_ENCYCLOPEDIA.find(entry => entry.code === code);
}

/**
 * Get a CPT entry by slug
 */
export function getCPTBySlug(slug: string): CPTEntry | undefined {
    return CPT_ENCYCLOPEDIA.find(entry => entry.slug === slug);
}

/**
 * Get related procedures based on CPT code relationships
 */
export function getRelatedProcedures(code: string): CPTEntry[] {
    const entry = getCPTEntry(code);
    if (!entry) return [];

    return entry.relatedCodes
        .map(relatedCode => getCPTEntry(relatedCode))
        .filter((e): e is CPTEntry => e !== undefined);
}

/**
 * Get all procedures in a category
 */
export function getProceduresByCategory(category: CPTEntry['category']): CPTEntry[] {
    return CPT_ENCYCLOPEDIA.filter(entry => entry.category === category);
}
