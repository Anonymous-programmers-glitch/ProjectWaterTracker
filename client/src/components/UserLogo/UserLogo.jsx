import { useState } from "react";
// import { useSelector } from "react-redux";
// import UserLogoModal from "./UserLogoModal";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { user } = useSelector((state) => state.auth);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // const avatarContent = user.avatar ? (
  //   <img src={user.avatar} alt="User Avatar" />
  // ) : (
  //   <span>{(user.name || user.email[0]).charAt(0).toUpperCase()}</span>
  // );

  return (
    <>
      <button className="user-logo" onClick={toggleModal}>
        {/* {avatarContent} */}
        {/* <span>{user.name || user.email}</span> */}
      </button>
      {/* {isModalOpen && <UserLogoModal onClose={toggleModal} user={user} />} */}
    </>
  );
};

export default UserLogo;
