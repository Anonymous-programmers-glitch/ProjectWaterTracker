import css from "./TrackerBenefitsList.module.css";
export default function TrackerBenefitsList({ data }) {
  return (
    <>
      <h3>Tracker Benefits</h3>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <div className={css.item}>
                <div style={{ stroke: "blue" }}>{item.icon}</div>
                {item.text}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
