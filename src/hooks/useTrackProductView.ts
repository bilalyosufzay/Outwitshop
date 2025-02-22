
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTrackProductView = (productId: string) => {
  const { user } = useAuth();

  useEffect(() => {
    const trackView = async () => {
      if (!user || !productId) return;

      try {
        const { error } = await supabase
          .from('product_views')
          .upsert({
            user_id: user.id,
            product_id: productId,
            viewed_at: new Date().toISOString()
          }, {
            onConflict: 'unique_user_product_view'
          });

        if (error) {
          console.error('Error tracking product view:', error);
        }
      } catch (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackView();
  }, [productId, user]);
};
