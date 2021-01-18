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
    const [BMR, setBMR] = useState(0);
    const [weightStatus, setWeightStatus] = useState("");
    const [idealWeight, setidealWeight] = useState(0);
    const [maintainenceCal, setmaintainenceCal] = useState(0);
    const clickedButtonStyle = {
        color : "#05386b",
        backgroundColor : '#5cdb95'
    }
    
    const changeInchesToCm = (feet, inches)=>{
        var totalInches = parseInt(inches) + (12*feet);
        var heightValue = 2.54*totalInches;
        return heightValue;
    }

    const mifflinSteor = ()=>{
        var heightValue = 0;
        if(!heightUnitToggle)heightValue = changeInchesToCm(feet, inches)
        else heightValue = height;
        if(male){
            setBMR((10*weight) + (6.25*heightValue) - (5*age) + 5)
        }else{  
            setBMR((10*weight) + (6.25*heightValue) - (5*age) - 165)
        }
    }
    const harrisBenedict = ()=>{
        var heightValue = 0;
        if(!heightUnitToggle)heightValue = changeInchesToCm(feet, inches)
        else heightValue = height;
        if(male){
            setBMR(((13.397*weight) + (4.799*heightValue) - (5.677*age) + 88.362).toFixed(0))
        }else{  
            setBMR(((9.247*weight) + (3.098*heightValue) - (4.330*age) + 447.593).toFixed(0))
        }
    }
    const onChangeHandler = (e)=>{
        if(e.target.id == "age")setage(e.target.value);
        else if(e.target.id == "weight")setweight(e.target.value);
        else if(e.target.id == "height")setheight(e.target.value);
        else if(e.target.id == "feet")setfeet(e.target.value);
        else if(e.target.id == "inches")setinches(e.target.value);
        if((height !== 0 && weight !==0)|| (height !== 0 && feet !== 0&& inches !==0)){
           
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
    useEffect(() => {
        var theArray = $('form').serialize().split("&");
        if(theArray[0].split("=")[1] === "0")setmaintainenceCal(1.2*BMR);
        else if(theArray[0].split("=")[1] === "1")setmaintainenceCal(1.37*BMR);
        else if(theArray[0].split("=")[1] === "2")setmaintainenceCal(1.46*BMR);
        else if(theArray[0].split("=")[1] === "3")setmaintainenceCal(1.55*BMR);
    }, [BMR]);

    const submitHandler2 = ()=>{
        
        var theArray = $('form').serialize().split("&");

        if(theArray[1].split("=")[1] === "1")harrisBenedict();
        else if(theArray[1].split("=")[1] === "0")mifflinSteor();
        console.log(BMR);
        if(theArray[0].split("=")[1] === "0")setmaintainenceCal(1.2*BMR);
        else if(theArray[0].split("=")[1] === "1")setmaintainenceCal(1.37*BMR);
        else if(theArray[0].split("=")[1] === "2")setmaintainenceCal(1.46*BMR);
        else if(theArray[0].split("=")[1] === "3")setmaintainenceCal(1.55*BMR);
    }

    const submitHandler1 = ()=>{
        var heightValue = 0;
        if(!heightUnitToggle)heightValue = changeInchesToCm(feet, inches)
        else heightValue = height;

        heightValue = heightValue / 100;
        
        setBMI((weightRef.current.value / Math.pow(heightValue,2)).toFixed(1)); 
        const currentBmi = (weightRef.current.value / Math.pow(heightValue,2)).toFixed(1);
        if(currentBmi < 18.5)setWeightStatus("Underweight")
        else if(currentBmi >= 18.5 && currentBmi <24.9)setWeightStatus("Normal Weight")
        else if(currentBmi>= 24.9 && currentBmi < 29.9)setWeightStatus("Overweight")
        else if(currentBmi>=  29.9)setWeightStatus("Obese")

        var hegihtInInches = heightValue*39.37;
        hegihtInInches = hegihtInInches - 60;

        if(male && hegihtInInches > 0)setidealWeight((52 + (1.9*hegihtInInches)).toFixed(0))
        else if(!male && hegihtInInches > 0)setidealWeight((49 + (1.7*hegihtInInches)).toFixed(0))
    }
    
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
                        <span id = "years"className = "units">Years</span>
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
                    <button onClick = {submitHandler1} className ="btn submit-button">Submit</button>
                </div>
                <div className="col BMICol">
                    {/* <BMICol BMI = {BMI} height = {height}  weight= {weight} age= {age} male = {male}/> */}
                    {BMI !== 0 && idealWeight!== 0 &&
                    <div className="BMI-class row">
                        <div className="col" style = {{textAlign : "center"}}>
                            <p id = "ur-bmi-text">Your BMI: {BMI}</p>
                            {/* <span className = "bmi-text">{BMI}</span> */}
                            <h4 className = "weight-status-and-ideal-weight" style = {{fontWeight : "650"}}>{weightStatus}</h4>
                        </div>
                        <div className="col" style = {{textAlign : "center"}}>
                            <p id = "ideal-weight">Ideal Weight Range</p>
                            <h4 className = "weight-status-and-ideal-weight" style = {{fontWeight : "650"}}>{idealWeight-5}-{parseInt(idealWeight)+5}Kg</h4>
                        </div>
                        
                    </div>}
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
                            <label id = "secondCheckbox"className="form-check">Harris-Benedict
                                <input type="radio"  name="formula" value="1" />
                                <span className="checkmark"></span>
                            </label>
                    </form>
                    <div className="BMI-class">
                        <p>Weight Target: </p>
                        <input autoComplete = "off" min = "0" id = "weight"onChange = {onChangeHandler} type="number" min = "0" />
                        <span onClick = {()=>setWeightUnitToggle(!weightUnitToggle)}  className = "units">{weightUnitToggle?"Kg":"Pd"}</span>
                    </div>
                   
                </div>
            </div>
            <div style = {{display : "block" ,textAlign : "center"}}>
                <button  onClick = {submitHandler2}className ="next-skip-button btn submit-button">Submit</button>
                <button  className ="next-skip-button btn submit-button">Skip</button>
                <button  className ="next-skip-button btn submit-button">Next</button>
                </div>
            
            {BMR === 0? null : <div style = {{textAlign : "center"}}>
                <p style = {{marginBottom : "0"}}>You need</p>
                <h3 style = {{fontWeight : "600"}}>{maintainenceCal.toFixed(1)} Calories/Day</h3>
                <p style = {{marginBottom : "0"}}>To maintain your Weight</p>
                </div>}
        </div>
     );
}
 
export default React.memo(TheForm);
