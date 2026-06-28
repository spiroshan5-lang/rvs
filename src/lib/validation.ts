import { z } from 'zod';

/**
 * Server-side validation schema for contact form inquiries.
 * Prevents injection attacks and malformed data.
 */
export const InquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[a-zA-Z\s\.\-'\u0027]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email too long'),
  phone: z
    .string()
    .min(7, 'Phone number too short')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone contains invalid characters'),
  budget: z.enum(['Under 5L', '5-10L', '10-25L', 'Above 25L'] as const),
  service: z.enum(['Residential', 'Commercial', 'Modular Kitchen', 'Other'] as const),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(200, 'Location must be under 200 characters'),
  message: z
    .string()
    .max(500, 'Message must be under 500 characters')
    .optional()
    .or(z.literal('')),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

/**
 * Escapes HTML special characters to prevent XSS injection.
 * Use this before inserting any user data into HTML templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
