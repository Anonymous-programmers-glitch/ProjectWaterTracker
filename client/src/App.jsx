import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/homepage/homepage.jsx";
import WelcomePage from "./pages/WelcomePage/welcomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/registration" element={<h1>Registion Page</h1>} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
