
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProductFormValues } from "../schemas/productSchema";
import { useNavigate } from "react-router-dom";

export const useProductOperations = (userId: string | undefined, shopId: string | null) => {
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const addProduct = async (values: ProductFormValues) => {
    if (!userId || !shopId) {
      toast.error("You must have a shop to add products");
      return false;
    }

    try {
      setSubmitting(true);
      
      // Prepare all images array including the main image
      const allImages = [values.image, ...images].filter(Boolean);
      
      const { data, error } = await supabase
        .from('marketplace_products' as any)
        .insert({
          seller_id: userId,
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
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
      return false;
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

  return {
    submitting,
    images,
    addProduct,
    handleAddImageUrl,
    handleRemoveImage
  };
};
