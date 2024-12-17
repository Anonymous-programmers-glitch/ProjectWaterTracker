import { ThreeDots } from "react-loader-spinner";
import css from "./SuspenseFallback.module.css";

export default function SuspenseFallback() {
  return (
    <div className={css.wraper}>
      <div className={css.box}>
        <h3 className={css.text}>Loading</h3>

        <div className={css.loader}>
          <ThreeDots
            visible={true}
            height="50"
            width="40"
            color="#407bff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </div>
  );
}
