import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
