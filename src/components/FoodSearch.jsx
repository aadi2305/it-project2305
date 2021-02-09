import React, { useState, useEffect, useRef } from 'react';
import "../styles/foodsearch.css"
import SearchIcon from '@material-ui/icons/Search';
import axios1 from "axios";
import axios from "../axios"
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import {useAuth} from "../contexts/AuthContext";
import $ from "jquery"

const FoodSearch = (props) => {

    const [searchValue, setsearchValue] = useState();
    const [food, setFood]= useState();
    const [grams, setgrams]= useState(0);
    const [oneGramprotein, setProtein] = useState(0);
    const [oneGramcarbs, setCarbs] = useState(0);
    const [oneGramfats, setFats] = useState(0);
    const [oneGramCals, setCals] = useState(0);
    const [Currentprotein, setCurrentProtein] = useState(0);
    const [Currentcarbs, setCurrentCarbs] = useState(0);
    const [Currentfats, setCurrentFats] = useState(0);
    const [CurrentCals, setCurrentCals] = useState(0);
    const [unitValue, setUnitValue] = useState(0);
    const {currentUser,currentDate, currentEvent, currentEvent2, setEvent, addContent,foodAddedHandler,foodAdded,addToDailyCal, changeEventCal} = useAuth();
    const [error, seterror] = useState("")
    const [success, setSuccess] = useState("");
    const [unitNumber, setUnitNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [headerIterator, setHeaderIterator] = useState(0);
    const [header, setHeader] = useState({
        "x-app-id": "d98335d7",
        "x-app-key": "77117116fe8c06aa921644dfc7026397"
    });
    
    const headerArray = [{"x-app-id": "d98335d7","x-app-key": "77117116fe8c06aa921644dfc7026397"},{"x-app-id": "9aa033cb","x-app-key": "c5abaa4382558e3d2a6c30a31f2b5fe7"}]
    const gramsArray = [1,2,3,4,5,10,20,30,40,50,100,150,200,250,300,350,400,450,500,600,700,800,900,1000];
    const unitsArray = ["grams", "cups", "bowls", "milliliters", ""];
    
    // console.log(currentEvent);
    const onChangeHandler = (e)=>{
        setsearchValue(e.target.value);
        setFood();
    }

    useEffect(() => {
        seterror("");
        setSuccess("");
    }, [currentEvent]);

    useEffect(() => {
        setUnitNumber(gramsArray[grams])
    }, [grams]);

    useEffect(() => {
        setLoading2(true);
        var data = {
            "query" : unitNumber +"  "+ searchValue + " " + unitsArray[$('.units').serialize().split("=")[1]]
        }
        if(searchValue){
        axios1(                                                                                                                                                                                                                                                   
        {                                                                                                                                                                                                                                                        
        method:'post',                                                                                                                                                                                                                                          
        url:"https://trackapi.nutritionix.com/v2/natural/nutrients",                                                                                                                                                                                           
        data:data,                                                                                                                                                                                                                                             
        headers:header                                                                                                                                                                                                                                                      
        }).then((res)=>{
            setLoading2(false);
            setFood(res.data.foods[0])
            setCurrentCals(res.data.foods[0].nf_calories);
            setCals(res.data.foods[0].nf_calories);
            setCurrentFats(res.data.foods[0].nf_total_fat);
            setFats(res.data.foods[0].nf_total_fat);
            setCurrentCarbs(res.data.foods[0].nf_total_carbohydrate);
            setCarbs(res.data.foods[0].nf_total_carbohydrate);
            setCurrentProtein(res.data.foods[0].nf_protein);
            setProtein(res.data.foods[0].nf_protein);
        },(err)=>{
            if(headerIterator === 0){
                setHeaderIterator(1);
                setHeader(headerArray[1]);
            }else if(headerIterator === 1){
                setHeaderIterator(0);
                setHeader(headerArray[2]);
            }
            console.log(err);
        })
        }
    }, [unitValue]);

    
    const submitHandler = (e)=>{
        setSuccess("");
        seterror("");
        // setLoading(true);
        if(currentEvent === ""){
            e.preventDefault();
            seterror("Please Click on any + Icon");
        }else{
        setgrams(0);
        
        e.preventDefault();
        setLoading(true);
        var data = {
            "query" : unitNumber +"  "+ searchValue + " grams" 
        }
        axios1(                                                                                                                                                                                                                                                   
        {                                                                                                                                                                                                                                                        
        method:'post',                                                                                                                                                                                                                                          
        url:"https://trackapi.nutritionix.com/v2/natural/nutrients",                                                                                                                                                                                           
        data:data,                                                                                                                                                                                                                                             
        headers:header                                                                                                                                                                                                                                                    
        }).then((res)=>{
            setLoading(false);
            setLoading2(false);
            setFood(res.data.foods[0])
            setCurrentCals(res.data.foods[0].nf_calories);
            setCals(res.data.foods[0].nf_calories);
            setCurrentFats(res.data.foods[0].nf_total_fat);
            setFats(res.data.foods[0].nf_total_fat);
            setCurrentCarbs(res.data.foods[0].nf_total_carbohydrate);
            setCarbs(res.data.foods[0].nf_total_carbohydrate);
            setCurrentProtein(res.data.foods[0].nf_protein);
            setProtein(res.data.foods[0].nf_protein);
        },(err)=>{
            // seterror(capitaliseFirstLetter(searchValue) + " Is Not Available")
            seterror("Try Again")
            if(headerIterator === 0){
                setHeaderIterator(1);
                setHeader(headerArray[1]);
            }else if(headerIterator === 1){
                setHeaderIterator(0);
                setHeader(headerArray[2]);
            }
            setLoading(false);
            console.log(err);
        })}
        
    }
    const capitaliseFirstLetter = word=>{
        var list = word.split(" ");
        for(var i = 0; i< list.length ; i++){
            list[i] = list[i].slice(0,1).toUpperCase() + list[i].slice(1,list[i].length);
        }
        word = ""
        list.forEach(element => {
            word = word + element + " ";
        });
        return word;
    }
    
    // console.log(gramsArray[grams] +"  "+ searchValue + " " + unitsArray[$('.units').serialize().split("=")[1]]);
    const addIcon = ()=>{
        setgrams(grams + 1)
    }
    const removeIcon = ()=>{
        if(grams !== 0)setgrams(grams - 1)
        
    }
    // console.log(oneGramCals);
    useEffect(()=>{
        if(unitNumber === ""){
            setCurrentCals(Math.round(((oneGramCals*0))*100)/100);
            setCurrentFats(Math.round(((oneGramfats*0))*100)/100);
            setCurrentCarbs(Math.round(( (oneGramcarbs*0))*100)/100);
            setCurrentProtein(Math.round(((oneGramprotein*0))*100)/100);
        }
        else{setCurrentCals(Math.round(((oneGramCals*unitNumber))*100)/100);
        setCurrentFats(Math.round(((oneGramfats*unitNumber))*100)/100);
        setCurrentCarbs(Math.round(( (oneGramcarbs*unitNumber))*100)/100);
        setCurrentProtein(Math.round(((oneGramprotein*unitNumber))*100)/100);}
    },[grams, unitNumber])

    const inputChange = (e)=>{
        // console.log(e.target.value);
        setUnitNumber(e.target.value);
    }
    // console.log(searchValue);
    const addHandler = ()=>{
        axios.post("/addFood", {
            date : currentDate,
            event: currentEvent,
            email : currentUser.email,
            food : capitaliseFirstLetter(searchValue),
            calories : CurrentCals,
            fats : Currentfats,
            protein : Currentprotein,
            carbs : Currentcarbs,
            quantity : gramsArray[grams]
        }).then(res=>{
            console.log(res);
        },err=>{
            console.log(err);
        })
        setSuccess(capitaliseFirstLetter(searchValue) + " has been added to "+ currentEvent);
        // setEvent("");
        setsearchValue("");
        setFood();
        addContent();
        addToDailyCal(CurrentCals);
        changeEventCal(CurrentCals, currentEvent, "add");
    }
    return ( 
        <div className="big-food-search">
            {error ? 
            <div class="alert alert-danger" role="alert">
                {error}
            </div>:null}
            {success ? 
            <div class="alert alert-success" role="alert">
                {success}
            </div>:null}
            <p className = "foodsearch_event">{currentEvent}</p>
            <div className="food-search">
                <form onSubmit = {submitHandler} className="input-div">
                    <input onChange = {onChangeHandler}value = {searchValue} type="text" placeholder = "Enter Your Food..."/>
                    <button className = "btn searchIcon" type="submit"><SearchIcon/></button>
                </form>
                {food ?
                <div className="food">
                    <div className="row">
                        <div className="col">
                            
                            <h1 className="hone">{capitaliseFirstLetter(searchValue)}</h1>
                        </div>
                        <div className="col food_cals">
                            {loading2 ?<h4>Loading...</h4>:<h4>{Math.round(CurrentCals)} Cals</h4>}
                            <p>{$('.units').serialize().split("=")[1] != 4 ?unitNumber + " " + unitsArray[$('.units').serialize().split("=")[1]] : unitNumber + " " + capitaliseFirstLetter(searchValue) }</p>
                        </div>
                    </div>
                    <div className="units-counts">
                        <AddCircleRoundedIcon onClick = {addIcon} className = "addButtonIcon"/>
                        <input onChange = {inputChange} type="number" value = {unitNumber} />
                        <select onClick = {()=>{
                            if(unitValue !== $('.units').serialize().split("=")[1])setUnitValue( $('.units').serialize().split("=")[1])
                        }} name = "units" className ="form-control units" id="exampleFormControlSelect1">
                            <option value = "0">Grams</option>
                            <option value = "1">Cup</option>
                            <option value = "2">Bowl</option>
                            <option value = "3">mL</option>
                            <option value = "4">{capitaliseFirstLetter(searchValue)}</option>
                        </select>
                        <RemoveCircleRoundedIcon onClick = {removeIcon} className = "addButtonIcon"/>
                    </div> 
                    <div className="row macros">
                        <div className="col text-align-center macros_inner_div">
                            {loading2 ? <p>Loading...</p> : <p>{Currentprotein} gm</p>}
                            <h1 className="hone">Protein</h1>
                        </div>
                        <div className="col text-align-center macros_inner_div">
                            {loading2 ? <p>Loading...</p> : <p>{Currentcarbs} gm</p>}
                            <h1 className="hone">Carbs</h1>
                        </div>
                        <div className="col text-align-center macros_inner_div">
                            {loading2 ? <p>Loading...</p> : <p>{Currentfats} gm</p>}
                            <h1 className="hone">Fats</h1> 
                        </div>
                    </div>
                    <div className = "add-button">
                        <button onClick = {()=>{
                            addHandler();    
                        }} className = "btn">Add</button>
                    </div>
                </div>
                
                :null
                }
            </div>
            {loading ? <p className = "foodsearch_event" style = {{textAlign : "center"}}>Loading...</p>:null}
        </div>
     );
}
 
export default FoodSearch;