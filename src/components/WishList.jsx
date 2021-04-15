import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import "../styles/wishlist.css"
import axios from "../axios"
import {useAuth} from "../contexts/AuthContext";
const data = require("../BooksJson.json")
const WishList = () => {
    const {currentEvent, currentUser,contentAdd,setEvent,currentEvent2,changeEventCal,breakfastCal,morningSCal,lunchCal,eveSCal,dinnerCal, changeDate} = useAuth();

    const [booksInWishList, setBooksInWishList] = useState()
    useEffect(() => {
        console.log(currentUser.email);
        axios.post('/SendWishlistInfo', {
            name : "asd",
            email: currentUser.email, 
            })
            .then((response) => {
                console.log(response.data);
                setBooksInWishList(response.data)
            }, (error) => {
            console.log(error);
            });
    }, []);
    return ( 
        <div className="wish-list">
            <Navbar />
            <div className="wishlist">
                {booksInWishList && booksInWishList.map((book)=>{
                    return (
                        <div className="individual-book">
                            <img src={book.url} />
                            <div>
                                <h3 id = "title">{book.title}</h3>
                                <h3 id = "author">{book.author}</h3>
                            </div>
                            <h3 className = "other-book-info-in-wish">{book.genre}</h3>
                            <h3 className = "other-book-info-in-wish">{book.type}</h3>
                            <h3 className = "other-book-info-in-wish">Rs. {book.price}</h3>
                            <button className = "btn">Add to Cart</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default WishList;