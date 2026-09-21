# FryMasterCheese Play & Earn v2

This package is for `FRYMASTERCHEESE/FRYMASTERCHEESE.github.io`.

## Included
- Responsive Play & Earn frontend
- Email/password signup and login
- Password-reset flow
- Cloud profile/progress support through Supabase
- Unique referral codes and `?ref=CODE` links
- Referral dashboard
- PayPal, SOL, ETH, DOGE and BTC withdrawal-request UI
- PostgreSQL schema, Row Level Security and account/referral triggers
- AdSense publisher meta/script retained

## Important: what is real now vs what still needs external setup
The frontend works immediately and game progress falls back to local device storage.
Login, cloud saves and referrals become live after you create a Supabase project, run `backend/supabase/schema.sql`, and put the project's PUBLIC URL + anon/publishable key in `config.js`.

The withdrawal database deliberately accepts ONLY **verified_usd**. No browser game score can mint cash. Actual PayPal/crypto transfers require a private server/Edge Function and credentials/wallet signing that must NEVER be committed to this public GitHub Pages repo.

## Deploy
Upload `index.html`, `styles.css`, `app.js`, `config.js`, `.nojekyll`, `ads.txt` and `404.html` to the ROOT of `FRYMASTERCHEESE.github.io`.

Do not upload private keys, seed phrases, PayPal secrets, Supabase service-role keys, or exchange API secrets.

See `SETUP.md` for the next steps.
