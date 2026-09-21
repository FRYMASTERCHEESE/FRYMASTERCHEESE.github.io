# Security rules

- No private keys or seed phrases in this repository.
- No PayPal client secret in browser JavaScript.
- No real balance stored only in localStorage.
- No client-authoritative score or reward calculation.
- Do not auto-pay suspicious/large withdrawals without review.
- Validate payout destinations server-side.
- Use HTTPS, secure sessions, CSRF protection where applicable, strict CORS, rate limiting and audit logs.
- Use integer minor units for fiat and integer base units for crypto internally; avoid floating point for money.
