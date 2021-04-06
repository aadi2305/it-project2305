import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Mainbody from "./Mainbody"
import "../styles/dashboard.css"
import {useTheme} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
const Dashboard = () => {

    const [othermode, setotherMode] = useState("Dark");
    const [userInfo, setUserInfo] = useState();
    const {currentUser,currentDate, currentEvent, currentEvent2, setEvent, addContent,foodAddedHandler,foodAdded,addToDailyCal, changeEventCal} = useAuth();
    const {currentTheme, updateTheme} = useTheme();

    // useEffect(() => {
    //     if(currentUser){
    //         axios.post("/getUserHealthInfo", {
    //             email : currentUser.email
    //         }).then(res=>{
    //             setUserInfo(res.data)
    //         },err=>{
    //             console.log(err);
    //         })
    //     }
    // }, []);
    

    const modeChange = ()=>{
        if(currentTheme === "dark"){
            setotherMode("Dark");
            updateTheme("light");
        }
        else if(currentTheme === "light"){
            setotherMode("Light");
            updateTheme( "dark");
        }
    }
    //console.log(CurrentTheme);
    return ( 
        <div className={"dashboard-"+currentTheme}>
            <div className={"dashboard dashboard-"+currentTheme}>
                <Navbar modeChange = {modeChange} mode = {othermode}/>
                <div className="mainbody_clss"><Mainbody /></div>
                
            </div>
            <div className="footar">
                <p className = "footer_created_by" >Created By Vivekanand Mogali</p>
                <div className="social_media_icons">
                    <a href="https://www.linkedin.com/in/vivekanand-mogali-389226191/"><div className="social_media_icon"><LinkedInIcon style={{ fontSize: 40 }} /></div></a>
                    <a href="https://github.com/aadi2305"><div className="social_media_icon"><GitHubIcon style={{ fontSize: 36, marginLeft : "20px" }} /></div></a>
                    <a href="https://www.fiverr.com/share/2AD4jr" style = {{display : "flex", alignItems : "center", textDecoration : "none"}}><div className="fiverrr">fiverr</div></a>
                
                </div>

            </div>
        </div>

     );
}
 
export default Dashboard;