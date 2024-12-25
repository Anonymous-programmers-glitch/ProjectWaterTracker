import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/user/operations.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import { selectIsRefreshing } from "./redux/user/selectors.js";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
const Layout = lazy(() => import("./components/Layout/Layout.jsx"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const [modalActive, setModalActive] = useState(true);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Please wait, updating user info...</b>
  ) : (
    <>
      <Toaster position="top-center" />
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
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
