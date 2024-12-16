import "./App.css";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./components/layout/Layout.jsx";
import SignInPage from "./pages/SignIn/SignIn.jsx";
import SignUpPage from "./pages/SignUp/SignUp.jsx";
import WelcomePage from "./pages/WelcomePage/welcomePage.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const WelcomePage = lazy(() => import("./pages/WelcomePage/welcomePage.jsx"));
// const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
// const RegisterPage = lazy(() =>import("./pages/RegisterPage/RegisterPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />

        {/* <Route path="/welcome" element={<WelcomePage />} /> */}
        <Route path="/welcome" element={ <PrivateRoute redirectTo="/login" component={<WelcomePage />} /> }/>

        {/* <Route path="/login" element={<h1>Login Page</h1>} /> */}
        <Route path="/signin" element={ <RestrictedRoute redirectTo="/WelcomePage" component={<SignInPage/>} />}/>

        {/* <Route path="/registration" element={<h1>Registion Page</h1>} /> */}
        <Route path="/signup" element={ <RestrictedRoute redirectTo="/WelcomePage" component={<SignUpPage />}/>} />

        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
