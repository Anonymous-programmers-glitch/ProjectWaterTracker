import { useState } from "react";
import { Outlet } from "react-router";
import AppBar from "../AppBar/AppBar";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import css from "./Layout.module.css";

const Layout = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.container}>
      <AppBar />
      <div className={css.logoutSection}>
        <button onClick={openModal} className={css.logoutButton}>
          Log Out
        </button>
      </div>
     <UserLogoutModal isOpen={isModalOpen} onClose={closeModal} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
