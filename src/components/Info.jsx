import React, { useState, useEffect } from 'react';
import {useAuth} from "../contexts/AuthContext"
import {useTheme} from "../contexts/ThemeContext";
import Navbar from "./Navbar"
import "../styles/info.css"
import axios from "../axios"

const Info = (props) => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,foodAddedHandler,foodAdded,totalDailyCal,changeTotalDailyCal, currentDate} = useAuth();
    const [loading, setLoading] = useState(true);
    const [protein, setProtein] = useState(0);
    const [fats, setFats] = useState(0);
    const [carbs, setCarbs] = useState(0);
    useEffect(() => {
        axios.post("/getUserInfo", {
            email : currentUser.email,
            date : currentDate
        }).then(res=>{
            var proteins = 0;
            var fatss = 0;
            var carbss = 0;
            setLoading(false);
            res.data.breakfast.forEach(element => {
                proteins += element.protein;
                fatss += element.fats;
                carbss += element.carbs;
            });
            res.data.eveningSnack.forEach(element => {
                proteins += element.protein;
                fatss += element.fats;
                carbss += element.carbs;
            });
            res.data.dinner.forEach(element => {
                proteins += element.protein;
                fatss += element.fats;
                carbss += element.carbs;
            });
            res.data.lunch.forEach(element => {
                proteins += element.protein;
                fatss += element.fats;
                carbss += element.carbs;
            });
            res.data.morningSnack.forEach(element => {
                proteins += element.protein;
                fatss += element.fats;
                carbss += element.carbs;
            });
            setProtein(proteins);
            setFats(fatss);
            setCarbs(carbss);
            console.log(proteins, fatss, carbss);
        },err=>{
            console.log(err);
        })
        
    }, [currentDate]);

    return ( 
        <div className={"info info-"+props.theme}>
            {loading?<h2>Loading...</h2>:
            <div className = "info">
                {console.log(props.theme)}
                <div className = "protein">
                    <h2 className = "macros_info">{Math.round(protein*100/100)} gms</h2>
                    <h2 className = "macros_name">Protein</h2>
                </div>
                <div className = "carbs">
                    <h2 className = "macros_info">{Math.round(carbs*100/100)} gms</h2>
                    <h2 className = "macros_name">Carbs</h2>
                </div>
                <div >
                    <h2 className = "macros_info">{Math.round(fats*100)/100} gms</h2>
                    <h2 className = "macros_name">Fats</h2>
                </div>
            </div>
            }
        </div>
     );
}
 
export default Info;