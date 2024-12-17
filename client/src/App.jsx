import "./App.css";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./components/layout/Layout.jsx";
import SigninPage from "./pages/SigninPage/SigninPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import WelcomePage from "./pages/WelcomePage/welcomePage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
// const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
// const SignupPage = lazy(() =>import("./pages/SignupPage/SignupPage.jsx"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
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
              component={<SigninPage />}
            />
          }
        />

        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
