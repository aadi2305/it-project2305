import React, { useState, useEffect } from 'react';
import {useAuth} from "../contexts/AuthContext"
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const DailyEventComponent = (props) => {

    const {setEvent2} = useAuth();
    return ( 
        <div onClick = {()=>{
            setEvent2(props.event);
        }} className="dailyEventComponent">
            <h5>{props.event}</h5>
            <div className = "cal-eaten">
                <h6 >{props.calEaten}</h6>
            </div>
        </div>
     );
}
 
export default DailyEventComponent;