import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import {useTheme} from "../contexts/ThemeContext";
import "../styles/mainplatform.css"

const Mainplatform = () => {

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

    return ( 
        <div className={"mainplatform dashboard-"+currentTheme}>
            <Navbar modeChange = {modeChange} mode = {othermode}/>
        </div>
     );
}
 
export default Mainplatform;