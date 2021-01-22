import React, { useState, useEffect } from 'react';
import DailyEventComponent from "./DailyEventComponent"
import DailyEventInfo from "./DailyEventInfo";
import $ from "jquery";
import SlideToggle from "react-slide-toggle";
const DailyEventCol = (props) => {
   
    return ( 
        <div className="">
             <div className="daily_cal"> 
                <h2>{props.eatenCal} of {props.reqCal} Cal eaten</h2>
                <div className="range-container">
                    <div style = {{width : props.percentageCal+"%"}} className="absolute-range"></div>
                    <div className="range"></div>
                </div>
            </div> 
            <div className="daily_events">
            <SlideToggle collapsed >
            {({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Breakfast" calEaten= "86 of 609 Cal"/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>

            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Morning Snack"calEaten= "86 of 609 Cal"/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>

            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Lunch"calEaten= "86 of 609 Cal"/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>

            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Evening Snack"calEaten= "86 of 609 Cal"/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>

            <SlideToggle collapsed >
            {({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent  event = "Dinner"calEaten= "86 of 609 Cal"/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
                
               
                
                {/* <DailyEventInfo className = "panel"/> */}
                
                {/* <DailyEventInfo className = "panel"/> */}
                
                {/* <DailyEventInfo className = "panel"/> */}
                
                {/* <DailyEventInfo className = "panel"/> */}
            </div>
        </div>
     );
}
 
export default DailyEventCol;