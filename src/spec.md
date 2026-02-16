# Specification

## Summary
**Goal:** Add a functional DIY Support layer plus trust & safety, revenue, admin, and policy workflows, while labeling unsupported capabilities as “Coming Soon” with simulated UX.

**Planned changes:**
- Add a prominent “Need Help While DIY?” entry point on Garage Detail and in the DIY/garage booking flow, opening a DIY Support panel/modal with auth gating.
- Build DIY Support features: repair scenario tool/consumable recommendations (saved per user session) and a backend-calculated repair cost estimator with stored “Recent estimates”.
- Add “mechanic assistance mid-booking” as a booking add-on request; persist and show request status in both customer and mechanic dashboards.
- Implement Trust & Safety workflows: identity verification submission (document upload + status) with admin review actions; insurance upload workflows for mechanics/garage owners with admin approval/rejection.
- Implement waiver digital signing for garage rentals (typed name + checkbox + timestamp) and enforce signing when waiverRequired=true; store and display signed records in booking details and admin tools.
- Implement dispute resolution ticketing tied to bookings/listings with statuses, comments/timeline, optional attachment reference, and admin resolution/closure with note (non-real-time).
- Add “Coming Soon” labeled simulated UX flows for unsupported features: video consultation upsell, in-app messaging, push notifications, real-time tracking, escrow payments, and Apple Pay/Google Pay options; ensure consistency with existing Coming Soon map patterns.
- Implement revenue model integration: configurable platform fee/commission settings, backend fee calculations applied to bookings/rentals, and an admin revenue tracking view with totals/basic breakdowns.
- Implement featured mechanic boost as a functional flag with pricing metadata (no payment), admin approval controls, visible “Featured” badge, and browse prioritization.
- Implement emergency service surge pricing with mechanic-configurable settings and customer-facing adjusted price display; persist and compute in backend.
- Implement mechanic pro membership and customer DIY membership states (no billing), persisted and reflected in UI, including DIY membership garage rental discount line items in pricing breakdown.
- Enhance Admin Dashboard with pages for verification, waitlist management (pending/invited/converted), and a demand “heatmap” view aggregated by location string (no external maps), all admin-gated.
- Add a mobile-first “Fix My Car” intake flow (issue description + media upload) that routes to suggested next steps and shows estimated cost; AI pre-diagnosis remains simulated and labeled Coming Soon.
- Add desktop browse enhancements: mechanic comparison (select up to N), advanced filter panel layout, and a toggleable map+list split-screen mode with Coming Soon map where needed.
- Add a no-show rating penalty system: authorized marking with reason, backend penalty records, visibility in user dashboards and admin reporting/filtering.
- Add desktop calendar drag-and-drop booking UX; if not fully supported, keep it simulated with “Coming Soon” labeling and graceful reset without breaking existing pages.

**User-visible outcome:** Users can access DIY Support during garage browsing/booking to get saved tool recommendations and cost estimates, request mechanic assistance mid-booking, complete verification/insurance/waiver flows, open and track disputes, see memberships/discounts and pricing modifiers applied, and interact with clearly labeled “Coming Soon” simulated flows for unsupported features; admins can review verifications/insurance, manage waitlists, view demand aggregation, track revenue, and manage disputes and no-show penalties.
