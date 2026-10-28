# United Trust Revamp

The United Educational & Social Welfare Trust website, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Development

Run `npm install` and then `npm run dev` to start the local development server. Use `npm run build` to verify a production build and `npm run lint` to run ESLint.

## Supabase

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` before using the client in `src/lib/supabase.ts`. The gallery uses public object URLs, so make the `UT-gallery` bucket public and add a Storage `SELECT` policy for listing objects. The app allowlist is in `src/lib/gallery.ts`. Apply `supabase/add-gallery-uploader-policy.sql` to grant the additional gallery user upload access and `supabase/delete-gallery-media-policy.sql` to allow both designated users to delete media. Keep the existing `INSERT` policy for the original uploader. Review Storage policies and remove any broader `INSERT` or `DELETE` policies for this bucket, since permissive policies are combined. Authorized users can upload multiple images or videos up to 50 MB each and select multiple gallery items for deletion. The anon key is intended for browser use; never expose a service-role key in client-side code.

## UI libraries

Framer Motion provides animation primitives, and Lucide React provides icons.
