import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  openDeleteModal,
  openEditModal,
} from "../../../redux/modalToggle/slice.js";
import { getIsWaterToday } from "../../../redux/waterToday/selectors.js";
import { resizeWindow } from "../../../utils/resizeWindow.js";
import GlassOfWater from "../../ui/icons/GlassOfWater.jsx";
import PencilSquareOutline from "../../ui/icons/PencilSquareOutline.jsx";
import TrashOutline from "../../ui/icons/TrashOutline.jsx";
import css from "./waterlistitemtoday.module.css";

function WaterListIItemToday(item) {
  const dispatch = useDispatch();
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow <= 767;
  const size = isMobile ? "26" : "36";
  const { _id, amount, date } = item.item;
  const dataToday = useSelector(getIsWaterToday);

  const handleEdit = (e) => {
    const elem = e.currentTarget;
    const id = elem.closest("li").id;
    const index = dataToday.waterRecords.findIndex((item) => item._id === id);
    const data = dataToday.waterRecords[index];
    dispatch(openEditModal(data));
  };

  const handleDelete = (e) => {
    const elem = e.currentTarget;
    const id = elem.closest("li").id;
    dispatch(openDeleteModal(id));
  };

  return (
    <li className={css.item} key={_id} id={_id}>
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
  );
}

export default WaterListIItemToday;
