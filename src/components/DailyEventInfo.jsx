import React, { useState, useEffect } from 'react';
import axios from "../axios";
import {useAuth} from "../contexts/AuthContext";
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import RemoveIcon from '@material-ui/icons/Remove';
const DailyEventInfo = (props) => {
    const {currentEvent2, currentUser,contentAdd, foodAddedHandler, foodAdded,subToDailyCal, changeEventCal, currentDate} = useAuth();
    const [userInfo, setUserInfo] = useState(0);
    const [currentEventInfo, setCurrentEventInfo] = useState();
    const [loading, setLoading] = useState(true);

    const deleteHandler = (food)=>{
        console.log(food);
        axios.post("/deleteFood", {
            date : currentDate,
            email : currentUser.email,
            event : currentEvent2,
            food : food.food,
            cal : food.calories
        }).then(res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
        foodAddedHandler();
        subToDailyCal(food.calories);
        changeEventCal(food.calories, currentEvent2, "minus")
    }
    return ( 
        <div className="daily-event-info">
            {props.info ? (props.info.length === 0 ?
             <div className="daily-event-info-inner"> 
                <p>Please Add Food by Clicking on + Icon</p>
            </div> : 
            props.info.map((food)=>{
                return(
                    <div className="daily-event-info-inner">
                        <p>{food.food}</p>
                        {/* {console.log(foodAdded)} */}
                        <div>
                            <span>{food.calories} Cal</span>
                            <RemoveIcon onClick = {()=>{
                                deleteHandler(food);
                                props.deleteFood(food.food)
                            }} className = "removeIcon"/>
                        </div>
                    </div>
                );
            }) ):  <div className="daily-event-info-inner"> 
                        <p>Loading...</p>
                    </div>}
        </div>
     );
}
 
export default DailyEventInfo;