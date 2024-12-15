import { useState } from "react";
import css from './MyDailyNorma.module.css'

const MyDailyNorma = ({active, setActive}) => {

// send form
    const [formData, setFormData] = useState({
        weightInKg: '',
        loadInHours: '',
        waterYouDrink: '',
    });

// radio btn
    const [checked, setChecked] = useState();


    const handleChange = (e) => {
        setChecked(e.target.value);
      const {name, value} = e.target;
      setFormData((prevData)=>({
        ...prevData, [name]:value,
      }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        console.log('form:', formData, checked);
        
    }

    return (
        <form className={active ? css.modalContent.active : css.modalContent} onSubmit={handleSubmit} onClick={ () => setActive(false)}>
        <div className={css.modal}>
            <div className={css.modalSubmit}  onClick={e=>e.stopPropagation()}>
                <h1 className={css.text1}>My daily norma</h1>
                <button className={css.closeBtn} onClick={() => setActive(false)}>&times;</button>
                <div className={css.cover}>
                <h2 className={css.for}>For girl: </h2>
                <h3 className={css.formula}> V=(M*0,03) + (T*0,4)</h3>
                <h4 className={css.for}>For man:</h4>
                <h5 className={css.formula}>V=(M*0,04) + (T*0,6)</h5>
                </div>
                <div className={css.modalDescr}>
                * V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
                </div>
                <p className={css.textRadioBtn}>Calculate your rate:</p>
                
        <label>
          <input
          className={css.labelInput}
          type="radio"
          value="option1"
          name="option"
          checked={checked === "For wonam"}
          onChange={()=> setChecked("For wonam")}
          />
        For woman
        </label>

        <label>
          <input
          className={css.labelInput}
          type="radio"
          value="option2"
          name="option"
          checked={checked === "For man"}
          onChange={()=> setChecked("For man")}
          />
        For man
        </label>

        <p className={css.text}>Your weight in kilograms:</p>
        <input className={css.modalInput} value={formData.weightInKg} onChange={handleChange} placeholder="0" name="weightInKg" />
        <p className={css.text}>The time of active participation in sports or other activities with a high physical. load in hours:</p>
        <input className={css.modalInput} value={formData.loadInHours} onChange={handleChange} placeholder="0" name="loadInHours" />
        <p className={css.text}>The required amount of water in liters per day:</p>
        <p className="textRadioBtn">Write down how much water you will drink:</p>
        <input className={css.modalInput} value={formData.waterYouDrink} onChange={handleChange} placeholder="0" name="waterYouDrink" />

        <button className={css.submitBtn} type="submit">Save</button>
    </div>
    </div>
    </form>
    );
};

export default MyDailyNorma;