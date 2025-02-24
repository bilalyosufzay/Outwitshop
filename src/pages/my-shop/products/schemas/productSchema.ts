
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  stock_quantity: z.coerce.number().min(0, "Stock quantity must be greater than or equal to 0"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
