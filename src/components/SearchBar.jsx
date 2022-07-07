import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { homeLoading, serchVideogameByName,searchState,CleanAllVideogames,errorByName } from '../actions'
import s from './SearchBar.module.css'

export default function SearchBar(){
const dispatch= useDispatch();
const [name,setName]= useState('')
const [disabled,setdisabled]= useState(true)



async function handleInputChange(e){
  e.preventDefault();
  setName(e.target.value)
     if(e.target.value.length>0){
  setdisabled(false)
    }else{
      setdisabled(true)
    }
 }

function handleSubmit(e){
  dispatch (errorByName(0))
  dispatch(CleanAllVideogames())
    //e.preventDefault()
    dispatch(searchState(true))
    dispatch(homeLoading(true))
    dispatch(serchVideogameByName(name))
     .then(()=>{
      dispatch(homeLoading(false))
    setName('')
    setdisabled(true)
    }
    )
  }
    


return(
    <div className={s.container}>
        <input 
        
        value={name}  // esto es para que tome el valor de name y se limpie despues del submit
        type='text'
        placeholder='Search by name'
        onChange={(e)=>handleInputChange(e)}
        />
        <button className={s.btn} id='ser' type='submit' disabled={disabled} onClick={(e)=>handleSubmit(e)}>
            Search
        </button>
    </div>
)
}
     