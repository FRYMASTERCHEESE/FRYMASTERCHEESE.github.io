# FryMasterCheese Play & Earn

Upload these files to the root of `FRYMASTERCHEESE/FRYMASTERCHEESE.github.io`.

## Included now
- Mobile-first Play & Earn home page
- Tap Rush skill game
- Daily challenge
- XP, levels, best score and points saved locally
- Rewards screen
- Existing AdSense publisher ID retained
- Existing root `ads.txt` should be kept in the repository

## Important: real-money production architecture
Do NOT put payment keys, wallet private keys, reward balances, withdrawal approval logic or anti-cheat secrets in GitHub Pages JavaScript. Browser localStorage is user-editable and therefore cannot be authoritative for money.

Before cash withdrawals are enabled, connect a secure backend providing:
1. User authentication and database
2. Server-authoritative game sessions/scores
3. Anti-bot/anti-cheat/rate limiting
4. Immutable reward ledger
5. Eligibility/age/location and required identity checks
6. Payout provider or on-chain payout service with secrets held server-side
7. Withdrawal review, limits, idempotency and audit logs
8. Terms, privacy, reward rules and applicable compliance controls

The current UI deliberately labels points as non-cash until that backend exists.
