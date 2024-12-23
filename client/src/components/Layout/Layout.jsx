import { Outlet } from "react-router";
import AppBar from "../AppBar/AppBar";
import { Footer } from "../Footer/Footer.jsx";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.Layout}>
      <AppBar />
      <main className={css.Content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
