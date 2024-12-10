import GlassOfWater from "../../ui/icons/GlassOfWater.jsx";
import PencilSquareOutline from "../../ui/icons/PencilSquareOutline.jsx";
import TrashOutline from "../../ui/icons/TrashOutline.jsx";
import css from "./waterlistitem.module.css";

function WaterListIItem({ item }) {
  const { volumeOfWater, time } = item;
  return (
    <li className={css.item}>
      <div className={css.leftcontent}>
        <div className={css.watericon}>
          <GlassOfWater size="26" />
        </div>
        <p className={css.volumewater}>{volumeOfWater} mL</p>
        <p className={css.time}>{time}</p>
      </div>
      <div className={css.rightcontent}>
        <div className={css.pencilicon}>
          <PencilSquareOutline size="16" />
        </div>
        <div className={css.trashicon}>
          <TrashOutline size="16" />
        </div>
      </div>
    </li>
  );
}

export default WaterListIItem;
