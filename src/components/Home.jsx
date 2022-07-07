import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginado from "./Paginado";
import {
  getVideoGames,
  filteredByGenre,
  filteredByCreated,
  orderByName,
  orderByRating,
  CleanAllVideogames,
  homeLoading,
  errorByName,
  getLocalVideoGames,
  

} from "../actions/index.js";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const Local = useSelector((state) => state.fullVideogames);
  const homeloading1 = useSelector((state) => state.homeLoading);
  const ErrorByName = useSelector((state) => state.errorByName);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setvideogamesPerPage] = useState(15);
  const [order, setOrder] = useState("");
  const [orderS, setOrderS] = useState("");

  const [abc,setAbc]= useState('aal')
  const[ratingorder,setRatingorder]=useState('luc')
  const[gamer,setGamer]=useState('game')
  const [generes,setGeneres]= useState('genres')

  const indexOfLastVideogame = currentPage * videogamesPerPage; //6
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //0
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  // const paginas = Math.ceil(allVideogames.length / videogamesPerPage);
  const paginas = Math.ceil(allVideogames.length / videogamesPerPage);

  // const [loading, setLoading] = useState(true);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 //console.log('error by name',ErrorByName)
 //console.log('home loading',homeloading1)
  useEffect(() => {
    // dispatch(getLocalVideoGames(Local)).then(() => {
    //   dispatch(homeLoading(false));
    //   console.log(Local)
    // });
    dispatch(getVideoGames()).then(() => {
      dispatch(homeLoading(false));
    });
  }, []);

  // useEffect(() => {
  //   dispatch(homeLoading(false));
  // }, [allVideogames]);
  
  
 
  
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(errorByName(0))
    dispatch(homeLoading(true));
    dispatch(CleanAllVideogames());

    dispatch(getVideoGames())
    .then(()=>{
      dispatch(homeLoading(false))
    })

    setRatingorder('luc')
    setAbc('aal')
   setGeneres('genres')
   setGamer('game')
   
   
    setCurrentPage(1);
  }

  function handleFilterGenres(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filteredByGenre(e.target.value));
    setGeneres(e.target.value)  
    setAbc('aal')
   setRatingorder('luc')
   setGamer('game')
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filteredByCreated(e.target.value));
    setGamer(e.target.value)
    setGeneres('genres')
    setAbc('aal')
    setRatingorder('luc')
  }

  function handleOrderChange(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Ordenado: ${e.target.value}`);
    setCurrentPage(1);
    setAbc(e.target.value)
    setGeneres('genres')
   setRatingorder('luc')
   setGamer('game')
  }
  function handleRatingChange(e) {
    e.preventDefault();
    //console.log(e.target.value)
    dispatch(orderByRating(e.target.value))

    setOrderS(`Ordenado: ${e.target.value}`);
    setCurrentPage(1);
    setRatingorder(e.target.value)
    setAbc('aal')
    setGeneres('genres')
    setGamer('game')
    
  }
  function handleNext(e) {
    e.preventDefault();
    if (currentPage < paginas) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrev(e) {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className={s.container}>
      <h1 className={s.titulo}>PI VIDEOGAMES</h1>

      <div>
        <button className={s.btn2}>
          <Link href={"/createVideogame"} to={"/createVideogame"}>
            Create videogame
          </Link>
        </button>
        <button className={s.btn2} onClick={(e) => handleClick(e)}>
          Reload Videogames
        </button>


        <select value={generes} className={s.select} onChange={(e) => handleFilterGenres(e)}>
          <option disabled value="genres" >Select by genres</option>
          {/* <option value="all videogames">All genres</option> */}
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Indie">Indie</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Srategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Plataformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Masiivesly Mlutiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>

        <select value={gamer} onChange={(e) => handleFilterCreated(e)}>
          <option disabled value="game">All videogames</option>
          {/* <option value="all">All videogames</option> */}
          <option value="true">Created videogames</option>
          <option value="false">Api videogames</option>
        </select>
        <select value={abc} onChange={(e) => handleOrderChange(e)}>
          <option disabled value="aal">Order alphabetical</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <select value={ratingorder} onChange={(e) => handleRatingChange(e)}>
          <option disabled value="luc">Score</option>
          <option value="asc">upward</option>
          <option value="desc">falling</option>
        </select>
        <br></br>
        <div className={s.PagContainer}>
          <SearchBar />
          <div className={s.prev}>
            <Paginado
              videogamesPerPage={videogamesPerPage}
              allVideogames={allVideogames.length}
              paginado={paginado}
              
            />
            <div>
              <button onClick={(e) => handleNext(e)}>{">>next"}</button>
              <button onClick={(e) => handlePrev(e)}>{"previus<<"}</button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      {/* { allVideogames.length<=0 ? <div className={s.loadd}> */}
      {homeloading1===true && ErrorByName===0 ? (
        <div className={s.loadd}>
          <h1>...and my video game?</h1>

          <img
            src="https://assets-global.website-files.com/61406347b8db463e379e2732/6170b5377b069c085b0991e5_ezgif-2-2260bc5d0d32.gif"
            alt="loading"
            height="500px"
          />
        </div>
      ) : null}
      { ErrorByName===1 || currentVideogame<1? (
        <div className={s.notFound}>
          <p>No videogame found</p>
          <img
            src="https://kib--m.carrd.co/assets/images/image04.gif?v=6380585a"
            alt="img"
            width="600px"
          />
        </div>
      ) : null}
      <div className={s.Card}>
      { allVideogames.length>0 ? ( 
     
                  currentVideogame.map((el, index) => {
            return (
              <div key={index}>
                <Link href={"/detail/" + el.id} to={"/detail/" + el.id}>
                  <Card image={el.image} name={el.name} genres={el.genres}  />
                </Link>
              </div>
           
            )})) : null}
        </div>


    </div>
  );
}

/*
https://i.blogs.es/e1feab/google-fotos/450_1000.jpg
*/
