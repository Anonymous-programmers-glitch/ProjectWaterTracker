import "./App.css";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./components/layout/Layout.jsx";
import SignInPage from "./pages/SignIn/SignIn.jsx";
import SignUpPage from "./pages/SignUp/SignUp.jsx";
import WelcomePage from "./pages/WelcomePage/welcomePage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
// const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
// const RegisterPage = lazy(() =>import("./pages/RegisterPage/RegisterPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Please wait, updating user info...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo="/homepage"
              component={<WelcomePage />}
            />
          }
        />
        <Route path="/welcome" element={<WelcomePage />} />
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
              component={<SignInPage />}
            />
          }
        />

        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
