# Real-money setup

The GitHub Pages frontend is public/static. Never put PayPal secrets, seed phrases, private keys, or exchange API secrets in this repository.

## Supported payout choices in the UI
- PayPal
- SOL
- ETH
- DOGE
- BTC

## Required production components
1. A secure HTTPS API/backend.
2. Authentication and a server-side database.
3. Server-authoritative game sessions/scores and anti-abuse checks.
4. An append-only reward ledger; never trust a balance sent by the browser.
5. Withdrawal requests with idempotency keys and statuses: requested, reviewing, approved, sent, failed/rejected.
6. PayPal Payouts credentials kept only in backend environment variables.
7. Crypto signing kept outside GitHub Pages. Prefer a managed custody/payout provider or isolated signer; do not expose hot-wallet private keys to the browser.
8. Webhooks/transaction confirmation handling before marking payouts complete.
9. Rate limits, audit logs, account lockouts, manual review thresholds and reconciliation.

## API contract the frontend can use later
GET  /api/me
POST /api/game/session
POST /api/game/complete
GET  /api/rewards
POST /api/withdrawals
GET  /api/withdrawals

POST /api/withdrawals body example:
{
  "method": "paypal|sol|eth|doge|btc",
  "destination": "email-or-wallet-address",
  "amount_nzd": "10.00",
  "idempotency_key": "random-unique-value"
}

The backend must calculate the authoritative balance and exchange amount. It must not accept a browser-supplied crypto conversion rate as authoritative.

## Before production
Test all payout paths in sandbox/test environments first. Obtain the necessary PayPal live approval/credentials and review NZ legal, tax, AML/CFT, consumer, gambling/prize and age requirements applicable to the exact reward model before enabling real withdrawals.
