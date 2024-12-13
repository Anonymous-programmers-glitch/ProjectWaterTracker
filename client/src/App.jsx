import "./App.css";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout.jsx";
// import HomePage from "./pages/homepage/homepage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx"


const HomePage = lazy(() => import("./pages/homepage/homepage.jsx"));
// const RegistionPage = lazy(() =>import("./pages/RegistionPage/RegistionPage.jsx"));
// const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
// const WelcomePage = lasy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
// const NotFoundPage = lasy(() => import(""))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<RestrictedRoute redirectTo="/WelcomePage" component={<LoginPage />} />} />
        <Route path="/registration" element={<RestrictedRoute redirectTo="/WelcomePage" component={<RegistionPage />} />} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

{/* <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/registration" element={<h1>Registion Page</h1>} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes> */}
