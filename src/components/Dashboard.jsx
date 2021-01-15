import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Mainbody from "./Mainbody"
import "../styles/dashboard.css"


const Dashboard = () => {
    return ( 
        <div className="dashboard">
            <Navbar />
            <Mainbody />
            
        </div>
     );
}
 
export default Dashboard;