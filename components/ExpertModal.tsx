'use client';

import { useState } from 'react';
import { ShieldCheck, Phone, Loader2, Check, User, MessageSquare, AlertCircle } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import clsx from 'clsx';
import { submitLead } from '@/app/actions';

interface ExpertModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    /** The specific question or concern text from the button clicked */
    initialQuestion: string;
    /** Technical context passed to the consultant (e.g., persona code or logic) */
    expertContext: string;
}

/**
 * ExpertModal Component
 * * Refined to act as a "Human Bridge":
 * 1. Displays the user's specific question to validate their concern.
 * 2. Provides a simplified "Grade 5" level explanation of the value.
 * 3. Includes a textarea for custom details to prime the consultant.
 */
export default function ExpertModal({
    isOpen,
    onClose,
    planName,
    initialQuestion,
    expertContext
}: ExpertModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userNotes, setUserNotes] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        // Include the custom notes in the form data
        formData.append('notes', userNotes);

        const result = await submitLead(formData, {
            planName,
            persona: expertContext,
            question: initialQuestion // Ensure the consultant knows exactly what was clicked
        });

        if (result.success) {
            setStatus('success');
        } else {
            setStatus('error');
        }
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title="Expert Verification">
            <div className="space-y-6">
                {/* 1. The "Human Bridge" Header */}
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex gap-4 items-start">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-sm shrink-0">
                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="font-black text-emerald-900 text-sm uppercase tracking-wide">Verify Your Concern</h4>
                        <p className="text-sm font-medium text-emerald-800 mt-1 italic leading-relaxed">
                            "{initialQuestion}"
                        </p>
                    </div>
                </div>

                {/* 2. Simplified Value Prop (Grade 5 level) */}
                <div className="px-1">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        To give you a 100% correct answer, an accredited consultant needs to check your specific health needs against the <span className="font-bold text-slate-700">{planName}</span> rules.
                    </p>
                </div>

                {/* 3. The Form */}
                {status !== 'success' ? (
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Custom Detail Textarea */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                Anything else to add? (Optional)
                            </label>
                            <textarea
                                placeholder="Example: 'I'm currently on Concerta 36mg' or 'I need to know about the R16k limit.'"
                                value={userNotes}
                                onChange={(e) => setUserNotes(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all h-24 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    Your Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="082 123 4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-center gap-2 text-rose-700 text-xs font-bold">
                                <AlertCircle className="w-4 h-4" />
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting' || phone.length < 10 || name.length < 2}
                            className={clsx(
                                "w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl",
                                status === 'submitting' || phone.length < 10 || name.length < 2
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700"
                            )}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Connecting to Expert...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-5 h-5 text-emerald-100" />
                                    Get My Answer
                                </>
                            )}
                        </button>

                        <p className="text-[10px] text-center text-slate-400 font-medium">
                            Private & Secure. Accredited Medical Aid Specialist.
                        </p>
                    </form>
                ) : (
                    <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Check className="w-10 h-10 stroke-[3]" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Request Sent!</h3>
                        <p className="text-slate-500 text-sm px-6 leading-relaxed">
                            Thanks {name}. A consultant will call you shortly on <span className="font-bold text-slate-800">{phone}</span> to verify your cover for <span className="font-bold text-emerald-700">{planName}</span>.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-8 px-8 py-3 bg-slate-100 rounded-full text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                        >
                            Back to Plan
                        </button>
                    </div>
                )}
            </div>
        </BottomSheet>
    );
}