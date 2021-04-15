import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import {useTheme} from "../contexts/ThemeContext";
import "../styles/bookinfo.css"
import StarIcon from '@material-ui/icons/Star';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import {useAuth} from "../contexts/AuthContext";

import axios from "../axios"

const BookInfo = (props) => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,changeEventCal,breakfastCal,morningSCal,lunchCal,eveSCal,dinnerCal, changeDate} = useAuth();

    const {changeBook, book} = useTheme();
    var src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1337818095l/228665.jpg"
    const [stockStatus, setStockStatus] = useState(Math.floor(Math.random() * 21));
    const [message, setMessage] = useState("");
    const addToCartEvent = ()=>{
        // console.log(currentUser.email);
        axios.post('/AddToCart', {
            email: currentUser.email, 
            title: book.name
            })
            .then((response) => {
                setMessage("The Book Has been Added to the Cart")
            }, (error) => {
            console.log(error);
            });
    }
    const wishListEvent = ()=>{
        axios.post('/AddtoWishlist', {
            email: currentUser.email, 
            title: book.name
            })
            .then((response) => {
                setMessage("The Book Has been Added to the wishlist")
            }, (error) => {
            console.log(error);
            });
    }
    // console.log(book);
    return (  
        <div className="book-info">
            <Navbar />
            {book? 
            <div className="row">
                <div className=" book-img col col-md-6">
                    <img src={book.img} alt=""/>
                </div>
                <div className="book-information col col-md-6">
                    {message != ""?
                    <div class="alert alert-success" role="alert">
                        {message}
                    </div> : null}
                
                    <h1 id = "book-name">{book.name}</h1>
                    <div id = "book-ratings">{book.rating}<div id= "star-icon"><StarIcon/></div></div>
                    <h4 id = "book-author">{book.author}</h4>
                    <div id = "paperback-fantasy"><p>{book.type}</p><p>, {book.genre}</p></div>
                    {stockStatus > 10 ? <h6 id = "stock-staus">In Stock</h6>: (stockStatus > 0 ? <h6 id = "stock-staus">Only {stockStatus} Left in Stock </h6>:<h6 id = "stock-staus">Not in Stock</h6>)}
                    <h3 id = "book-price" >Rs. {book.price}</h3>
                    <div className="buttons">
                        {/* <button className = "btn buy-now">Buy Now</button> */}
                        <button onClick = {addToCartEvent} className = "btn">Add to Cart</button>
                        <button onClick = {wishListEvent} className = "btn">Wishlist</button>
                    </div>
                </div>
            </div>
            :null}
        </div>
    );
}
 
export default BookInfo;