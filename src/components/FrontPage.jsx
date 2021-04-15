import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import FrontpageMainBody from "./FrontpageMainBody"

const FrontPage = () => {
    return ( 
        <div className = "front-page">
            <Navbar />
            <FrontpageMainBody />
        </div>
    );
}
 
export default FrontPage;