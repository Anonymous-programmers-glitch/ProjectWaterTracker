import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { resizeWindow } from "../../../utils/resizeWindow.js";
import GlassOfWater from "../../ui/icons/GlassOfWater.jsx";
import PencilSquareOutline from "../../ui/icons/PencilSquareOutline.jsx";
import TrashOutline from "../../ui/icons/TrashOutline.jsx";
import TodayListModal from "../../TodayListModal/TodayListModal.jsx"; // Импортируем модальное окно
import css from "./waterlistitemtoday.module.css";
import { useState } from "react";

function WaterListIItemToday({ item }) {
  const dispatch = useDispatch();
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow <= 767;
  const size = isMobile ? "26" : "36";
  const { _id, amount, date } = item;

  // Состояние для отображения модального окна
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Открытие модального окна
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  // Закрытие модального окна
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Сохранение изменений
  const handleSave = (updatedData) => {
    console.log("Updated data:", updatedData);
    // Здесь нужно добавить логику для обновления записи (например, обновление в Redux)
    closeEditModal();
  };

  const handleDelete = () => {};

  return (
    <>
      <li className={css.item}>
        <div className={css.leftcontent}>
          <div className={css.watericon}>
            <GlassOfWater size={size} />
          </div>
          <p className={css.volumewater}>{amount} mL</p>
          <p className={css.time}>{dayjs(date).format("HH:mm")}</p>
        </div>
        <div className={css.rightcontent}>
          <button className={css.pencilicon} onClick={handleEdit}>
            <PencilSquareOutline size="16" />
          </button>
          <button className={css.trashicon} onClick={handleDelete}>
            <TrashOutline size="16" />
          </button>
        </div>
      </li>

      {/* Модальное окно редактирования */}
      {/*<TodayListModal*/}
      {/*  isOpen={isEditModalOpen}*/}
      {/*  mode="edit"*/}
      {/*  initialData={{ amount: volumeOfWater, time }}*/}
      {/*  onSave={handleSave}*/}
      {/*  onClose={closeEditModal}*/}
      {/*/>*/}
    </>
  );
}

export default WaterListIItemToday;
