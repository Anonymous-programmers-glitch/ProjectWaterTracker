import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import sprite from "../ui/image/sprite/sprite.svg";
import styles from "./TeamModal.module.css";
import XMarkOutline from "../ui/icons/xMarkOutline";


import lyubarsky from "../ui/image/team/lyubarsky.webp";
import babenko from "../ui/image/team/babenko.webp";
import bartytskyi from "../ui/image/team/bartytskyi.webp"
import bova from "../ui/image/team/bova.webp";
import beda from "../ui/image/team/beda.webp";
import horokhovatska from "../ui/image/team/horokhovatska.webp";
import cherviakov from "../ui/image/team/cherviakov.webp"
import bystryi from "../ui/image/team/bystryi.webp";
import sidorchuk from "../ui/image/team/sidorchuk.jpg";
import more3 from "../ui/image/team/more3.webp";

const frontTeam = [
  {
    name: `Konstantin Lyubarsky`,
    photo: lyubarsky,
    role: `Team Lead`,
    social: {
      linkedin: "https://www.linkedin.com/in/konstantin-lubarskiy/",
      github: "https://github.com/Lubarskiyk",
    },
  },
      
  
  {
    name: `Nataliia Horokhovatska`,
    photo: horokhovatska,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/nataliia-horokhovatska/",
      github: "https://github.com/NataliHor",
    },
  },
  {
    name: `Ihor Cherviakov`,
    photo: cherviakov,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/ihor-cherviakov-818805274/",
      github: "https://github.com/cherviakow",
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
    name: `Yevsovych Kateryna`,
    photo: more3,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/evsovichka",
    },
  },
  {
    name: `Denys Bystryi`,
    photo: bystryi,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/denys-bystryi-609184249/",
      github: "https://github.com/Bystryi21",
    },
},

{
    name: `Ihor`,
    photo: sidorchuk,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/StIgorek",
    },
},
];

const backTeam = [
  {
    name: `Irina Babenko`,
    photo: babenko,
    role: `Scrum Master`,
    social: {
      linkedin: "https://www.linkedin.com/in/irina-babenko-383718175/",
      github: "https://github.com/Irina-Babenko",
    },
  },
  {
    name: `Sergii Bartytskyi`,
    photo: bartytskyi,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/sergiibartytskyi/",
      github: "https://github.com/SergiiBartytskyi",
    },
  },
  {
    name: `Mykola Sidorchuk`,
    photo: sidorchuk,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/mykola-sidorchuk-v/",
      github: "https://github.com/Mikosid",
    },
},
{
    name: `Serhii Bova`,
    photo: bova,
    role: `Developer`,
    social: {
      linkedin: "https://www.linkedin.com/in/serhii-bova/",
      github: "https://github.com/GOIT-Serhii",
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
