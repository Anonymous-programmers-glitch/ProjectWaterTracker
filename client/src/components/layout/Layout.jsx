import { Outlet } from "react-router";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
