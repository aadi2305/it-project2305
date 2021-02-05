import React, { useState, useEffect,useWindowSize } from 'react';
import Navbar from "./Navbar"
import {useTheme} from "../contexts/ThemeContext";
import FoodSearch from "./FoodSearch"
import DailyEventCol from "./DailyEventCol";
import "../styles/mainplatform.css"
import axios from "../axios"
import {useAuth} from "../contexts/AuthContext"
import Info from "./Info";
import { Redirect } from 'react-router-dom';

const Mainplatform = () => {

    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,foodAddedHandler,foodAdded,totalDailyCal,changeTotalDailyCal, currentDate} = useAuth();
    const [othermode, setotherMode] = useState("Dark");
    const [reqCal, setReqCal] = useState(2210);
    const [info, setInfo] = useState(false);
    const [percentageCal, setpercentageCal] = useState(0);
    const {currentTheme, updateTheme} = useTheme();
    const [userInfo, setUserInfo] = useState();

     
   
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
          width: undefined,
          height: undefined,
        });
      
        useEffect(() => {
          function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowSize;
      }

    const size = useWindowSize().width; 

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
        if(currentUser){
            axios.post("/getUserInfo", {
                email : currentUser.email,
                date : currentDate
            }).then(res=>{
                setUserInfo(res.data);
                changeTotalDailyCal(res.data.totalCal);
            },err=>{
                console.log(err);
            })
        }

    }, [currentDate, currentUser]);
   const infoHandler = ()=>{
        setInfo(!info);
   }
    useEffect(() => {
        if((totalDailyCal/reqCal)*100 > 95)setpercentageCal(96.5);
        else setpercentageCal((totalDailyCal/reqCal)*100);
    }, [totalDailyCal]);
    return ( 
        <div className={"mainplatform dashboard-"+currentTheme}>
            {size > 480 ? <Redirect to="/dashboard"/>:null}
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <div className={" mainplatform_row row mainplatform-"+currentTheme}>
                <div className="food_search col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    {info? <Info theme = {currentTheme} />: <FoodSearch />}
                </div>
             
            </div>
            
        </div>
     );
}
 
export default Mainplatform;