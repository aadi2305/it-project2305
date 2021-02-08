import React, { useState, useEffect } from 'react';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {useTheme} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";
import { Link} from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Navbar = (props) => {

    const {changeLoginStatus, loginStatus} = useTheme();
    const{currentUser, logout} = useAuth();

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
            <nav class="navbar">
                <div onClick = {()=>{
                    window.location.href = "/dashboard"
                }} className = "navbar_back_arrow">
                {window.location.href === "https://calorix.herokuapp.com/foodsearch" || window.location.href === "https://calorix.herokuapp.com/info"?<ArrowBackIcon />:null}
                </div>
                {console.log(window.location.href)}
                <h1 onClick ={()=>window.location.href ="/"} style = {{cursor : "pointer"}} class="titleName" href="#">Calorix</h1>
                {showToggleBtn ? null:
                <div className = "navbar-list">
                    <p style = {{cursor : "pointer"}} onClick ={()=>window.location.href ="/"} >Home</p>
                    <p style = {{cursor : "pointer"}} onClick = {()=>window.location.href ="/dashboard"}>Dashboard</p>
                    <p style = {{cursor : "pointer"}} onClick = {()=>window.location.href ="/form"}>Profile</p>
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
                        <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                        <li><a className="dropdown-item" href="/form">Profile</a></li>
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