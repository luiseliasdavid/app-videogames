import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {  useDispatch } from "react-redux";
import { getVideoGames, orderAlphabetic } from "../actions";
import s from './LandingPage.module.css'



export default function LandingPage(){
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        
    dispatch(getVideoGames())
       
      }, []);


    return (
    // <div>{loading? <div>Loading...</div>: 
        <div>

            <h1>Welcom to videogames </h1>
            <Link to='/home'>
               <button className={s.btn}>ENTER</button>
            </Link>

        </div>


        // }</div>
    )
}

/*
    return ( 

        <div>

            <h1>Welcom to videogames </h1>
            <Link to='/home'>
               <button className={s.btn}>Ingresar</button>
            </Link>

        </div>
        )
}
*/

