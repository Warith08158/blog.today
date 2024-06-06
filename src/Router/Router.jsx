import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { FetchingPage } from "../Indicator/indicator";
const RootLayout = lazy(() => import("../Layouts/RootLayout"));
const SignIn = lazy(() => import("../routes/SignIn"));
const SignUp = lazy(() => import("../routes/SignUp"));
const ForgetPassword = lazy(() => import("../routes/ForgetPassword"));
const ErrorPage = lazy(() => import("../routes/ErrorPage"));
const Feed = lazy(() => import("../routes/Feed"));
const UserDashboard = lazy(() => import("../routes/UserDashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<FetchingPage />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<FetchingPage />}>
            <Feed />
          </Suspense>
        ),
      },
      {
        path: "user-dashboard",
        element: (
          <Suspense fallback={<FetchingPage />}>
            <UserDashboard />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<FetchingPage />}>
        <SignIn />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<FetchingPage />}>
        <SignUp />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<FetchingPage />}>
        <ForgetPassword />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
