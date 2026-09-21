# Setup checklist

1. Keep GitHub Pages as the public frontend at `https://frymastercheese.github.io`.
2. Create a Supabase project.
3. In Supabase SQL Editor, run `backend/supabase/schema.sql`.
4. In Supabase Authentication settings, set the Site URL to `https://frymastercheese.github.io` and add it to allowed redirect URLs.
5. Copy only the project's PUBLIC URL and anon/publishable browser key into `config.js`.
6. Upload the root web files to the GitHub Pages repository.
7. Test: sign up, email verification (if enabled), login, logout, password reset, referral link, second test signup using referral, and cloud progress on two browsers.
8. Do NOT enable cash rewards from game scores yet. The included progress RPC is suitable for cloud-saving game progress, not authoritative money accounting.
9. Real rewards need a private backend/Edge Function that verifies qualifying gameplay/referrals and credits `verified_usd`. PayPal and crypto signing secrets belong there.
10. Payout processing should start in sandbox/test environments and use manual approval until fraud controls and reconciliation are tested.

This package intentionally separates game points from money so a player cannot edit browser JavaScript and directly withdraw funds.
