import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from './hooks/useQueries';
import Landing from './pages/Landing';
import MechanicBrowse from './pages/mechanics/MechanicBrowse';
import MechanicProfilePublic from './pages/mechanics/MechanicProfilePublic';
import MechanicProfileEditor from './pages/mechanics/MechanicProfileEditor';
import GarageBrowse from './pages/garages/GarageBrowse';
import GarageDetail from './pages/garages/GarageDetail';
import GarageListingEditor from './pages/garages/GarageListingEditor';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import MechanicDashboard from './pages/dashboards/MechanicDashboard';
import GarageOwnerDashboard from './pages/dashboards/GarageOwnerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import MarketplaceModeration from './pages/admin/MarketplaceModeration';
import ReviewModeration from './pages/admin/ReviewModeration';
import UserRoleManagement from './pages/admin/UserRoleManagement';
import VerificationQueue from './pages/admin/VerificationQueue';
import InsuranceReview from './pages/admin/InsuranceReview';
import WaiverRecords from './pages/admin/WaiverRecords';
import DisputeTools from './pages/admin/DisputeTools';
import RevenueTracking from './pages/admin/RevenueTracking';
import FeaturedBoostManagement from './pages/admin/FeaturedBoostManagement';
import WaitlistManagement from './pages/admin/WaitlistManagement';
import DemandHeatmap from './pages/admin/DemandHeatmap';
import NoShowPenalties from './pages/admin/NoShowPenalties';
import EscrowTransactions from './pages/admin/EscrowTransactions';
import IdentityVerification from './pages/trust-safety/IdentityVerification';
import Disputes from './pages/disputes/Disputes';
import MembershipSettings from './pages/settings/MembershipSettings';
import FixMyCarIntake from './pages/fix-my-car/FixMyCarIntake';
import FixMyCarResults from './pages/fix-my-car/FixMyCarResults';
import TransactionHistory from './pages/payments/TransactionHistory';
import NotificationCenter from './pages/notifications/NotificationCenter';
import UnsupportedFeaturesHub from './pages/coming-soon/UnsupportedFeaturesHub';
import AccessDenied from './pages/AccessDenied';
import TopNav from './components/layout/TopNav';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import AdminRouteGuard from './components/admin/AdminRouteGuard';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <ProfileSetupModal />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const mechanicBrowseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mechanics',
  component: MechanicBrowse,
});

const mechanicProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mechanics/$mechanicId',
  component: MechanicProfilePublic,
});

const mechanicEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mechanic/editor',
  component: MechanicProfileEditor,
});

const garageBrowseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/garages',
  component: GarageBrowse,
});

const garageDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/garages/$garageId',
  component: GarageDetail,
});

const garageEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/garage/editor',
  component: GarageListingEditor,
});

const customerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/customer',
  component: CustomerDashboard,
});

const mechanicDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/mechanic',
  component: MechanicDashboard,
});

const garageOwnerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/garage-owner',
  component: GarageOwnerDashboard,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/admin',
  component: () => (
    <AdminRouteGuard>
      <AdminDashboard />
    </AdminRouteGuard>
  ),
});

const marketplaceModerationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/moderation',
  component: () => (
    <AdminRouteGuard>
      <MarketplaceModeration />
    </AdminRouteGuard>
  ),
});

const reviewModerationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reviews',
  component: () => (
    <AdminRouteGuard>
      <ReviewModeration />
    </AdminRouteGuard>
  ),
});

const userRoleManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/roles',
  component: () => (
    <AdminRouteGuard>
      <UserRoleManagement />
    </AdminRouteGuard>
  ),
});

const verificationQueueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/verification',
  component: () => (
    <AdminRouteGuard>
      <VerificationQueue />
    </AdminRouteGuard>
  ),
});

const insuranceReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/insurance',
  component: () => (
    <AdminRouteGuard>
      <InsuranceReview />
    </AdminRouteGuard>
  ),
});

const waiverRecordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/waivers',
  component: () => (
    <AdminRouteGuard>
      <WaiverRecords />
    </AdminRouteGuard>
  ),
});

const disputeToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/disputes',
  component: () => (
    <AdminRouteGuard>
      <DisputeTools />
    </AdminRouteGuard>
  ),
});

const revenueTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/revenue',
  component: () => (
    <AdminRouteGuard>
      <RevenueTracking />
    </AdminRouteGuard>
  ),
});

const featuredBoostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/featured-boost',
  component: () => (
    <AdminRouteGuard>
      <FeaturedBoostManagement />
    </AdminRouteGuard>
  ),
});

const waitlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/waitlist',
  component: () => (
    <AdminRouteGuard>
      <WaitlistManagement />
    </AdminRouteGuard>
  ),
});

const demandHeatmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/demand',
  component: () => (
    <AdminRouteGuard>
      <DemandHeatmap />
    </AdminRouteGuard>
  ),
});

const noShowPenaltiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/no-show-penalties',
  component: () => (
    <AdminRouteGuard>
      <NoShowPenalties />
    </AdminRouteGuard>
  ),
});

const escrowTransactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/escrow-transactions',
  component: () => (
    <AdminRouteGuard>
      <EscrowTransactions />
    </AdminRouteGuard>
  ),
});

const identityVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trust-safety/identity-verification',
  component: IdentityVerification,
});

const disputesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/disputes',
  component: Disputes,
});

const membershipSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/membership',
  component: MembershipSettings,
});

const fixMyCarIntakeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fix-my-car',
  component: FixMyCarIntake,
});

const fixMyCarResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fix-my-car/results',
  component: FixMyCarResults,
});

const transactionHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payments/transactions',
  component: TransactionHistory,
});

const notificationCenterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: NotificationCenter,
});

const unsupportedFeaturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/coming-soon',
  component: UnsupportedFeaturesHub,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  mechanicBrowseRoute,
  mechanicProfileRoute,
  mechanicEditorRoute,
  garageBrowseRoute,
  garageDetailRoute,
  garageEditorRoute,
  customerDashboardRoute,
  mechanicDashboardRoute,
  garageOwnerDashboardRoute,
  adminDashboardRoute,
  marketplaceModerationRoute,
  reviewModerationRoute,
  userRoleManagementRoute,
  verificationQueueRoute,
  insuranceReviewRoute,
  waiverRecordsRoute,
  disputeToolsRoute,
  revenueTrackingRoute,
  featuredBoostRoute,
  waitlistRoute,
  demandHeatmapRoute,
  noShowPenaltiesRoute,
  escrowTransactionsRoute,
  identityVerificationRoute,
  disputesRoute,
  membershipSettingsRoute,
  fixMyCarIntakeRoute,
  fixMyCarResultsRoute,
  transactionHistoryRoute,
  notificationCenterRoute,
  unsupportedFeaturesRoute,
  accessDeniedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
