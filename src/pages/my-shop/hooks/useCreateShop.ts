
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CreateShopData {
  name: string;
  description?: string;
  contactEmail: string;
  ownerName: string;
  idCardNumber: string;
  address: string;
  phoneNumber: string;
}

export const useCreateShop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createShop = async (data: CreateShopData) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    try {
      // Check if shop already exists
      const { data: existingShop } = await supabase
        .from("shops")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (existingShop) {
        return existingShop;
      }

      // Create new shop with provided data
      const { data: newShop, error } = await supabase
        .from("shops")
        .insert({
          owner_id: user.id,
          name: data.name,
          description: data.description,
          slug: data.name.toLowerCase().replace(/\s+/g, '-'),
          contact_email: data.contactEmail,
          owner_name: data.ownerName,
          id_card_number: data.idCardNumber,
          address: data.address,
          phone_number: data.phoneNumber,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return newShop;
    } finally {
      setIsLoading(false);
    }
  };

  return { createShop, isLoading };
};
