import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "Please enter a valid email address",
    }),
  phoneNumber: z.string().regex(/^[+]?[0-9\s-]{10,15}$/, {
    message: "Please enter a valid phone number",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
