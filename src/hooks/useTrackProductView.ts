
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTrackProductView = (productId: string) => {
  const { session } = useAuth();

  useEffect(() => {
    const trackView = async () => {
      if (!session?.user) return;

      const { error } = await supabase
        .from('product_views')
        .upsert(
          {
            user_id: session.user.id,
            product_id: productId,
            viewed_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,product_id'
          }
        );

      if (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackView();
  }, [productId, session?.user]);
};
