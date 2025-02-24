
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  stock_quantity: z.coerce.number().min(0, "Stock quantity must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  sku: z.string().optional(),
  weight: z.coerce.number().min(0, "Weight must be greater than or equal to 0").optional(),
  dimensions: z.object({
    length: z.coerce.number().min(0),
    width: z.coerce.number().min(0),
    height: z.coerce.number().min(0),
  }).optional(),
  features: z.array(z.string()).optional(),
  specifications: z.array(z.object({
    name: z.string(),
    value: z.string()
  })).optional(),
  images: z.array(z.string()).min(1, "At least one product image is required"),
  video_url: z.string().url().optional(),
  shipping_info: z.object({
    free_shipping: z.boolean(),
    shipping_fee: z.coerce.number().min(0),
  }).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
