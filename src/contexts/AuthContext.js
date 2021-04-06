import React, { useState, useEffect, createContext, useContext } from 'react';
import {auth} from "../firebase"

const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [formStatus, setFormStatus] = useState(false);
    const [contentAdd, setcontentAdd] = useState(false);
    const [currentEvent, setcurrentEvent] = useState("");
    const [currentEvent2, setcurrentEvent2] = useState("");
    const [breakfastCal, setbreakfastCal] = useState(0);
    const [morningSCal, setmorningSCal] = useState(0);
    const [lunchCal, setlunchCal] = useState(0);
    const [eveSCal, seteveSCal] = useState(0);
    const [dinnerCal, setdinnerCal] = useState(0);
    const [foodAdded, setFoodAdded] = useState(false);
    const [totalDailyCal, setTotalDailyCal] = useState(0);
    const [currentDate, setCurrentDate] = useState();

    const changeDate = (date)=>{
        setCurrentDate(date);
    }

    const changeEventCal = (cal, event, operation) =>{
        if(event === "Breakfast"){
            if(operation === "add")setbreakfastCal(breakfastCal + cal)
            else if(operation === "minus")setbreakfastCal(breakfastCal - cal)
            else if( operation=== "dateChanged")setbreakfastCal(cal)
        }
        else if(event === "Morning Snack"){
           
            if(operation === "add")setmorningSCal(morningSCal + cal)
            else if(operation === "minus")setmorningSCal(morningSCal - cal)
            else if( operation=== "dateChanged")setmorningSCal(cal)
            
        }
        else if(event === "Lunch"){
           
                if(operation === "add")setlunchCal(lunchCal + cal)
                else if(operation === "minus")setlunchCal(lunchCal - cal)
                else if( operation=== "dateChanged")setlunchCal(cal)
            
        }
        else if(event === "Evening Snack"){
           
                if(operation === "add")seteveSCal(eveSCal + cal)
                else if(operation === "minus")seteveSCal(eveSCal - cal)
                else if( operation=== "dateChanged")seteveSCal(cal)
            
        }
        else if(event === "Dinner"){
        
                if(operation === "add")setdinnerCal(dinnerCal + cal)
                else if(operation === "minus")setdinnerCal(dinnerCal - cal)
                else if( operation=== "dateChanged")setdinnerCal(cal)
            
        }
    }
    const changeTotalDailyCal = (cal) =>{
            setTotalDailyCal(cal);
    }
    const addToDailyCal = (cal) =>{
        setTotalDailyCal(totalDailyCal + cal);
    }
    const subToDailyCal = (cal) =>{
        setTotalDailyCal(totalDailyCal - cal);
    }

    const foodAddedHandler = ()=>{
        setFoodAdded(!foodAdded);
        // console.log("foodHandler changed");
    }

    const changeBf = (list)=>{
        // setbreakfastInfo(list)
    }
    const addContent = () =>{
        setcontentAdd(!contentAdd);
    }
    
    const setEvent = (event) =>{
        if(event === currentEvent)setcurrentEvent("")
        else setcurrentEvent(event);
    }
    const setEvent2 = (event) =>{
        if(event === currentEvent2)setcurrentEvent2("")
        else setcurrentEvent2(event);
    }

    const changeFormStatus = ()=>{
        setFormStatus(!formStatus);
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        signup,
        login,
        updatePassword,
        updateEmail,
        resetPassword,
        logout,
        currentUser,
        changeFormStatus,
        formStatus,
        setEvent,
        currentEvent,
        contentAdd,
        addContent,
        currentEvent2,
        setEvent2,
        // changeBf,
        // breakfastinfo,
        foodAddedHandler,
        foodAdded,
        totalDailyCal,
        changeTotalDailyCal,
        addToDailyCal,
        subToDailyCal,
        changeEventCal,
        breakfastCal,
        morningSCal,
        lunchCal,
        eveSCal,
        dinnerCal,
        changeDate,
        currentDate
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider >
    );
}