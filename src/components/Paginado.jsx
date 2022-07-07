import React from "react"
import s from "./Paginado.module.css"

export default function Paginado({videogamesPerPage,allVideogames,paginado,}) {
    const pageNumbers= []
    
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={s.PagContainer}>
           
            <ul className={s.PagContainer}>
                {
                    pageNumbers?.map(number=>{
                        return(
                            
                        <button className="number" key={number}>
                            
                            <a  onClick={()=> paginado(number)}>{number}</a>
                        </button>)
                    })
                }

            </ul>
        </nav>
    )
}
