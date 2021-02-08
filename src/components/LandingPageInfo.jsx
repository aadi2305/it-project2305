import React, { useState, useEffect } from 'react';
import "../styles/landingPageInfo.css"

const LandingPageInfo = (props) => {
    return ( 
        <div className="landing_page_info">
            {/* <p className = "landing_page_info_paragraph"></p>
            <h1 className = "step_headings">STEP ONE</h1>
            <div className="steps_right">
                    <img src="./formSS.png" alt=""/>
                    <p>With information like your weight and height we will tell you how much calories you need daily to maintain your weight and according to your target weight we will tell you how much calories you should consume.</p>
            </div>
            <h1 className = "step_headings">STEP TWO</h1>
            <div className="steps_left">
                    <p>Next you will be sent here. There are 5 different events from day you can click on any + button to add food. You can click on any events to see previously added food. You can click on Today button to open calendar. You can go to previous days and change food there</p>
                    <img src="./steptwoSS.png" alt=""/>
            </div> */}
             <p className = "asdflklj">Your weight depends on how many calories you eat on daily basis.
            So it is a must to COUNT the calories you eat if you want to increase/decrease your weight.</p>
            <div className="row">
                <div className="col-md-6 col-lg-4 ayeeee">
                    <p className = "step_header">Step 1</p>
                    <p className = "step_instructions">
                        Enter information like your weight, height, age and the weight you want to acheive. Using this information we will
                        give you the amount of calories you need to burn everyday to maintain your weight and calories you need to burn everyday to acheive your target weight
                    </p>
                </div>
                <div className="col-md-6 col-lg-4 ayeeee">
                    <p className = "step_header">Step 2</p>
                    <p className = "step_instructions">
                        Go to Dashboard. You'll see 5 meals of a day. BreakFast, Morning Snack, Lunch, Evening Snack, Dinner. You can click on any + button to Add food in
                        that meal. also you can Click on the meals to see any previous meals you added.     
                    </p>
                </div>
                <div className="col-md-12 col-lg-4">
                    <p className = "step_header">Step 3</p>
                    <p className = "step_instructions">
                        To search food, Enter the name of the food you just ate then you'll see it's complete information like the amount of protein that food has ,
                        according the amount of food you ate, Click on Add button to add that food    
                    </p>       
                </div>
            </div>
        </div>
     );
}
 
export default LandingPageInfo;