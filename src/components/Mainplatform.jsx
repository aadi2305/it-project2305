import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import {useTheme} from "../contexts/ThemeContext";
import FoodSearch from "./FoodSearch"
import DailyEventCol from "./DailyEventCol";
import "../styles/mainplatform.css"
import Calendar from 'react-calendar';

const Mainplatform = () => {

    const [othermode, setotherMode] = useState("Dark");
    const [reqCal, setReqCal] = useState(2210);
    const [eatenCal, setEatenCal] = useState(1200);
    const [percentageCal, setpercentageCal] = useState(0);
    const {currentTheme, updateTheme} = useTheme();

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
        if((eatenCal/reqCal)*100 > 98)setpercentageCal(98);
        else setpercentageCal((eatenCal/reqCal)*100);
    }, [eatenCal]);
    return ( 
        <div className={"mainplatform dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <div className={" mainplatform_row mainplatform-"+currentTheme}>
                 
                <div className="daily_events_col">
                    <DailyEventCol  reqCal = {reqCal} eatenCal = {eatenCal} percentageCal = {percentageCal}/>
                </div>
                <div className="food_search">
                    <FoodSearch />
                </div>
            </div>
            
        </div>
     );
}
 
export default Mainplatform;