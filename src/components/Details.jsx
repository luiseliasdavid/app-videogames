import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDetail,
  CleanDetail,
  DeleteVideogame,
  UpdatePlatforms,
  getVideoGames,
} from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import s from "./Details.module.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true);
  const [noVideogame,setNoVideogame] = useState(false)
  const platforms = useSelector((state) => state.platforms);
  //console.log(detail);
  const [input, setInput] = useState({
    platforms: [],
  });

  useEffect(() => {
    dispatch(getDetail(id)).then(() => {
      setLoading(false);
    });
    return () => {
      dispatch(CleanDetail(id));
    };
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  function handleDelete(id) {
    dispatch(DeleteVideogame(id))
    .then(()=>{
     dispatch(getVideoGames())})
    .then(()=>{
      setNoVideogame(true) 
    })
      .then(() => {
        alert("Videojuego eliminado");
        
      })
    
  }
  const handleSelect2 = (e) => {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      return;
    }
    if (input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: input.platforms.filter(
          (platforms) => platforms !== e.target.value
        ),
      });

      return;
    }
  };

  function handleDelete2(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platforms) => platforms !== e),
    });
  }
  function handleUpdate(e) {
    e.preventDefault();
    dispatch(UpdatePlatforms(detail.id, input)).then(() => {
      setInput({ platforms: [] });
      dispatch(getDetail(detail.id));
      alert("Plataformas actualizadas");  
    });
  }

  return (
    <div> {noVideogame ? <div className={s.noVid}> <h1>deleted video game</h1>
     <Link to={"/home"}>
            <button className={s.link}>Back</button>{" "}
          </Link>
    </div> : 
    <div className={s.container}>
      <div className={s.container2}>
        <div className={s.cardContainer}>
          <Link to={"/home"}>
            <button className={s.link}>Back</button>{" "}
          </Link>
          {loading ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ajux_loader.gif/600px-Ajux_loader.gif?20201015223156"
              alt="loading"
            />
          ) : (
            <div>
              <h1 className={s.titVideogames}>{detail.name}</h1>
              <div className={s.subcontainer2}>
                <img
                  className={s.cardImage}
                  src={detail.image}
                  alt={detail.name}
                  width="300px"
                  height="350px"
                />

                <div className={s.id2}>
                  <div className={s.x}>
                    <strong> Rating: </strong>
                  </div>
                  <div className={s.x}>{detail.rating}</div>
                  <div className={s.x}>
                    <strong> Released:</strong>{" "}
                  </div>
                  <div className={s.x}>{detail.released}</div>
                  <div className={s.x}>
                    <strong> Platforms: </strong>{" "}
                  </div>
                  {detail.platforms.map((el) => el + ",")}
                  <div className={s.x}>
                    <strong> stores: </strong>{" "}
                  </div>
                  {detail.stores?.map((el) => el + ",")}

                  <div className={s.x}>
                    <strong>Genres: </strong>{" "}
                  </div>
                  <div className={s.x}>
                    {detail.genres.map((el) => el + ",")}
                  </div>
                  <div className={s.x}>
                    <strong> id: </strong>
                  </div>
                  <div className={s.x}>{detail.id}</div>
                </div>
              </div>
              <div className={s.id}>{detail.description}</div>

              {detail.createdInDb === true ? (
                <div>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Are you sure to delete this record?")
                      ) {
                        handleDelete(detail.id);
                      }
                    }}
                    className={s.link2}
                  >
                    Delete videogame
                  </button>
                </div>
              ) : null}
              {detail.createdInDb === true ? (
                <div className={s.update}>
                  <div>
                    <button className={s.link} onClick={(e) => handleUpdate(e)}>
                      Update Platforms
                    </button>
                    <select onChange={(e) => handleSelect2(e)}>
                      <option key={6598} value={platforms[0]}>
                        Platforms
                      </option>
                      {platforms?.map((el) => {
                        return (
                          <option key={el} value={el}>
                            {el}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {input.platforms.map((el) => {
                    return (
                      <div className={s.subcontainer2} key={el}>
                        <button
                          className={s.link}
                          onClick={() => handleDelete2(el)}
                        >
                          x
                        </button>
                        <p className={s.p}>{el}</p>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
    }</div>

  );
}
