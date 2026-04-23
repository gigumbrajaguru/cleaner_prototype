# Client Reviews Setup

This site is static and can run on GitHub Pages. Client review storage and
moderation are handled by Supabase from the browser with the public anon key.
Keep the service role key out of this project.

## 1. Create the database tables and policies

Run `supabase/client_reviews.sql` in the Supabase SQL editor.

## 2. Configure the frontend environment

Create an untracked `.env.local` file for local development:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Do not commit `.env`, `.env.local`, or any `.env*` file. They are ignored by
git.

For GitHub Pages, add the same values as GitHub Actions environment secrets or
repository secrets named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The
deployment workflow reads those values during `npm run build`.

In GitHub, set Pages to deploy from GitHub Actions:

1. Open the repository settings.
2. Go to Pages.
3. Set Source to GitHub Actions.

## 3. Create admin users

Create one or more email/password users in Supabase Auth. Any confirmed
Supabase Auth user can sign in to approve or hide reviews, so only create Auth
users for people you trust to moderate the homepage slideshow.

When creating a user from the Supabase dashboard, enable auto-confirm or
manually confirm the email. Password login returns a `400` response if the user
does not exist, the password is wrong, the email is not confirmed, or
email/password auth is disabled.

Public visitors can submit reviews, but submitted reviews are hidden until an
authenticated admin enables them. Admins do not add reviews from the admin
section.
