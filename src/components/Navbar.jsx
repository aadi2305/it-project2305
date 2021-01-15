import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';


const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [showToggleBtn, setshowToggleBtn] = useState(false);
    console.log("rendered...");
    useEffect(() => {
        console.log("aye");
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
                    <button className = "btn">Log in</button>
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
                        <button className = "btn dropdown-item">Log in</button>
                    </ul>
                </div>
                :null}
    
            </nav>

     );
}
 
export default Navbar;