import React from "react";
import s from "./Card.module.css";
export default function Card({ name, image, genres,stores }) {
  return (
    <div >
      <h3 className={s.titVideogame}>{name}</h3>
      <img
        src={
          image
            ? image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2179Fg5v2lpdpnLz5wIxNRqExZwFgXFeS_A&usqp=CAU"
        }
        alt="imagen not found"
        width="350px"
        height="200px"
      />
      <div className={s.subcontainer}>
       
        <h3>Genres:</h3>
        {genres ? (
          genres.map((item, index) => {
            return (
              <p className={s.p} key={index} >
                {item}
              </p>
            );
          })
        ) : (
          <p className={s.p}>No hay generos</p>
        )}
      </div>
    </div>
  );
}

/*
<div >
{genre? genres.map((item,index)=>{
  <p  key={index}>{item}</p> 
 
}):<p>No hay generos</p>}
</div>
*/
