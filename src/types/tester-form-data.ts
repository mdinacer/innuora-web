import { z } from "zod";

export const advancedTesterSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  occupation: z
    .string()
    .max(100, "Occupation is too long")
    .optional()
    .nullable(),
  struggles: z
    .string()
    .max(1000, "Struggles text is too long")
    .optional()
    .nullable(),
  coping: z
    .string()
    .max(1000, "Coping mechanisms text is too long")
    .optional()
    .nullable(),
  source: z.string().max(255, "Source text is too long").optional().nullable(),
  notes: z.string().max(1000, "Notes text is too long").optional().nullable(),
});

export type AdvancedTesterData = z.infer<typeof advancedTesterSchema>;
