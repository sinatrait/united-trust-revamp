DROP POLICY IF EXISTS "Additional user can upload UT-gallery"
ON storage.objects;

CREATE POLICY "Additional user can upload UT-gallery"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'UT-gallery'
  AND auth.uid() = 'd8cedf00-da06-4221-b6be-16fbdc8789d8'::uuid
);
