import { Outlet } from "react-router";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main className={css.container}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
