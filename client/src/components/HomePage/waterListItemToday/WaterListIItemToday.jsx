import { useDispatch } from "react-redux";
import { deleteWater } from "../../../redux/waterToday/waterTodayslice.js";
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
  const { id, volumeOfWater, time } = item;

  const handleDelete = () => {
    dispatch(deleteWater(id));
  };

  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <li className={css.item}>
      <div className={css.leftcontent}>
        <div className={css.watericon}>
          <GlassOfWater size={size} />
        </div>
        <p className={css.volumewater}>{volumeOfWater} mL</p>
        <p className={css.time}>{time}</p>
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
