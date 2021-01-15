import React, { useState, useEffect, useRef } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Mainbody = () => {

    const [passwordShow, setpasswordShow] = useState(false);
    const [error, setError] = useState("");
    const passoword = useRef(null);
    const confirmPassoword = useRef(null);

    const showPassword = (e)=>{
        if(document.getElementById("password").type === "text")document.getElementById("password").type = "password";
        else if(document.getElementById("password").type === "password")document.getElementById("password").type = "text";
        setpasswordShow(!passwordShow);
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        if(passoword.current.value !== confirmPassoword.current.value){
            setError("Password Do Not Match")
        }
    }
    return ( 
        <div className="mainbody container-fluid">
            <div className="row">
                <div className="col">
                    <h1 className = "h1">Count Those Calories</h1>
                </div>
                <div className="col aye">
                    <form onSubmit = {submitHandler}className = "signUpForm">
                        {error?
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div> 
                        :null}
                        <input type="text" placeholder = "Your Name"/>
                        <input type="email" placeholder = "Email Address"/>
                        <div className = "aye2">
                            <input type="password" id = "password"ref = {passoword}placeholder = "Password"/>
                            {!passwordShow ? 
                                <VisibilityOffIcon onClick = {showPassword} id = "visibility-off-icon" />:
                                <VisibilityIcon onClick = {showPassword} id = "visibility-icon" />
                            }
                            
                        </div>
                        <input type="password" ref= {confirmPassoword}placeholder = "Confirm Password"/>
                        <button className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Mainbody;