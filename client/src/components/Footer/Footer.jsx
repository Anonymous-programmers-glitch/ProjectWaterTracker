import { useState } from 'react';
import css from './Footer.module.css';
import sprite from '../ui/image/sprite/sprite.svg';
import TeamModal from "../TeamModal/TeamModal";

export const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <footer className={css.FooterBox}>
      <p className={css.FooterText}>&#169; 2024 | Developed with</p>
      <svg className={css.IconHeart}>
        <use href={`${sprite}#icon-heart`}></use>
      </svg>
      <button className={css.FooterBtn} onClick={openModal}>
        by Anonymous
      </button>
      {isModalOpen && <TeamModal onClose={closeModal} />}
    </footer>
  );
};

export default Footer