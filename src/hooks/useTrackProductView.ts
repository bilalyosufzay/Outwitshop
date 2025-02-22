
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTrackProductView = (productId: string) => {
  const { user } = useAuth();

  useEffect(() => {
    const trackView = async () => {
      if (!user) return;

      // Using type assertion to work around type checking
      const { error } = await supabase
        .from('product_views' as any)
        .upsert({
          user_id: user.id,
          product_id: productId,
          viewed_at: new Date().toISOString(),
        } as any, {
          onConflict: 'unique_user_product_view'
        });

      if (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackView();
  }, [productId, user]);
};
