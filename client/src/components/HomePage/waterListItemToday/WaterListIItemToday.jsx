import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openEditModal } from "../../../redux/modal/slice.js";
import { resizeWindow } from "../../../utils/resizeWindow.js";
import GlassOfWater from "../../ui/icons/GlassOfWater.jsx";
import PencilSquareOutline from "../../ui/icons/PencilSquareOutline.jsx";
import TrashOutline from "../../ui/icons/TrashOutline.jsx";
import css from "./waterlistitemtoday.module.css";

function WaterListIItemToday({ item }) {
  const dispatch = useDispatch();
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow <= 767;
  const size = isMobile ? "26" : "36";
  const { _id, amount, date } = item;

  const handleEdit = () => {
    dispatch(openEditModal({ _id, amount, date }));
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
    </>
  );
}

export default WaterListIItemToday;
