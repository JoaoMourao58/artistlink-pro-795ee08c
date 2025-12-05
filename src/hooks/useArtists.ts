import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Artist {
  id: string;
  slug: string;
  name: string;
  genre: string;
  bio: string;
  full_bio: string | null;
  banner_url: string | null;
  photo_url: string | null;
  main_video_url: string | null;
  whatsapp_number: string;
  press_kit_url: string | null;
  social_links: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  artist_id: string;
  name: string;
  description: string;
  video_url: string | null;
  duration: string | null;
  technical_info: string | null;
  repertoire: string[];
  photos: string[];
  sort_order: number;
}

export interface Show {
  id: string;
  artist_id: string;
  date: string;
  city: string;
  venue: string;
  status: 'confirmed' | 'available' | 'pending';
  notes: string | null;
}

export interface Testimonial {
  id: string;
  artist_id: string;
  name: string;
  role: string;
  text: string;
  photo_url: string | null;
}

export interface Photo {
  id: string;
  artist_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
}

export interface Video {
  id: string;
  artist_id: string;
  url: string;
  title: string | null;
  sort_order: number;
}

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Artist[];
    }
  });
};

export const useArtist = (slug: string) => {
  return useQuery({
    queryKey: ['artist', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as Artist | null;
    },
    enabled: !!slug
  });
};

export const useArtistProjects = (artistId: string) => {
  return useQuery({
    queryKey: ['projects', artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('artist_id', artistId)
        .order('sort_order');
      
      if (error) throw error;
      return data as Project[];
    },
    enabled: !!artistId
  });
};

export const useArtistShows = (artistId: string) => {
  return useQuery({
    queryKey: ['shows', artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shows')
        .select('*')
        .eq('artist_id', artistId)
        .order('date');
      
      if (error) throw error;
      return data as Show[];
    },
    enabled: !!artistId
  });
};

export const useArtistTestimonials = (artistId: string) => {
  return useQuery({
    queryKey: ['testimonials', artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('artist_id', artistId);
      
      if (error) throw error;
      return data as Testimonial[];
    },
    enabled: !!artistId
  });
};

export const useArtistPhotos = (artistId: string) => {
  return useQuery({
    queryKey: ['photos', artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('artist_id', artistId)
        .order('sort_order');
      
      if (error) throw error;
      return data as Photo[];
    },
    enabled: !!artistId
  });
};

export const useArtistVideos = (artistId: string) => {
  return useQuery({
    queryKey: ['videos', artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('artist_id', artistId)
        .order('sort_order');
      
      if (error) throw error;
      return data as Video[];
    },
    enabled: !!artistId
  });
};

export const useTrackPageView = () => {
  return useMutation({
    mutationFn: async (artistId: string) => {
      const { error } = await supabase
        .from('page_views')
        .insert({
          artist_id: artistId,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent
        });
      
      if (error) throw error;
    }
  });
};

export const useTrackButtonClick = () => {
  return useMutation({
    mutationFn: async ({ artistId, buttonType }: { artistId: string; buttonType: string }) => {
      const { error } = await supabase
        .from('button_clicks')
        .insert({
          artist_id: artistId,
          button_type: buttonType
        });
      
      if (error) throw error;
    }
  });
};
