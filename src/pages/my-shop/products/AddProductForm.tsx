
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BackButton } from "@/components/BackButton";
import { LoaderCircle } from "lucide-react";
import { productSchema, ProductFormValues } from "./schemas/productSchema";
import { useProductOperations } from "./hooks/useProductOperations";
import ProductForm from "./components/ProductForm";

const AddProductForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shopId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
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

  const { 
    submitting,
    images,
    addProduct,
    handleAddImageUrl,
    handleRemoveImage 
  } = useProductOperations(user?.id, shopId);

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

      <ProductForm
        form={form}
        onSubmit={addProduct}
        submitting={submitting}
        images={images}
        onAddImage={handleAddImageUrl}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};

export default AddProductForm;
