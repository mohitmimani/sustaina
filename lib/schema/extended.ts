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
  weight: z.number().int().optional(),
  weightUnit: z.string().optional(),
  expiry: z.coerce.date().optional(),
  quantity: z.number().int(),
  brand: z.string().nullable(),
  isConsumed: z.boolean().nullable(),
  receiptId: z.string().optional(),
});

export const ReceiptWithoutIdSchema = z.object({
  id: z.string().optional(),
  type: ReceiptTypeSchema,
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  items: ItemWithoutIdSchema.array().optional(),
  userId: z.string().optional(),
});

// Type exports
export type ItemWithoutId = z.infer<typeof ItemWithoutIdSchema>;
export type ReceiptWithoutId = z.infer<typeof ReceiptWithoutIdSchema>;
