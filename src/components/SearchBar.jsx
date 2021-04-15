import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import axios from "../axios"
const SearchBar = (props) => {
    // var theArray = $('.formboy').serialize().split("&");
    // console.log(theArray);
    const [inputValue, setInputValue] = useState("");
    const submitHandler = (e)=>{
        e.preventDefault();
        props.submitHandler(inputValue);
    }
    const changeHandler = e =>{
        setInputValue(e.target.value)
    }
    return ( 
        <div className="search-bar">
                <input onChange = {changeHandler} type="text"/>
                <div onClick = {()=>props.submitHandler(inputValue)} className="search-icon"><SearchIcon /></div>
            
            <div clasNames="dropdown">
                <button className = "btn"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Genre
                </button>
        
                <form name = "genre-form" className="dropdown-menu genre-menu" aria-labelledby="dropdownMenuButton">
                    <a onClick = {()=>props.genreChange("Fantasy")} value = "1"  className="dropdown-item" href="#">Fantasy</a>
                    <a onClick = {()=>props.genreChange("Self help")} value = "2" className="dropdown-item" href="#">Self Help</a>
                    <a onClick = {()=>props.genreChange("Non Fiction")} value = "3" className="dropdown-item" href="#">Non Fiction</a>
                    <a onClick = {()=>props.genreChange("Fiction")} value = "4" className="dropdown-item" href="#">Fiction</a>
                    <a onClick = {()=>props.genreChange("Biography")}  value = "5" className="dropdown-item" href="#">Biography</a>
                </form>
            </div>
        </div>
     );
}
 
export default SearchBar;