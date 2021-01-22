import React, { useState, useEffect, useRef } from 'react';
import "../styles/foodsearch.css"
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import $ from "jquery"
const FoodSearch = (props) => {

    const [searchValue, setsearchValue] = useState("pohe");
    const [food, setFood]= useState([""]);
    const [grams, setgrams]= useState(0);
    const [oneGramprotein, setProtein] = useState(0.5);
    const [oneGramcarbs, setCarbs] = useState(0.5);
    const [oneGramfats, setFats] = useState(0.5);
    const [oneGramCals, setCals] = useState(0.5);
    const [Currentprotein, setCurrentProtein] = useState(0.5);
    const [Currentcarbs, setCurrentCarbs] = useState(0.5);
    const [Currentfats, setCurrentFats] = useState(0.5);
    const [CurrentCals, setCurrentCals] = useState(0.5);
    const [unitValue, setUnitValue] = useState(1);
    const [event, setevent] = useState("Breakfast");    

    const onChangeHandler = (e)=>{
        setsearchValue(e.target.value);
    }
    const submitHandler = (e)=>{
        setgrams(0)
        e.preventDefault();
        var data = {
            "query" : searchValue + " 1 gram"
        }
        axios(                                                                                                                                                                                                                                                   
        {                                                                                                                                                                                                                                                        
        method:'post',                                                                                                                                                                                                                                          
        url:"https://trackapi.nutritionix.com/v2/natural/nutrients",                                                                                                                                                                                           
        data:data,                                                                                                                                                                                                                                             
        headers:{                                                                                                                                                                                                                                              
            "x-app-id": "d98335d7",
            "x-app-key": "77117116fe8c06aa921644dfc7026397"                                                                                                                                                                                                               
            }                                                                                                                                                                                                                                                      
        }).then((res)=>{
            // console.log(res.data.foods[0]);
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
            console.log(err);
        })
        
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
    const gramsArray = [1,2,3,4,5,10,20,30,40,50,100,150,200,250,300,350,400,450,500,600,700,800,900,1000]
    const addIcon = ()=>{
        setgrams(grams + 1)
    }
    const removeIcon = ()=>{
        if(grams !== 0)setgrams(grams - 1)
        
    }
    useEffect(()=>{
        
        setCurrentCals(Math.round(((oneGramCals*gramsArray[grams]))*100)/100);
        setCurrentFats(Math.round(((oneGramfats*gramsArray[grams]))*100)/100);
        setCurrentCarbs(Math.round(( (oneGramcarbs*gramsArray[grams]))*100)/100);
        setCurrentProtein(Math.round(((oneGramprotein*gramsArray[grams]))*100)/100);
        
    },[grams])
    // console.log($(".units").serialize());
    const inputChange = (e)=>{
        console.log(e.target.value);
    }
    return ( 
        <div className="big-food-search">
            <p className = "event">{event}</p>
            <div className="food-search">
                <form onSubmit = {submitHandler} className="input-div">
                    <input onChange = {onChangeHandler} type="text" placeholder = "Enter Your Food..."/>
                    <button className = "btn" type="submit"><SearchIcon/></button>
                </form>
                {food ?
                <div className="food">
                    <div className="row">
                        <div className="col">
                            
                            <h1 className="hone">{capitaliseFirstLetter("pohe")}</h1>
                        </div>
                        <div className="col food_cals">
                            <h4>{CurrentCals} Cals</h4>
                            <p>{gramsArray[grams]} gms</p>
                        </div>
                    </div>
                    <div className="units-counts">
                        <AddCircleRoundedIcon onClick = {addIcon} className = "addButtonIcon"/>
                        <input onChage = {inputChange} type="number" value = {gramsArray[grams  ]} />
                        <select name = "units" class="form-control units" id="exampleFormControlSelect1">
                            <option value = "0">Grams</option>
                            <option value = "1">Cup</option>
                            <option value = "2">Bowl</option>
                            <option value = "3">mL</option>
                            <option value = "4">{food.food_name}</option>
                        </select>
                        <RemoveCircleRoundedIcon onClick = {removeIcon} className = "addButtonIcon"/>
                    </div> 
                    <div className="row macros">
                        <div className="col text-align-center">
                            <p>{Currentprotein} gm</p>
                            <h1 className="hone">Protein</h1>
                        </div>
                        <div className="col text-align-center">
                            <p>{Currentcarbs} gm</p>
                            <h1 className="hone">Carbs</h1>
                        </div>
                        <div className="col text-align-center">
                            <p>{Currentfats} gm</p>
                            <h1 className="hone">Fats</h1> 
                        </div>
                    </div>
                    <div className = "add-button">
                        <button className = "btn">Add</button>
                    </div>
                </div>
                
                :null}
            </div>
        </div>
     );
}
 
export default FoodSearch;