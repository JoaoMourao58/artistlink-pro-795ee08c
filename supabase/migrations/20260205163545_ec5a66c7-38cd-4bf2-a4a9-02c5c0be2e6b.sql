-- 1. Create role enum and user_roles table for proper role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles, users can see their own
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Only through database/edge functions can roles be assigned (no direct insert/update)
CREATE POLICY "No direct role modification"
ON public.user_roles FOR ALL
USING (false);

-- 2. Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. Fix page_views: Only admins can read analytics data
DROP POLICY IF EXISTS "Authenticated users can view page views" ON public.page_views;

CREATE POLICY "Only admins can view page views"
ON public.page_views FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Fix button_clicks: Only admins can read click analytics
DROP POLICY IF EXISTS "Authenticated users can view button clicks" ON public.button_clicks;

CREATE POLICY "Only admins can view button clicks"
ON public.button_clicks FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Auto-assign admin role to existing users in profiles table
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles
ON CONFLICT (user_id, role) DO NOTHING;

-- 6. Create trigger to auto-assign role on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();