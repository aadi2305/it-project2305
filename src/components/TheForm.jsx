import React, { useState, useEffect, useRef } from 'react';
import Navbar from "./Navbar"
import BMICol from "./BMICol";
import {useTheme} from "../contexts/ThemeContext";
import "../styles/theForm.css";
import $ from "jquery";

const TheForm = () => {
    const {currentTheme, updateTheme} = useTheme();
    const [othermode, setotherMode] = useState("Dark");
    const [heightUnitToggle, setHeightUnitToggle] = useState(true);
    const [weightUnitToggle, setWeightUnitToggle] = useState(true);
    const [BMI, setBMI] = useState(0);
    const [male, setMale] = useState(null);
    const [weight, setweight] = useState(0);
    const [feet, setfeet] = useState(0);
    const [inches, setinches] = useState(0);
    const weightRef = useRef()
    const [weightTarget, setweightTarget] = useState(0);
    const [height, setheight] = useState(0);
    const [age, setage] = useState(0);

    const clickedButtonStyle = {
        color : "#05386b",
        backgroundColor : '#5cdb95'
    }

    
    const [BMR, setBMR] = useState(0);
    const mifflinSteor = ()=>{
        if(male){
            setBMR((10*weight) + (6.25*height) - (5*age) + 5)
        }else{  
            setBMR((10*weight) + (6.25*height) - (5*age) - 165)
        }
    }
    const onChangeHandler = (e)=>{
        if(e.target.id == "age")setage(e.target.value);
        else if(e.target.id == "weight")setweight(e.target.value);
        else if(e.target.id == "height")setheight(e.target.value);
        else if(e.target.id == "feet")setfeet(e.target.value);
        else if(e.target.id == "inches")setinches(e.target.value);
        if(height !== 0 && weight !==0){
            if(!heightUnitToggle){
                var totalInches = inches + (12*feet);
                var heightValue = 0.0254*totalInches;
            }else{
                var heightValue = height/ 100;
            }
            
            setBMI((weightRef.current.value / Math.pow(heightValue,2)).toFixed(1)); 
        }
        // console.log(e.target.id);
    }
    const modeChange = ()=>{
        if(currentTheme === "dark"){
            setotherMode("Dark");
        }
        else if(currentTheme === "light"){
            setotherMode("Light");
        }
        updateTheme();
    }
    //console.log($('form').serialize());
    return ( 
        <div className = {"the-form dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <div className={"row the-form-content the-form-"+currentTheme}>
                <div className="col infoTab1">
                    <div className="sex">
                        <button onClick = {()=>setMale(true)} id = "malebutton" className = {male? "btn clicked-button":"btn"}>Male</button>
                        <button onClick = {()=>setMale(false)} id = "femalebutton"className = {male === false? "btn clicked-button":"btn"}>Female</button>
                    </div>
                    <div className="age">
                        <p>Age: </p>
                        <input autoComplete = "off" id = "age"onChange = {onChangeHandler}type="number" min = "0"/>
                        <span className = "units">Years</span>
                    </div>
                    <div className="age">
                        <p>Height: </p>
                        {heightUnitToggle?
                        <input autoComplete = "off" id = "height" onChange = {onChangeHandler} type="number" min = "0" />:
                        <div className = "ftnIn-class">
                            <input autoComplete = "off" onChange = {onChangeHandler} className = "ftnIn" id = "feet"onChange = {onChangeHandler} type="number" min = "0" /><span className = "feetColon">'</span>
                            <input autoComplete = "off" onChange = {onChangeHandler} className = "ftnIn"id = "inches"onChange = {onChangeHandler} type="number" min = "0" /><span className = "feetColon">"</span>
                        </div>
                        }
                        <span onClick = {()=>setHeightUnitToggle(!heightUnitToggle)} className = "units">{heightUnitToggle?"CM":"Ft/In"}</span>
                    </div>
                    <div className="age">
                        <p>Weight: </p>
                        <input autoComplete = "off" id = "weight" ref = {weightRef} onChange = {onChangeHandler} type="number" min = "0" />
                        <span onClick = {()=>setWeightUnitToggle(!weightUnitToggle)}  className = "units">{weightUnitToggle?"Kg":"Pd"}</span>
                    </div>
                    {/* <button onClick = {submitHandler} className ="btn submit-button">Submit</button> */}
                </div>
                <div className="col BMICol">
                    {/* <BMICol BMI = {BMI} height = {height}  weight= {weight} age= {age} male = {male}/> */}
                    <div className="BMI-class row">
                        <div className="col" style = {{textAlign : "center"}}>
                            <p>Your BMI: {BMI}</p>
                            {/* <span className = "bmi-text">{BMI}</span> */}
                            <h4 style = {{fontWeight : "650"}}>Overweight</h4>
                        </div>
                        <div className="col" style = {{textAlign : "center"}}>
                            <p id = "ideal-weight">Ideal Weight Range</p>
                            <h4 style = {{fontWeight : "650"}}>62-76Kg</h4>
                        </div>
                        
                    </div>
                    <div class="form-group BMI-class">
                        <p for="exampleFormControlSelect1">Activity: </p>
                        <form>
                            <select name = "activity-form" class="form-control" id="exampleFormControlSelect1">
                                <option value = "0">Little or No exercise</option>
                                <option value = "1">Light: Excerise 1-3 time a week</option>
                                <option value = "2">Moderate: Exercise 4-5 times a week</option>
                                <option value = "3">Active: Daily Exercise or Intense workout 3-4 times a week</option>
                            </select>
                        </form>
                    </div>
                    <form  className="checkbox  BMI-class">
                            <p>BMR estimation formula:</p>
                           <label className="form-check">Mifflin-St Jeor (default)
                                <input type="radio" name="formula" value="0" checked/>
                                <span className="checkmark"></span>
                            </label>
                            <label id = "secondCheckbox"className="form-check">Katch-McArdle
                                <input type="radio"  name="formula" value="1" />
                                <span className="checkmark"></span>
                            </label>
                    </form>
                    <div className="BMI-class">
                        <p>Weight Target: </p>
                        <input autoComplete = "off" min = "0" id = "weight"onChange = {onChangeHandler} type="number" min = "0" />
                        <span onClick = {()=>setWeightUnitToggle(!weightUnitToggle)}  className = "units">{weightUnitToggle?"Kg":"Pd"}</span>
                    </div>
                    <button className ="btn submit-button">Submit</button>
                </div>
            </div>
        </div>
     );
}
 
export default React.memo(TheForm);