# Specification

## Summary
**Goal:** Replace simulated/“Coming Soon” payment and notification flows with functional backend-driven internal escrow ledger payments, Internet Identity–only RBAC, and a complete in-app notification system.

**Planned changes:**
- Implement backend Internet Identity–only RBAC with a persisted Principal → Role registry (Admin, Mechanic, Customer, Garage Owner) and enforce authorization across privileged methods.
- Add a backend-managed Admin whitelist and backend admin-check methods for frontend route protection and admin action gating.
- Build a provider-agnostic internal escrow ledger in the backend with persisted transactions, per-booking escrow accounting, and auditable state transitions (Pending → Held → Released → Refunded → Disputed).
- Add admin-only backend actions to release funds and issue refunds with validation, persistence, and ledger/audit updates.
- Enforce backend booking lifecycle gating so bookings cannot be marked Completed unless escrow funds are Released.
- Update the booking/payment UI to remove simulated payment entry and “Coming Soon” options, wire confirmation to real backend mutations, and label flows as “Test Mode – Internal Ledger Active”.
- Add user-visible payment status surfaces and transaction history views powered by backend queries.
- Add Admin UI to list transactions, filter/view statuses, and perform Release/Refund actions with proper unauthorized handling and post-action refresh.
- Implement a persisted in-app notifications system (backend + frontend) with types: BookingCreated, BookingConfirmed, FundsReleased, DisputeOpened, AccountSuspended; include read/unread and event-driven creation.
- Add a top-nav notification badge + dropdown (recent notifications, unread count, mark-as-read) and a Notification Center page (unread/all filter, bulk mark-all-as-read).
- Replace “Coming Soon”/simulated toasts and placeholders in payments/notifications with real mutation-driven success/error toasts and state refresh.

**User-visible outcome:** Users can complete bookings using an internal-ledger escrow flow (clearly labeled test mode), see real payment/escrow status and transaction history, receive and manage in-app notifications, and admins can securely manage transactions (release/refund) with RBAC-enforced access and immediate UI updates.
