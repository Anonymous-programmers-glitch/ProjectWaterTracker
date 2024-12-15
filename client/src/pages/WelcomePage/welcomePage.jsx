import TrackerBenefitsList from "../../components/WelcomePage/TrackerBenefitsList/TrackerBenefitsList.jsx";
import {
  trackerBennefits,
  whyDrinkWater,
} from "../../tempData/welcomePagedata.jsx";
import WhyDrinkWaterList from "../../components/WelcomePage/WhyDrinkWaterList/WhyDrinkWaterList.jsx";
import css from "./welcomePage.module.css";
import Button from "../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigateTo = useNavigate();
  const handleRedirect = () => navigateTo("/signup");
  return (
    <section className={css.welcomePage}>
      <div className={css.background}></div>
      <div>
        <div className={css.titleBox}>
          <h1 className={css.title}>Water consumption tracker</h1>
          <p className={css.subTitle}>Record daily water intake and track</p>
        </div>
        <TrackerBenefitsList data={trackerBennefits} />
        <Button onClick={handleRedirect} cssstyle="trytracker">
          Try tracker
        </Button>
      </div>
      <WhyDrinkWaterList data={whyDrinkWater} />
    </section>
  );
}
