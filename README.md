# United Trust Revamp

The United Educational & Social Welfare Trust website, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Development

Run `npm install` and then `npm run dev` to start the local development server. Use `npm run build` to verify a production build and `npm run lint` to run ESLint.

## Supabase

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` before using the client in `src/lib/supabase.ts`. The gallery uses public object URLs, so make the `UT-gallery` bucket public and add a Storage `SELECT` policy for listing objects. Add authenticated `INSERT` and `DELETE` policies restricted to the designated gallery user's UID. The delete policy SQL is in `supabase/delete-gallery-media-policy.sql`. Review Storage policies and remove any broader `DELETE` policies for this bucket, since permissive policies are combined. Authorized users can upload multiple images or videos up to 50 MB each and select multiple gallery items for deletion. The anon key is intended for browser use; never expose a service-role key in client-side code.

## UI libraries

Framer Motion provides animation primitives, and Lucide React provides icons.
