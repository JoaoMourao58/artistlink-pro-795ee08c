-- Create storage bucket for artist media
INSERT INTO storage.buckets (id, name, public)
VALUES ('artist-media', 'artist-media', true);

-- Create policies for the bucket
CREATE POLICY "Anyone can view artist media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'artist-media');

CREATE POLICY "Authenticated users can upload artist media"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'artist-media' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update artist media"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'artist-media' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete artist media"
ON storage.objects
FOR DELETE
USING (bucket_id = 'artist-media' AND auth.uid() IS NOT NULL);