import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import sprite from "../ui/image/sprite/sprite.svg";
import styles from "./TeamModal.module.css";
import XMarkOutline from "../ui/icons/xMarkOutline";

import more from "../ui/image/team/more.webp";
import babenko from "../ui/image/team/babenko.webp";
import bova from "../ui/image/team/bova.webp";
import beda from "../ui/image/team/beda.webp";
import more3 from "../ui/image/team/more3.webp";
import more4 from "../ui/image/team/more4.webp";

const frontTeam = [
  {
    name: `Konstantin Lyubarsky`,
    photo: more,
    role: `Team Lead`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
    },
  },
  {
    name: `Irina Babenko`,
    photo: babenko,
    role: `Scrum Master`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/Irina-Babenko",
    },
  },
  {
    name: `Sergii Bartytskyi`,
    photo: more3,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/SergiiBartytskyi",
    },
  },
  {
    name: `Serhii Bova`,
    photo: bova,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/GOIT-Serhii",
    },
  },
  {
    name: `Valeriy Beda`,
    photo: beda,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/valeriy-beda-3150a785/",
      github: "https://github.com/ValeraVB",
    },
  },
  {
    name: `Serhii Bova`,
    photo: more3,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/GOIT-Serhii",
    },
  },
];

const backTeam = [
  {
    name: `Irina Babenko`,
    photo: babenko,
    role: `Scrum Master`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/Irina-Babenko",
    },
  },
  {
    name: `More4`,
    photo: more4,
    role: `Team Lead`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
    },
  },
  {
    name: `More4`,
    photo: more4,
    role: `Team Lead`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
    },
  },
];

const TeamModal = ({ onClose }) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <ModalBackdrop onClick={onClose}>
      <div className={styles.teamBox} onClick={(e) => e.stopPropagation()}>
        {/* Контейнер для заголовка и кнопки закрытия */}
        <div className={styles.header}>
          <h2 className={`${styles.headerTitle} ${styles.h2}`}>Our Team</h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkOutline className={styles.modalCloseIcon} />
          </button>
        </div>

        {/* Секция Front-end */}
        <h3 className={`${styles.title} ${styles.h3}`}>Front-end</h3>
        <ul className={styles.list}>
          {frontTeam.map((item) => (
            <li key={item.name} className={`${styles.item} ${styles.itemHover}`}>
              <img
                src={item.photo}
                alt={item.name}
                className={`${styles.photo} ${styles.photoTablet} ${styles.photoDesktop}`}
              />
              <div className={`${styles.textBox} ${styles.textBoxTablet}`}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={`${styles.role} ${styles.roleTablet}`}>{item.role}</p>
                <div className={styles.textBoxDiv}>
                  <a
                    href={item.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg>
                      <use href={`${sprite}#icon-linkedin`} />
                    </svg>
                  </a>
                  <a
                    href={item.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg>
                      <use href={`${sprite}#icon-githab`} />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Секция Back-end */}
        <h3 className={`${styles.title} ${styles.h3}`}>Back-end</h3>
        <ul className={styles.list}>
          {backTeam.map((item) => (
            <li key={item.name} className={`${styles.item} ${styles.itemHover}`}>
              <img
                src={item.photo}
                alt={item.name}
                className={`${styles.photo} ${styles.photoTablet} ${styles.photoDesktop}`}
              />
              <div className={`${styles.textBox} ${styles.textBoxTablet}`}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={`${styles.role} ${styles.roleTablet}`}>{item.role}</p>
                <div className={styles.textBoxDiv}>
                  <a
                    href={item.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg>
                      <use href={`${sprite}#icon-linkedin`} />
                    </svg>
                  </a>
                  <a
                    href={item.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg>
                      <use href={`${sprite}#icon-githab`} />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ModalBackdrop>
  );
};

TeamModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TeamModal;
