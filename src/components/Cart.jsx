import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import "../styles/wishlist.css"
import axios from "../axios"
import { Book } from '@material-ui/icons'
import {useAuth} from "../contexts/AuthContext";

const data = require("../BooksJson.json")
const WishList = () => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,changeEventCal,breakfastCal,morningSCal,lunchCal,eveSCal,dinnerCal, changeDate} = useAuth();

    const [booksInCart, setBooksInCart] = useState()
    const [Total, setTotal] = useState(0)
    useEffect(() => {
        console.log(currentUser.email);
        axios.post('/SendCartInfo', {
            name : "asd",
            email: currentUser.email, 
            })
            .then((response) => {
                console.log(response.data);
                setBooksInCart(response.data)
            }, (error) => {
            console.log(error);
            });
    }, []);
    useEffect(() => {
        if(booksInCart){
            var total = 0;
            for(var i = 0 ; i < booksInCart.length ; i++){
                total += booksInCart[i].Price;
            }
            setTotal(total);
        }
        
    }, []);
    const removeEvent = (title) =>{
        axios.post('/RemoveFromCart', {
            title : title,
            email: currentUser.email, 
            })
            .then((response) => {
                console.log(response);
            }, (error) => {
            console.log(error);
            });
    }
    const orderNowHandler = ()=>{
        if(booksInCart){
            for(var i = 0; i <booksInCart.length ; i++ ){
                axios.post('/AddToOrderedList', {
                    title : booksInCart[i].title,
                    email: currentUser.email, 
                    })
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                    console.log(error);
                    });
            }
        }
        
        
    }
    return ( 
        <div className="wish-list">
            <Navbar />
            <div className="wishlist">
                {booksInCart && booksInCart.map((book)=>{
                    return (
                        <div  className="individual-book">
                            <img src={book.url} />
                            <div>
                                <h3 id = "title">{book.title}</h3>
                                <h3 id = "author">{book.author}</h3>
                            </div>
                            <h3 className = "other-book-info-in-wish">{book.genre}</h3>
                            <h3 className = "other-book-info-in-wish">{book.type}</h3>
                            <h3 className = "other-book-info-in-wish">Rs. {book.price}</h3>
                            <button onClick = {()=>{
                                removeEvent(book.title)
                            }} className = "btn">Remove</button>
                        </div>
                    )
                })}
                <div className="reciept">
                    <h1>Total :  Rs. {Total}</h1>
                    <h1>Delivery Fee :  Rs. 100</h1>
                    <h1>Total Payable Amout:  Rs. {Total + 100}</h1>
                    <button onClick = {orderNowHandler} className = "btn">Order Now</button>
                </div>
            </div>
            
        </div>
    );
}
 
export default WishList;