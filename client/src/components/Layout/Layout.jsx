import { Outlet } from "react-router";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.layoutContainer}>
      <AppBar />
      <main className={css.container}>
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;
