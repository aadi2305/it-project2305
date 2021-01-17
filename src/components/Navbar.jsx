import React, { useState, useEffect } from 'react';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {useTheme} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";


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
                <h1 class="titleName" href="#">Calorix</h1>
                {showToggleBtn ? null:
                <div className = "navbar-list">
                    <p>Home</p>
                    <p>Princing</p>
                    <p>Download</p>
                    <button onClick = {(e)=>{
                            e.preventDefault();
                            if(currentUser)logout();
                            else changeLoginStatus();
                            }}  className = "btn">{currentUser? "Log Out":!loginStatus?"Log In":"Sign Up"}</button>
                    <button onClick = {()=>{
                        props.modeChange();
                    }} className = "btn">{props.mode} Mode</button>
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
                        <li><a className="dropdown-item" href="#">Home</a></li>
                        <li><a className="dropdown-item" href="#">Princing</a></li>
                        <li><a className="dropdown-item" href="#">Download</a></li>
                        <button onClick = {(e)=>{
                            e.preventDefault();
                            if(currentUser)logout();
                            else changeLoginStatus();
                            }}  className = "btn dropdown-item">{currentUser? "Log Out":!loginStatus?"Log In":"Sign Up"}</button>
                        <button onClick = {()=>{
                        props.modeChange();
                        }} className = "btn dropdown-item">{props.mode} Mode</button>
                    </ul>
                </div>
                :null}
    
            </nav>

     );
}
 
export default Navbar;