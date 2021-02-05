import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Mainbody from "./Mainbody"
import "../styles/dashboard.css"
import {useTheme} from "../contexts/ThemeContext";
import axios from "../axios"
import { Redirect } from 'react-router-dom';
const Dashboard = () => {

    const [othermode, setotherMode] = useState("Dark");
    const [userInfo, setUserInfo] = useState();
    const {currentTheme, updateTheme} = useTheme();

    // useEffect(() => {
    //     if(currentUser){
    //         axios.post("/getUserHealthInfo", {
    //             email : currentUser.email
    //         }).then(res=>{
    //             setUserInfo(res.data)
    //         },err=>{
    //             console.log(err);
    //         })
    //     }
    // }, []);

    const modeChange = ()=>{
        if(currentTheme === "dark"){
            setotherMode("Dark");
        }
        else if(currentTheme === "light"){
            setotherMode("Light");
        }
        updateTheme();
    }
    //console.log(CurrentTheme);
    return ( 
        <div className={"dashboard dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <Mainbody />
            
        </div>
     );
}
 
export default Dashboard;