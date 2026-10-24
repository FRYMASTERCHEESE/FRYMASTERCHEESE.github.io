# Find The Cash NZ · GitHub Pages website & Android app

This folder contains the **Find The Cash NZ** community companion website in its own namespace, separate from the parent FryMasterCheese Play & Earn homepage and separate from Find The Cash NZ Fudge.

## Website

If the containing GitHub Pages repository serves \`main\` from the repository root, publish/merge this folder to show the site at:
**https://frymastercheese.github.io/find-the-cash-nz/**

- Open \`index.html\` locally in a browser or serve this folder through a static server.
- \`manifest.webmanifest\` and \`sw.js\` provide an offline PWA shell; installability depends on browser icon requirements.
- \`updates.json\` deliberately starts with \`connected:false\`. Until an authorized Meta integration is configured, no automated Facebook posts are claimed.
- All buttons link to the genuine Find The Cash NZ Page at \`https://www.facebook.com/FindTheCashNz/\`.
- The local hunt checklist does **not** synchronize between accounts/devices.
- All assets and site links are relative to this folder; no parent homepage files have been replaced.

## Android

Android project is under \`android/\`. It is a native Java app with Home, Updates, Hunt Kit and About tabs, native buttons, external Facebook links and device-only checklist storage. The GitHub Actions workflow at root \`.github/workflows/find-the-cash-nz-build.yml\` compiles a debug APK in CI. Play Store launch still needs a unique package/application identity check, real device tests, signed AAB, Play account and policies.

No bank details, OAuth tokens, Meta passwords, app signing keys or account secrets are committed. Meta Page API sync is **not connected**. Before a production launch, obtain and configure authorized API access and have the owner approve any hunt/winner announcements.

**Official page:** https://www.facebook.com/FindTheCashNz/
**Contact:** findthecashnz@gmail.com
**Research snapshot:** 24 October 2026 — 23,020 followers, 94% recommendation with 15 reviews; counts are not live values.
