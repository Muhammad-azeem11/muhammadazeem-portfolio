"use server";

import { z } from "zod";

// Schema for server-side validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.string().min(1, "Please select an estimated investment"),
  nextStep: z.string().min(1, "Please select a preferred next step"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
  preferredNextStep?: string;
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1. Extract data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    message: formData.get("message"),
    budget: formData.get("budget"),
    nextStep: formData.get("nextStep"),
  };

  // 2. Validate data
  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fill out all required fields correctly.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const apiKey = process.env.RESEND_API_KEY;

  // If RESEND_API_KEY is not set, log and return a clear error
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured in environment variables.");
    return {
      status: "error",
      message: "Email service is not configured. Please contact me directly.",
    };
  }

  const primaryRecipient = process.env.CONTACT_RECIPIENT_EMAIL || "muhammadazeemzahid1@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  // 3. Send via Resend REST API directly
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #0a1628; border-bottom: 2px solid #1d6fe8; padding-bottom: 12px; margin-top: 0;">
          New Portfolio Inquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 180px; color: #555;">Full Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Work Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td><td style="padding: 8px 0;">${data.service}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Estimated Investment:</td><td style="padding: 8px 0;">${data.budget}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Preferred Next Step:</td><td style="padding: 8px 0;">${data.nextStep}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted At:</td><td style="padding: 8px 0;">${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })} PKT</td></tr>
        </table>
        <h3 style="color: #0a1628; margin-top: 24px; margin-bottom: 8px;">Project Details</h3>
        <div style="white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; color: #1e293b; line-height: 1.6;">${data.message}</div>
      </div>
    `;

    let resendPayload = {
      from: fromEmail,
      to: [primaryRecipient],
      reply_to: data.email,
      subject: `New Portfolio Inquiry — ${data.service}`,
      html: emailHtml,
    };

    let response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    let result = await response.json();

    // If Resend free tier sandbox restriction triggers (cannot send to other recipients without verified domain)
    if (
      !response.ok &&
      response.status === 403 &&
      typeof result?.message === "string" &&
      result.message.includes("You can only send testing emails to your own email address")
    ) {
      const match = result.message.match(/\(([^)]+)\)/);
      const ownerEmail = match ? match[1] : "mz972799@gmail.com";
      console.warn(
        `Resend sandbox mode active: cannot send directly to ${primaryRecipient} without verified domain. Forwarding to verified account address: ${ownerEmail}`
      );

      const fallbackHtml = `
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; color: #92400e;">
          <strong>Resend Sandbox Notice:</strong> This inquiry was intended for <strong>${primaryRecipient}</strong>. Because the Resend account is currently on sandbox mode (<code>${fromEmail}</code>), Resend forwarded it to your account owner address. To deliver directly to <strong>${primaryRecipient}</strong>, verify a custom domain at <a href="https://resend.com/domains" target="_blank" style="color: #1d6fe8;">resend.com/domains</a>.
        </div>
        ${emailHtml}
      `;

      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...resendPayload,
          to: [ownerEmail],
          subject: `[Inquiry for ${primaryRecipient}] New Inquiry — ${data.service}`,
          html: fallbackHtml,
        }),
      });

      result = await response.json();
    }

    if (!response.ok) {
      console.error("Resend API failed:", response.status, JSON.stringify(result));
      return {
        status: "error",
        message: `Email delivery failed (${response.status}): ${result?.message ?? "Unknown error"}. Please try again or book a consultation directly.`,
      };
    }

    console.log("Email sent successfully. Resend ID:", result?.id);

    return {
      status: "success",
      message: "Thanks — your inquiry has been received. I'll review the details and get back to you shortly.",
      preferredNextStep: data.nextStep,
    };
  } catch (error) {
    console.error("Unexpected error sending email:", error);
    return {
      status: "error",
      message: "Something went wrong while sending your inquiry. Please try again or book a consultation directly.",
    };
  }
}
