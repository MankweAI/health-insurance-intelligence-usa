import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UHC New York Healthcare Costs | Asclepius',
    description: 'Compare real negotiated healthcare costs from UnitedHealthcare New York. Transparent pricing for 500+ providers across 10 procedures.',
    openGraph: {
        title: 'UHC New York Healthcare Costs | Asclepius',
        description: 'Compare real negotiated healthcare costs from UnitedHealthcare New York.',
        siteName: 'Asclepius',
    },
};

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * UHC-NY Module Layout
 * 
 * Provides context and branding for the UHC New York data module.
 * All child pages inherit this layout.
 */
export default function UhcNyLayout({ children }: LayoutProps) {
    return (
        <>
            {/* Payer indicator bar - subtle branding */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-1.5 text-[11px] tracking-wide">
                <span className="opacity-90">Viewing</span>
                <span className="font-semibold mx-1">UnitedHealthcare New York</span>
                <span className="opacity-90">negotiated rates</span>
            </div>
            {children}
        </>
    );
}
