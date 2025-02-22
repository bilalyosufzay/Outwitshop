
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTrackProductView = (productId: string) => {
  const { user } = useAuth(); // Changed from session to user since that's what our AuthContext provides

  useEffect(() => {
    const trackView = async () => {
      if (!user) return;

      const { error } = await supabase
        .from('product_views')
        .upsert(
          {
            user_id: user.id,
            product_id: productId,
            viewed_at: new Date().toISOString(),
          },
          {
            onConflict: 'unique_user_product_view'
          }
        );

      if (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackView();
  }, [productId, user]);
};
