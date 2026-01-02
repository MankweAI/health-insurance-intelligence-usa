/**
 * US Healthcare Provider Data
 * 
 * Provider information with CMS quality metrics for SEO-defensible pages.
 * 
 * Phase 1: Sample data for 10 major hospitals
 * Phase 2: Integrate with CMS Hospital Compare API and NPPES database
 */

import { UsProvider } from '@/types/us-tic';

export const PROVIDERS: UsProvider[] = [
    {
        npi: '1316921218',
        name: 'Mayo Clinic - Rochester',
        slug: 'mayo-clinic-rochester',
        facilityType: 'Hospital',
        address: {
            street: '200 First St SW',
            city: 'Rochester',
            state: 'MN',
            zip: '55905',
            coordinates: { lat: 44.0225, lng: -92.4669 }
        },
        traumaLevel: 'Level I',
        bedCount: 2059,
        specializations: ['Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 'Gastroenterology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 84,
            hacScore: 0.67,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 14
    },
    {
        npi: '1649227067',
        name: 'Cleveland Clinic',
        slug: 'cleveland-clinic',
        facilityType: 'Hospital',
        address: {
            street: '9500 Euclid Ave',
            city: 'Cleveland',
            state: 'OH',
            zip: '44195',
            coordinates: { lat: 41.5030, lng: -81.6213 }
        },
        traumaLevel: 'Level I',
        bedCount: 1511,
        specializations: ['Cardiology', 'Cardiac Surgery', 'Urology', 'Gastroenterology', 'Pulmonology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 82,
            hacScore: 0.71,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 10
    },
    {
        npi: '1003857137',
        name: 'Massachusetts General Hospital',
        slug: 'mass-general',
        facilityType: 'Hospital',
        address: {
            street: '55 Fruit St',
            city: 'Boston',
            state: 'MA',
            zip: '02114',
            coordinates: { lat: 42.3631, lng: -71.0686 }
        },
        traumaLevel: 'Level I',
        bedCount: 1057,
        specializations: ['Oncology', 'Psychiatry', 'Neurology', 'Cardiology', 'Orthopedics'],
        certifications: ['Magnet', 'Joint Commission'],
        metrics: {
            cmsStarRating: 4,
            patientExperienceScore: 78,
            hacScore: 0.89,
            readmissionRate: 'Average',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 18
    },
    {
        npi: '1639150600',
        name: 'Cedars-Sinai Medical Center',
        slug: 'cedars-sinai',
        facilityType: 'Hospital',
        address: {
            street: '8700 Beverly Blvd',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90048',
            coordinates: { lat: 34.0749, lng: -118.3805 }
        },
        traumaLevel: 'Level I',
        bedCount: 958,
        specializations: ['Cardiology', 'Gastroenterology', 'Neurology', 'Orthopedics', 'Oncology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 80,
            hacScore: 0.74,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 12
    },
    {
        npi: '1104820384',
        name: 'Johns Hopkins Hospital',
        slug: 'johns-hopkins',
        facilityType: 'Hospital',
        address: {
            street: '1800 Orleans St',
            city: 'Baltimore',
            state: 'MD',
            zip: '21287',
            coordinates: { lat: 39.2965, lng: -76.5926 }
        },
        traumaLevel: 'Level I',
        bedCount: 1162,
        specializations: ['Neurology', 'Psychiatry', 'Rheumatology', 'Ophthalmology', 'Urology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 79,
            hacScore: 0.82,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 16
    },
    {
        npi: '1699721397',
        name: 'UCLA Medical Center',
        slug: 'ucla-medical-center',
        facilityType: 'Hospital',
        address: {
            street: '757 Westwood Plaza',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90095',
            coordinates: { lat: 34.0663, lng: -118.4465 }
        },
        traumaLevel: 'Level I',
        bedCount: 560,
        specializations: ['Cardiology', 'Orthopedics', 'Urology', 'Gynecology', 'Gastroenterology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 81,
            hacScore: 0.76,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 11
    },
    {
        npi: '1437130277',
        name: 'NewYork-Presbyterian Hospital',
        slug: 'ny-presbyterian',
        facilityType: 'Hospital',
        address: {
            street: '525 E 68th St',
            city: 'New York',
            state: 'NY',
            zip: '10065',
            coordinates: { lat: 40.7649, lng: -73.9542 }
        },
        traumaLevel: 'Level I',
        bedCount: 2600,
        specializations: ['Psychiatry', 'Cardiology', 'Diabetes', 'Neurology', 'Pediatrics'],
        certifications: ['Magnet', 'Joint Commission'],
        metrics: {
            cmsStarRating: 4,
            patientExperienceScore: 76,
            hacScore: 0.91,
            readmissionRate: 'Average',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 8
    },
    {
        npi: '1568406756',
        name: 'Mount Sinai Hospital',
        slug: 'mount-sinai',
        facilityType: 'Hospital',
        address: {
            street: '1468 Madison Ave',
            city: 'New York',
            state: 'NY',
            zip: '10029',
            coordinates: { lat: 40.7903, lng: -73.9528 }
        },
        traumaLevel: 'Level I',
        bedCount: 1171,
        specializations: ['Cardiology', 'Geriatrics', 'Gastroenterology', 'Orthopedics', 'Pulmonology'],
        certifications: ['Magnet', 'Joint Commission'],
        metrics: {
            cmsStarRating: 4,
            patientExperienceScore: 75,
            hacScore: 0.95,
            readmissionRate: 'Average',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 7
    },
    {
        npi: '1184628549',
        name: 'Northwestern Memorial Hospital',
        slug: 'northwestern-memorial',
        facilityType: 'Hospital',
        address: {
            street: '251 E Huron St',
            city: 'Chicago',
            state: 'IL',
            zip: '60611',
            coordinates: { lat: 41.8954, lng: -87.6209 }
        },
        traumaLevel: 'Level I',
        bedCount: 894,
        specializations: ['Cardiology', 'Gynecology', 'Neurology', 'Orthopedics', 'Gastroenterology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 83,
            hacScore: 0.69,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 9
    },
    {
        npi: '1548258979',
        name: 'Stanford Health Care',
        slug: 'stanford-health',
        facilityType: 'Hospital',
        address: {
            street: '300 Pasteur Dr',
            city: 'Stanford',
            state: 'CA',
            zip: '94305',
            coordinates: { lat: 37.4337, lng: -122.1750 }
        },
        traumaLevel: 'Level I',
        bedCount: 613,
        specializations: ['Oncology', 'Cardiology', 'Orthopedics', 'Pulmonology', 'Neurology'],
        certifications: ['Magnet', 'Joint Commission', 'Leapfrog A'],
        metrics: {
            cmsStarRating: 5,
            patientExperienceScore: 82,
            hacScore: 0.73,
            readmissionRate: 'Below',
            metricsAsOf: '2025-10'
        },
        averageWaitDays: 15
    }
];

/**
 * Get provider by NPI
 */
export function getProviderByNpi(npi: string): UsProvider | undefined {
    return PROVIDERS.find(p => p.npi === npi);
}

/**
 * Get provider by slug
 */
export function getProviderBySlug(slug: string): UsProvider | undefined {
    return PROVIDERS.find(p => p.slug === slug);
}

/**
 * Get providers by state
 */
export function getProvidersByState(state: string): UsProvider[] {
    return PROVIDERS.filter(p => p.address.state === state);
}

/**
 * Get providers within distance (simplified, uses coordinates)
 */
export function getNearbyProviders(
    lat: number,
    lng: number,
    maxMiles: number = 50,
    excludeNpi?: string
): UsProvider[] {
    const toRad = (deg: number) => deg * Math.PI / 180;

    return PROVIDERS.filter(p => {
        if (p.npi === excludeNpi) return false;
        if (!p.address.coordinates) return false;

        const R = 3959; // Earth radius in miles
        const dLat = toRad(p.address.coordinates.lat - lat);
        const dLng = toRad(p.address.coordinates.lng - lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat)) * Math.cos(toRad(p.address.coordinates.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance <= maxMiles;
    });
}

/**
 * Get providers by specialization
 */
export function getProvidersBySpecialization(specialization: string): UsProvider[] {
    return PROVIDERS.filter(p =>
        p.specializations.some(s => s.toLowerCase() === specialization.toLowerCase())
    );
}
