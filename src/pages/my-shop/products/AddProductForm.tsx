
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "@/components/BackButton";
import { CATEGORIES } from "@/data/categories";
import { LoaderCircle } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("Price must be positive"),
  originalPrice: z.coerce.number().positive("Original price must be positive").optional(),
  image: z.string().url("Please enter a valid image URL"),
  commissionRate: z.coerce.number().min(1).max(50).default(10),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      image: "",
      commissionRate: 10,
    },
  });

  useEffect(() => {
    if (!user) return;

    const fetchShop = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('shops')
          .select('id')
          .eq('owner_id', user.id)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') {
            // No shop found for this seller
            return navigate('/my-shop/create');
          }
          throw error;
        }
        
        setShopId(data.id);
      } catch (error) {
        console.error("Error fetching shop:", error);
        toast.error("Failed to load shop information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchShop();
  }, [user, navigate]);

  const onSubmit = async (values: ProductFormValues) => {
    if (!user || !shopId) {
      toast.error("You must have a shop to add products");
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare all images array including the main image
      const allImages = [values.image, ...images].filter(Boolean);
      
      const { data, error } = await supabase
        .from('marketplace_products')
        .insert({
          seller_id: user.id,
          shop_id: shopId,
          name: values.name,
          description: values.description,
          category: values.category,
          price: values.price,
          original_price: values.originalPrice || null,
          image: values.image,
          images: allImages,
          commission_rate: values.commissionRate,
          featured: false,
          trending: false,
          on_sale: values.originalPrice ? true : false,
          status: 'active',
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Product added successfully");
      navigate('/my-shop/products');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddImageUrl = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl && imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-semibold ml-2">Add New Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product description" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price (for discounts)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      placeholder="Optional"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : undefined;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <FormLabel>Additional Images</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddImageUrl}
              >
                Add Image URL
              </Button>
            </div>
            {images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Additional ${index}`}
                      className="h-24 w-full object-cover rounded-md" 
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No additional images added</p>
            )}
          </div>

          <FormField
            control={form.control}
            name="commissionRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commission Rate (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="50" 
                    step="0.5"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/my-shop/products')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
