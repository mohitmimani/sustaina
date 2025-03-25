import {
  MaterialCategorySchema,
  WasteCategorySchema,
  ReceiptTypeSchema,
} from "@/prisma/generated/zod";
import { z } from "zod";

export const ItemWithoutIdSchema = z.object({
  id: z.string().optional(),
  materialCategory: MaterialCategorySchema,
  wasteCategory: WasteCategorySchema,
  name: z.string(),
  price: z.number(),
  weight: z.number().optional().nullable(),
  weightUnit: z.string().optional().nullable(),
  expiry: z.coerce.date().optional().nullable(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable(),
  receiptId: z.string().optional().nullable(),
});

export const ReceiptWithoutIdSchema = z.object({
  id: z.string().optional(),
  type: ReceiptTypeSchema,
  name: z.string(),
  date: z.coerce.date(), // Only date part
  amount: z.string(),
  items: ItemWithoutIdSchema.array().optional().nullable(),
  userId: z.string().optional().nullable(),
});

// Type exports
export type ItemWithoutId = z.infer<typeof ItemWithoutIdSchema>;
export type ReceiptWithoutId = z.infer<typeof ReceiptWithoutIdSchema>;
