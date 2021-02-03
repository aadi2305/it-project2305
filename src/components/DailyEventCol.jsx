import React, { useState, useEffect } from 'react';
import DailyEventComponent from "./DailyEventComponent"
import DailyEventInfo from "./DailyEventInfo";
import $ from "jquery";
import SlideToggle from "react-slide-toggle";
import {useAuth} from "../contexts/AuthContext"
import axios from "../axios";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
const DailyEventCol = (props) => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,changeEventCal,breakfastCal,morningSCal,lunchCal,eveSCal,dinnerCal, changeDate} = useAuth();
    const [breakfastinfo, setbreakfastInfo] = useState();
    const [userInfo, setUserInfo] = useState();
    const [morningSinfo, setmorningSInfo] = useState();
    const [lunchinfo, setlunchInfo] = useState();
    const [eveSinfo, seteveSInfo] = useState();
    const [dinnerinfo, setdinnerInfo] = useState();
    const [selectedDate, setSelectedDate] = React.useState(new Date().toDateString());
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date.toDateString());
    };

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/info`; 
        history.push(path);
    }

    useEffect(() => {
    axios.post("/getUserInfo", {
        email : currentUser.email,
        date : selectedDate
    }).then(res=>{
        if(currentEvent2 === "Breakfast"){
            setbreakfastInfo(res.data.breakfast);
        }
        else if(currentEvent2 === "Morning Snack"){
            
            setmorningSInfo(res.data.morningSnack);
        }
        else if(currentEvent2=== "Lunch"){
            setlunchInfo(res.data.lunch);
        }
        else if(currentEvent2 === "Evening Snack"){
            seteveSInfo(res.data.eveningSnack);
        }
        else if(currentEvent2 === "Dinner"){
            setdinnerInfo(res.data.dinner);
        }
    },err=>{
        console.log(err);
    })
    
    }, [currentEvent2,selectedDate]);

    useEffect(() => {
        axios.post("/getUserInfo", {
            email : currentUser.email,
            date : selectedDate
        }).then(res=>{
            setUserInfo(res.data);
            var totalCalories = 0;
            res.data.breakfast.forEach(element => {
                totalCalories += element.calories
            });
            changeEventCal(totalCalories, "Breakfast", "dateChanged");
            totalCalories = 0;

            res.data.morningSnack.forEach(element => {
                totalCalories += element.calories
            });
            changeEventCal(totalCalories, "Morning Snack", "dateChanged");
            totalCalories = 0;

            res.data.lunch.forEach(element => {
                totalCalories += element.calories
            });
            changeEventCal(totalCalories, "Lunch", "dateChanged");
            totalCalories = 0;

            res.data.eveningSnack.forEach(element => {
                totalCalories += element.calories
            });
            changeEventCal(totalCalories, "Evening Snack", "dateChanged");
            totalCalories = 0;

            res.data.dinner.forEach(element => {
                totalCalories += element.calories
            });
            changeEventCal(totalCalories, "Dinner", "dateChanged");

        },err=>{
            console.log(err);
        })
        
    }, [selectedDate]);
    useEffect(() => {
        changeDate(selectedDate)
    }, [selectedDate]);
    
    // console.log(userInfo.dailyData.total);

    
    const deleteFood = (food)=>{
        if(currentEvent2 === "Breakfast"){
            var list = breakfastinfo
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].food === food){
                    if (i > -1) {
                        list.splice(i, 1);
                        setbreakfastInfo(list);
                    }
                }
            }
        }
        else if(currentEvent2 === "Morning Snack"){
            var list = morningSinfo
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].food === food){
                    if (i > -1) {
                        list.splice(i, 1);
                        setmorningSInfo(list);
                    }
                }
            }
        }
        else if(currentEvent2=== "Lunch"){
            var list = lunchinfo
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].food === food){
                    if (i > -1) {
                        list.splice(i, 1);
                        setlunchInfo(list);
                    }
                }
            }
        }
        else if(currentEvent2 === "Evening Snack"){
            var list = eveSinfo
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].food === food){
                    if (i > -1) {
                        list.splice(i, 1);
                        seteveSInfo(list);
                    }
                }
            }
        }
        else if(currentEvent2 === "Dinner"){
            var list = dinnerinfo
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].food === food){
                    if (i > -1) {
                        list.splice(i, 1);
                        setdinnerInfo(list);
                    }
                }
            }
        }
    }
    return ( 
        <div className="">
             <div className="daily_cal"> 
               
                <button className = "btn daily_cal_date" onClick={() => setIsOpen(true)}>{selectedDate === new Date().toDateString()? "Today":selectedDate}</button>
                <div className="calorie_eaten_info">
                    <h2>{props.eatenCal} of {props.reqCal} Cal Eaten</h2>
                    <div onClick = {()=>{
                        props.infoHandler()
                    }}>
                        <InfoIcon className = "infoIcon">Details</InfoIcon>
                    </div>
                </div>
                <div className="range-container">
                    <div style = {{width : props.percentageCal+"%"}} className="absolute-range"></div>
                    <div className="range"></div>
                </div>
                <div style = {{position : "relative"}}>
                    {/* <h2 style = {{position : "absolute", marginTop : "20px"}}></h2> */}
                    <div style = {{opacity : "0", position : "absolute"}}>
                        
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item>
                                <KeyboardDatePicker
                                open={isOpen}
                                onOpen={() => setIsOpen(true)}
                                onClose={() => setIsOpen(false)}
                                margin="normal"
                                // variant="inline"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                views={['year', 'month', 'date']}
                                value={selectedDate}
                                format="dd/MM/yyyy"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
            </div> 
            <div className="daily_events">

            <div className = "toggleEvent">
            <SlideToggle collapsed >
            {({ toggle, setCollapsibleElement }) => (
                <div style = {{flex : "1"}}   className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Breakfast" calEaten= {Math.ceil(breakfastCal) + " of 609 Cal"}/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo deleteFood = {deleteFood} info = {breakfastinfo} className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
            <AddIcon onClick = {(e)=>{
            setEvent("Breakfast");
        }} className = "addIcon"/>
            </div>


            <div className = "toggleEvent">
            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div style = {{flex : "1"}}  className="my-collapsible">
                <div  className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Morning Snack" calEaten= {Math.ceil(morningSCal) +" of 2609 Cal"}/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo deleteFood = {deleteFood} info = {morningSinfo} className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
            <AddIcon onClick = {(e)=>{
            setEvent("Morning Snack");
        }}className = "addIcon"/>
            </div>

            <div className = "toggleEvent">
            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div style = {{flex : "1"}}   className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Lunch"calEaten= {Math.ceil(lunchCal) +" of 609 Cal"}/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo deleteFood = {deleteFood} info = {lunchinfo} className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
            <AddIcon onClick = {(e)=>{
            setEvent("Lunch");
        }}className = "addIcon"/>
            </div>


            <div className = "toggleEvent">
            <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement }) => (
                <div style = {{flex : "1"}}   className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent event = "Evening Snack"calEaten= {Math.ceil(eveSCal) + " of 609 Cal"}/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo deleteFood = {deleteFood} info = {eveSinfo} className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
            <AddIcon onClick = {(e)=>{
            setEvent("Evening Snack");
        }}className = "addIcon"/>
            </div>


            <div className = "toggleEvent">
            <SlideToggle collapsed >
            {({ toggle, setCollapsibleElement }) => (
                <div style = {{flex : "1"}}  className="my-collapsible">
                <div className="my-collapsible__toggle" onClick={toggle}>
                <DailyEventComponent  event = "Dinner"calEaten= {dinnerCal + " of 609 Cal"}/>
                </div>
                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div className="my-collapsible__content-inner"><DailyEventInfo deleteFood = {deleteFood} info = {dinnerinfo} className = "breakfast"/></div>
                </div>
                </div>
            )}
            </SlideToggle>
            <AddIcon onClick = {(e)=>{
            setEvent("Dinner");
        }}className = "addIcon"/>
            </div>
            </div>
        </div>
     );
}
 
export default DailyEventCol;