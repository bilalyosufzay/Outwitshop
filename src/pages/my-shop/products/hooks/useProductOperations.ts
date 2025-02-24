
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductFormValues } from "../schemas/productSchema";

export const useProductOperations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = async (values: ProductFormValues) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const { data: shop } = await supabase
        .from("shops")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (!shop) throw new Error("Shop not found");

      const { error } = await supabase.from("products").insert({
        name: values.name,
        description: values.description || null,
        price: values.price,
        stock_quantity: values.stock_quantity,
        shop_id: shop.id,
        status: "active",
      });

      if (error) throw error;

      toast({
        title: "Product added successfully",
        description: "Your new product has been added to your shop.",
      });

      navigate("/my-shop/products");
    } catch (error) {
      toast({
        title: "Error adding product",
        description: "There was an error adding your product. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addProduct, isLoading };
};
