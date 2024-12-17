import "./App.css";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./components/layout/Layout.jsx";
import SigninPage from "./pages/SigninPage/SigninPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import WelcomePage from "./pages/WelcomePage/welcomePage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
// import PrivateRoute from "./PrivateRoute.jsx";
// import RestrictedRoute from "./RestrictedRoute.jsx";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
// const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
// const SignupPage = lazy(() =>import("./pages/SignupPage/SignupPage.jsx"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />

        <Route path="/welcome" element={<WelcomePage />} />
        {/* <Route path="/welcome" element={ <PrivateRoute redirectTo="/login" component={<WelcomePage />} /> }/> */}

        <Route path="/signin" element={<SigninPage />} />
        {/* <Route path="/login" element={ <RestrictedRoute redirectTo="/WelcomePage" component={<LoginPage />} />}/> */}

        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/registration" element={ <RestrictedRoute redirectTo="/WelcomePage" component={<RegisterPage />}/>} /> */}

        <Route path="/homepage" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
