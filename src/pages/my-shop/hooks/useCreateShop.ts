
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { CreateShopFormData } from "../types";

export const useCreateShop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const createShop = async (data: CreateShopFormData) => {
    if (!user) {
      toast.error("You must be logged in to create a shop");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('shops')
        .insert({
          owner_id: user.id,
          name: data.name,
          description: data.description,
          slug: data.slug.toLowerCase(),
          contact_email: data.contactEmail,
          status: 'pending',
          owner_name: data.ownerName,
          id_card_number: data.idCardNumber,
          address: data.address,
          phone_number: data.phoneNumber,
          business_license: data.businessLicense,
        });

      if (error) throw error;

      toast.success("Shop application submitted successfully! Awaiting verification.");
      navigate("/my-shop/dashboard");
    } catch (error: any) {
      toast.error(
        error.message === "duplicate key value violates unique constraint"
          ? "This shop URL is already taken. Please choose another."
          : "Failed to create shop. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { createShop, isLoading };
};
