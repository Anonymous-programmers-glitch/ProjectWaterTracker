import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openEditModal } from "../../../redux/modal/slice.js";
import { deleteWaterToday } from "../../../redux/waterToday/operations.js";
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
  // getIsWaterToday

  const handleEdit = (e) => {
    const elem = e.currentTarget;
    const id = elem.closest("li").id;
    console.log(id);
    dispatch(openEditModal({ _id, amount, date }));
  };

  const handleDelete = (e) => {
    const elem = e.currentTarget;
    const id = elem.closest("li").id;
    dispatch(deleteWaterToday(id));
  };

  return (
    <>
      <li className={css.item} id={item._id}>
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
