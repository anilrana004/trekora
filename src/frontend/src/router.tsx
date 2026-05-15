import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy page imports
const HomePage = lazy(() => import("./pages/HomePage"));
const TreksPage = lazy(() => import("./pages/TreksPage"));
const TrekDetailPage = lazy(() => import("./pages/TrekDetailPage"));
const YatrasPage = lazy(() => import("./pages/YatrasPage"));
const YatraDetailPage = lazy(() => import("./pages/YatraDetailPage"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CorporatePage = lazy(() => import("./pages/CorporatePage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const UpcomingBatchesPage = lazy(() => import("./pages/UpcomingBatchesPage"));
const TrekAltitudeProfilePage = lazy(
  () => import("./pages/TrekAltitudeProfilePage"),
);
const TrekDifficultyGuidePage = lazy(
  () => import("./pages/TrekDifficultyGuidePage"),
);
const TrekBestTimePage = lazy(() => import("./pages/TrekBestTimePage"));
const TrekPackingListPage = lazy(() => import("./pages/TrekPackingListPage"));
const DestinationsStatePage = lazy(
  () => import("./pages/DestinationsStatePage"),
);
const DestinationsDistrictPage = lazy(
  () => import("./pages/DestinationsDistrictPage"),
);

const StateHubPage = lazy(() => import("./pages/StateHubPage"));
const TrekkerProfilePage = lazy(() => import("./pages/TrekkerProfilePage"));
const PressPage = lazy(() => import("./pages/PressPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const AdminTreksPage = lazy(() => import("./pages/admin/AdminTreksPage"));
const AdminBookingsPage = lazy(() => import("./pages/admin/AdminBookingsPage"));
const AdminQueriesPage = lazy(() => import("./pages/admin/AdminQueriesPage"));
const AdminBlogsPage = lazy(() => import("./pages/admin/AdminBlogsPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminPromosPage = lazy(() => import("./pages/admin/AdminPromosPage"));
const AdminAnalyticsPage = lazy(
  () => import("./pages/admin/AdminAnalyticsPage"),
);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#E87722] border-t-transparent rounded-full animate-spin" />
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
  notFoundComponent: () => <NotFoundPage />,
});

// Layout route (wraps all main pages)
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

// Main page routes
const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
  errorComponent: () => <ErrorPage />,
});

const treksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TreksPage />
    </Suspense>
  ),
});

// Trek sub-page routes (MUST be before trekDetailRoute to prevent slug conflicts)
const trekPackingListRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/$slug/packing-list",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekPackingListPage />
    </Suspense>
  ),
});

const trekBestTimeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/$slug/best-time",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekBestTimePage />
    </Suspense>
  ),
});

const trekDifficultyGuideRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/$slug/difficulty-guide",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekDifficultyGuidePage />
    </Suspense>
  ),
});

const trekAltitudeProfileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/$slug/altitude-profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekAltitudeProfilePage />
    </Suspense>
  ),
});

// State hub route
const stateHubRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/state/$state",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StateHubPage />
    </Suspense>
  ),
});

const trekDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/treks/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekDetailPage />
    </Suspense>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: () => <ErrorPage />,
});

const yatrasRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/yatras",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <YatrasPage />
    </Suspense>
  ),
});

const yatraDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/yatras/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <YatraDetailPage />
    </Suspense>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: () => <ErrorPage />,
});

const destinationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/destinations",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DestinationsPage />
    </Suspense>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});

const blogDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/blog/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogDetailPage />
    </Suspense>
  ),
});

const galleryRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/gallery",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GalleryPage />
    </Suspense>
  ),
});

const bookRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/book",
  validateSearch: (raw: Record<string, unknown>) => ({
    trek:
      typeof raw.trek === "string" && raw.trek.length > 0
        ? raw.trek
        : undefined,
  }),
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BookingPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});

const corporateRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/corporate",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CorporatePage />
    </Suspense>
  ),
});

const packagesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/packages",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PackagesPage />
    </Suspense>
  ),
});

const upcomingBatchesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/upcoming-batches",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <UpcomingBatchesPage />
    </Suspense>
  ),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/privacy-policy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPolicyPage />
    </Suspense>
  ),
});

const termsAndConditionsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/terms-and-conditions",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsAndConditionsPage />
    </Suspense>
  ),
});

const pressRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/press",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PressPage />
    </Suspense>
  ),
});

const trekkerProfileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/trekkers/$username",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekkerProfilePage />
    </Suspense>
  ),
});

const compareRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/compare",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ComparePage />
    </Suspense>
  ),
});

const destinationsStateRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/destinations/$stateSlug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DestinationsStatePage />
    </Suspense>
  ),
});

const destinationsDistrictRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/destinations/$stateSlug/$districtSlug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DestinationsDistrictPage />
    </Suspense>
  ),
});

// Admin routes
const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});

const adminTreksRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/treks",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminTreksPage />
    </Suspense>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBookingsPage />
    </Suspense>
  ),
});

const adminQueriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/queries",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminQueriesPage />
    </Suspense>
  ),
});

const adminBlogsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/blogs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBlogsPage />
    </Suspense>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminUsersPage />
    </Suspense>
  ),
});

const adminPromosRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/promos",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPromosPage />
    </Suspense>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminAnalyticsPage />
    </Suspense>
  ),
});

// Build route tree
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    treksRoute,
    trekPackingListRoute,
    trekBestTimeRoute,
    trekDifficultyGuideRoute,
    trekAltitudeProfileRoute,
    stateHubRoute,
    trekDetailRoute,
    yatrasRoute,
    yatraDetailRoute,
    destinationsRoute,
    destinationsStateRoute,
    destinationsDistrictRoute,
    blogRoute,
    blogDetailRoute,
    galleryRoute,
    bookRoute,
    dashboardRoute,
    pressRoute,
    trekkerProfileRoute,
    compareRoute,
    contactRoute,
    aboutRoute,
    corporateRoute,
    packagesRoute,
    upcomingBatchesRoute,
    privacyPolicyRoute,
    termsAndConditionsRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminTreksRoute,
    adminBookingsRoute,
    adminQueriesRoute,
    adminBlogsRoute,
    adminUsersRoute,
    adminPromosRoute,
    adminAnalyticsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  // Disable automatic scroll restoration so the browser does not jump to the
  // top when React state updates (e.g. the hero banner carousel) trigger a
  // re-render. `AnimatedOutlet` scrolls smoothly on real pathname changes.
  scrollRestoration: false,
  // Preload lazy route chunks on hover/focus — trek & yatra detail pages open faster.
  defaultPreload: "intent",
  defaultPreloadDelay: 60,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
