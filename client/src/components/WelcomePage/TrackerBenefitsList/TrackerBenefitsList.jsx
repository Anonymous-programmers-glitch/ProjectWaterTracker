import css from "./TrackerBenefitsList.module.css";
export default function TrackerBenefitsList({ data }) {
  return (
    <>
      <h3 className={css.titleList}>Tracker Benefits</h3>
      <ul className={css.list}>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <div className={css.item}>
                <div className={css.icon}>{item.icon}</div>
                {item.text}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
