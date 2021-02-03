import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import {useTheme} from "../contexts/ThemeContext";
import FoodSearch from "./FoodSearch"
import DailyEventCol from "./DailyEventCol";
import "../styles/mainplatform.css"
import axios from "../axios"
import {useAuth} from "../contexts/AuthContext"
import Info from "./Info";

const Mainplatform = () => {

    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,foodAddedHandler,foodAdded,totalDailyCal,changeTotalDailyCal, currentDate} = useAuth();
    const [othermode, setotherMode] = useState("Dark");
    const [reqCal, setReqCal] = useState(2210);
    const [info, setInfo] = useState(false);
    const [percentageCal, setpercentageCal] = useState(0);
    const {currentTheme, updateTheme} = useTheme();
    const [userInfo, setUserInfo] = useState();
   

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
        axios.post("/getUserInfo", {
            email : currentUser.email,
            date : currentDate
        }).then(res=>{
            setUserInfo(res.data);
            changeTotalDailyCal(res.data.totalCal);
        },err=>{
            console.log(err);
        })
        
    }, [currentDate]);
   const infoHandler = ()=>{
        setInfo(!info);
   }
    useEffect(() => {
        if((totalDailyCal/reqCal)*100 > 98)setpercentageCal(98);
        else setpercentageCal((totalDailyCal/reqCal)*100);
    }, [totalDailyCal]);
    return ( 
        <div className={"mainplatform dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <div className={" mainplatform_row row mainplatform-"+currentTheme}>
                 
                <div className="daily_events_col col col-12 col-sm-12 col-md-12 col-lg-6  col-xl-6">
                    <DailyEventCol infoHandler = {infoHandler}  reqCal = {reqCal} eatenCal = {Math.round(totalDailyCal * 100) / 100} percentageCal = {percentageCal}/>
                </div>
                <div className="food_search col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    {info? <Info theme = {currentTheme} />: <FoodSearch />}
                </div>
            </div>
            
        </div>
     );
}
 
export default Mainplatform;