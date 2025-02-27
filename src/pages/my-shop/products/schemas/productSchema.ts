
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("Price must be positive"),
  originalPrice: z.coerce.number().positive("Original price must be positive").optional(),
  image: z.string().url("Please enter a valid image URL"),
  commissionRate: z.coerce.number().min(1).max(50).default(10),
});

export type ProductFormValues = z.infer<typeof productSchema>;
