import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface WhatsAppLinkParams {
  artistId: string;
  artistName: string;
}

export const useWhatsAppLink = () => {
  return useMutation({
    mutationFn: async ({ artistId, artistName }: WhatsAppLinkParams) => {
      const { data, error } = await supabase.functions.invoke('get-whatsapp-link', {
        body: { artistId, artistName }
      });
      
      if (error) throw error;
      return data.link as string;
    }
  });
};
