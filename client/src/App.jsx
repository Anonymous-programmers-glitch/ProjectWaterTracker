import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/homepage/homepage.jsx";
import SignInPage from "./pages/signin/signin.jsx";
import SignUpPage from "./pages/signup/signup.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Main Page</h1>} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/registration" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
