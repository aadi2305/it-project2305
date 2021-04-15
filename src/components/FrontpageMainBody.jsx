import {Redirect} from "react-router-dom"
import React, { useState, useEffect } from 'react'
import BookCard from "./BookCard";
import "../styles/frontPageMainBody.css"
import SearchBar from "./SearchBar"
import {useTheme} from "../contexts/ThemeContext";
import axios from "../axios"
const FrontpageMainBody = () => {
    const {changeBook, book} = useTheme();
    const [cardClicked, setCardClicked] = useState(false);
    const [books, setBooks] = useState([]);
 
    useEffect(() => {
        var data;
        axios.get('/AllBooks')
          .then((response) => {
            setBooks(response.data)
          }, (error) => {
            console.log(error);
          });
    }, []);

    const genreChange = (genre)=>{
        axios.post('/SearchByGenre', {
              genre: genre
            })
            .then((response) => {
                setBooks(response.data)
            }, (error) => {
              console.log(error);
            });
    }
    const submitHandler = (value)=>{
        console.log(value);
        axios.post('/Search', {
            title: value
          })
          .then((response) => {
                setBooks(response.data)
                console.log(response.data);
          }, (error) => {
            console.log(error);
          });
    }
    return ( 
        <div className = "frontpage-mainbody">
            {cardClicked ? <Redirect to = "/bookInfo" /> : null}
            <SearchBar genreChange = {genreChange} submitHandler = {submitHandler}/>
            <div className="row">
                {books.length > 1 && books.map((book)=>{
                   return( 
                   <div  className="col col-md-3" onClick = {()=>{
                        changeBook({name : book.title,
                                    img : book.url,
                                author : book.author,
                                rating : book.rating,
                                price : book.price,
                                type : book.paperType,
                                genre : book.genre
                                });
                        setCardClicked(true);
                    }}>
                        <BookCard name = {book.title} 
                            image = {book.url}
                            price = {book.price}
                            author = {book.author}
                        />
                    </div>)
                })} 
                {typeof(books) == "object" ? 
                <div  className="col col-md-3" onClick = {()=>{
                    changeBook({name : books.title,
                                img : books.url,
                            author : books.author,
                            rating : books.rating,
                            price : books.price,
                            type : books.paperType,
                            genre : books.genre
                            });
                    setCardClicked(true);
                }}>
                    <BookCard name = {books.title} 
                        image = {books.url}
                        price = {books.price}
                        author = {books.author}
                    />
                </div> : null}  
            </div>
            
           
        </div>
    );
}
 
export default FrontpageMainBody;