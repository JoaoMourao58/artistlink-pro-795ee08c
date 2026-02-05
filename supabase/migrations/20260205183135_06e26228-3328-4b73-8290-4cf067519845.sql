-- Drop and recreate the view without security_invoker so it uses owner permissions
DROP VIEW IF EXISTS public.artists_public;

CREATE VIEW public.artists_public AS
SELECT 
  id,
  slug,
  name,
  genre,
  bio,
  full_bio,
  banner_url,
  photo_url,
  main_video_url,
  press_kit_url,
  social_links,
  is_active,
  created_at,
  updated_at
FROM public.artists
WHERE is_active = true;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.artists_public TO anon, authenticated;