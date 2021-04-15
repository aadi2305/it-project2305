import React, { useState, useEffect } from 'react'
const BookCard = (props) => {
    return ( 
        <div>
            <div className="book-card">
                <div id = "img"><img src={props.image} /></div>
                <p id = "book-name">{props.name}</p>
                <p>{props.author}</p>
                <p>Rs. {props.price}</p>
            </div>
        </div>
    );
}
 
export default BookCard;