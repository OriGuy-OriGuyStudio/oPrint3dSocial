import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({
      required_error: "שדה חובה, לא יכול להיות ריק",
    })
    .nonempty({
      message: "שדה חובה, לא יכול להיות ריק",
    }),
  facebook: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  instagram: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  twitter: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  linkedin: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  whatsapp: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  tiktok: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  youtube: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  website: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
});
