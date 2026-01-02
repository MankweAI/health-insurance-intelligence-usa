'use server';

export async function submitContact(formData: FormData): Promise<{ success: true } | { success: false; error: string }> {
    // Stub implementation - log form data for now
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    console.log('Contact form submission:', { name, email, subject, message });

    // Return success for now - in production this would send an email
    return { success: true };
}

export async function submitLead(
    formData: FormData,
    context?: { planName?: string; persona?: string; question?: string }
): Promise<{ success: true } | { success: false; error: string }> {
    // Stub implementation - log lead data for now
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    console.log('Lead submission:', { name, email, phone, context });

    return { success: true };
}
