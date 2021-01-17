import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Mainbody from "./Mainbody"
import "../styles/dashboard.css"
import {useTheme} from "../contexts/ThemeContext";

const Dashboard = () => {

    const [othermode, setotherMode] = useState("Dark");
    
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
    //console.log(CurrentTheme);
    return ( 
        <div className={"dashboard dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
            <Mainbody />
            
        </div>
     );
}
 
export default Dashboard;