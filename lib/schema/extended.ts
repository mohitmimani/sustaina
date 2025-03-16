import { ItemSchema, ReceiptSchema } from "@/prisma/generated/zod";
import { z } from "zod";

export const ReceiptWithItemsSchema = ReceiptSchema.extend({
  items: z.array(ItemSchema),
  date: z.string().transform((str) => {
    const date = new Date(str);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }),
});

// Type export
export type ReceiptWithItems = z.infer<typeof ReceiptWithItemsSchema>;
