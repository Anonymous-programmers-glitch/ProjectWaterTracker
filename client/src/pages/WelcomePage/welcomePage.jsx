import TrackerBenefitsList from "../../components/WelcomePage/TrackerBenefitsList/TrackerBenefitsList.jsx";
import {
  trackerBennefits,
  whyDrinkWater,
} from "../../tempData/welcomePagedata.jsx";
import WhyDrinkWaterList from "../../components/WelcomePage/WhyDrinkWaterList/WhyDrinkWaterList.jsx";
import css from "./welcomePage.module.css";

export default function WelcomePage() {
  return (
    <section className={css.welcomePage}>
      <h1>Water consumption tracker</h1>
      <h2>Record daily water intake and track</h2>
      <TrackerBenefitsList data={trackerBennefits} />
      <WhyDrinkWaterList data={whyDrinkWater} />
    </section>
  );
}
