import TrackerBenefitsList from "../../components/WelcomePage/TrackerBenefitsList/TrackerBenefitsList.jsx";
import {
  trackerBennefits,
  whyDrinkWater,
} from "../../tempData/welcomePagedata.jsx";
import WhyDrinkWaterList from "../../components/WelcomePage/WhyDrinkWaterList/WhyDrinkWaterList.jsx";
import css from "./welcomePage.module.css";
import Button from "../../components/ui/Button/Button.jsx";

export default function WelcomePage() {
  return (
    <section className={css.welcomePage}>
      <div className={css.titleBox}>
        <h1 className={css.title}>Water consumption tracker</h1>
        <p className={css.subTitle}>Record daily water intake and track</p>
      </div>
      <TrackerBenefitsList data={trackerBennefits} />
      <Button>Try tracker</Button>
      <WhyDrinkWaterList data={whyDrinkWater} />
    </section>
  );
}