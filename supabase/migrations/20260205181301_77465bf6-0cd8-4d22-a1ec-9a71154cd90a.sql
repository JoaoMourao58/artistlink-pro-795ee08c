-- 1. FIX ARTISTS: Create/update public view WITHOUT whatsapp_number
DROP VIEW IF EXISTS public.artists_public;

CREATE VIEW public.artists_public
WITH (security_invoker = on) AS
SELECT 
  id,
  name,
  slug,
  bio,
  full_bio,
  genre,
  photo_url,
  banner_url,
  main_video_url,
  press_kit_url,
  social_links,
  is_active,
  created_at,
  updated_at
  -- whatsapp_number is intentionally EXCLUDED
FROM public.artists
WHERE is_active = true;

-- 2. Update artists table policies: deny public SELECT, only admins see whatsapp
DROP POLICY IF EXISTS "Public can read artists via view" ON public.artists;
DROP POLICY IF EXISTS "Only authenticated users can view full artists data" ON public.artists;

-- Only admins can read full artist data (including whatsapp)
CREATE POLICY "Only admins can view full artists data"
ON public.artists FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 3. FIX LEADS: Only admins can access leads
DROP POLICY IF EXISTS "Authenticated users can manage leads" ON public.leads;

CREATE POLICY "Only admins can view leads"
ON public.leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update leads"
ON public.leads FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete leads"
ON public.leads FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));