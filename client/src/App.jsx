import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
const Layout = lazy(() => import("./components/layout/Layout.jsx"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<SuspenseFallback />}>
            <Layout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<SuspenseFallback />}>
              <RestrictedRoute
                redirectTo="/homepage"
                component={<WelcomePage />}
              />
            </Suspense>
          }
        />
        <Route
          path="/welcome"
          element={
            <Suspense fallback={<>Load</>}>
              <WelcomePage />
            </Suspense>
          }
        />
        <Route
          path="/homepage"
          element={
            <PrivateRoute redirectTo="/signin" component={<HomePage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute
              redirectTo="/homepage"
              component={<SigninPage />}
            />
          }
        />

        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
