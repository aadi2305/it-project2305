import React, { useState, useEffect } from 'react';

const DailyEventComponent = (props) => {
    return ( 
        <div className="dailyEventComponent">
            <h5>{props.event}</h5>
            <h6 className = "cal-eaten">{props.calEaten}</h6>
        </div>
     );
}
 
export default DailyEventComponent;