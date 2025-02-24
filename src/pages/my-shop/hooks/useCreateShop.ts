
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useCreateShop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createShop = async () => {
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

      // Create new shop
      const { data, error } = await supabase
        .from("shops")
        .insert({
          owner_id: user.id,
          name: `Shop ${Math.random().toString(36).substring(7)}`, // Temporary name
          slug: `shop-${Math.random().toString(36).substring(7)}`, // Temporary slug
          owner_name: user.email?.split('@')[0] || 'Shop Owner',
          status: 'draft',
          contact_email: user.email || '',
          phone_number: '',
          address: '',
          id_card_number: '',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return { createShop, isLoading };
};
