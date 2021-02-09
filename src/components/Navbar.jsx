import React, { useState, useEffect } from 'react';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {useTheme} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";
import { Link, Redirect} from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Navbar = (props) => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,changeEventCal,breakfastCal,morningSCal,lunchCal,eveSCal,dinnerCal, changeDate} = useAuth();

    const {changeLoginStatus, loginStatus} = useTheme();
    const{ logout} = useAuth();
    const [dashboardClick, setDashboardClick] = useState(false);
    const [profileClick, setprofileClick] = useState(false);
    const yooo = window.location.href.split("/")[window.location.href.split("/").length-1];
    if(yooo === "")console.log("hurray");
    const [backArrowClicked, setBackArrowClicked] = useState(false);
    var bool = false
    if(window.innerWidth < 1000)bool = true;
    const [showToggleBtn, setshowToggleBtn] = useState(bool);
    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 1000)setshowToggleBtn(true);
            else{setshowToggleBtn(false)}
        }
        window.addEventListener('resize', handleResize)
    });

    return ( 
            <nav className="navbar">
                {dashboardClick && <Redirect to = "/dashboard" />}
                {profileClick && <Redirect to = "/form" />}
                {(yooo === "foodSearch" || yooo === "info") && 
                <div onClick = {()=>{
                    setBackArrowClicked(true);
                }} className = "navbar_back_arrow">
                <ArrowBackIcon />
                </div>
                }
                {backArrowClicked? <div>{setEvent("")}<Redirect to = "/dashboard"/></div>: null}
                <h1 onClick ={()=>window.location.href ="/"} style = {{cursor : "pointer"}} class="titleName" href="#">Calorix</h1>
                {showToggleBtn ? null:
                <div className = "navbar-list">
                    <p style = {{cursor : "pointer"}} onClick ={()=>window.location.href ="/"} >Home</p>
                    {yooo !== ""?<p style = {{cursor : "pointer"}} onClick = {()=>setDashboardClick(true)}>Dashboard</p>:<p style = {{cursor : "pointer"}}onClick = {()=>alert("Please Login First")}>Dashboard</p>}
                    {yooo !== ""?<p style = {{cursor : "pointer"}} onClick = {()=>setprofileClick(true)}>Profile</p>:<p style = {{cursor : "pointer"}} onClick = {()=>alert("Please Login First")}>Profile</p>}
                   <button onClick = {()=>{
                        props.modeChange();
                    }} className = "btn">{props.mode} Mode
                    </button>
                    <button onClick = {(e)=>{
                            e.preventDefault();
                            if(currentUser){
                                logout();
                                window.location.href = "/";
                            }
                            else changeLoginStatus();
                            }}  className = "btn">{currentUser? "Log Out":!loginStatus?"Log In":"Sign Up"
                        }
                    </button>
                   
                </div>
                }
                
                
                {showToggleBtn?
                <div class="dropdown">
                    <ArrowDropDownCircleOutlinedIcon className="dropdown-toggle" 
                            id="dropdownMenuButton" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                        Dropdown button
                    </ArrowDropDownCircleOutlinedIcon>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href="/">Home</a></li>
                        {yooo !== ""?<li><a className="dropdown-item" onClick = {()=>setDashboardClick(true)}>Dashboard</a></li>:<li><a className="dropdown-item" onClick = {()=>alert("Please Login First")}>Dashboard</a></li>}
                        {yooo !== ""?<li><a className="dropdown-item" onClick = {()=>setprofileClick(true)}>Profile</a></li>:<li><a className="dropdown-item" onClick = {()=>alert("Please Login First")}>Profile</a></li>}
                        <button onClick = {()=>{
                        props.modeChange();
                        }} className = "dropdown-item">{props.mode} Mode</button>
                         <button onClick = {(e)=>{
                            e.preventDefault();
                            if(currentUser){
                                logout();
                                window.location.href = "/";
                            }
                            else changeLoginStatus();
                            }}  className = "dropdown-item">{currentUser? "Log Out":!loginStatus?"Log In":"Sign Up"
                            }
                        </button>
                    </ul>
                </div>
                :null}
    
            </nav>

     );
}
 
export default Navbar;