DROP POLICY IF EXISTS "Only designated user can delete UT-gallery"
ON storage.objects;

CREATE POLICY "Only designated user can delete UT-gallery"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'UT-gallery'
  AND auth.uid() = '866abca4-ee32-4f24-a719-025c97946e7b'::uuid
);
