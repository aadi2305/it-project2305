import React, { useState, useEffect } from 'react';


const BMICol = (props) => {
        const [BMR, setBMR] = useState(0);
    const mifflinSteor = ()=>{
        if(props.male){
            setBMR((10*props.weight) + (6.25*props.height) - (5*props.age) + 5)
        }else{
            setBMR((10*props.weight) + (6.25*props.height) - (5*props.age) - 165)
        }
    }
    
    return ( 
        <div className="BMICol">
            <div className="BMI-class">
                <p>Your BMI:</p>
                <p className = "bmi-text">{props.BMI}</p>
            </div>
            <div class="form-group BMI-class">
                <p for="exampleFormControlSelect1">Activity: </p>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>Little or No exercise</option>
                    <option>Light: Excerise 1-3 time a week</option>
                    <option>Moderate: Exercise 4-5 times a week</option>
                    <option>Active: Daily Exercise or Intense workout 3-4 times a week</option>
                </select>
            </div>
            <div className="checkbox">
                <p>BMR estimation formula:</p>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                    <label class="form-check-label" for="exampleRadios1">Mifflin-St Jeor (default)</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                    <label class="form-check-label" for="exampleRadios2">Katch-McArdle</label>
                </div>
            </div>
            <div className="BMI-class" style = {{visibility : "hidden"}}>
                <p>Your BMI:</p>
                <p className = "bmi-text">{props.BMI}</p>
            </div>
            <button className ="btn submit-button">Submit</button>
        </div>
     );
}
 
export default BMICol;