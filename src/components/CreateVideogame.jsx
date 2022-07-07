import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame } from "../actions";
import { getVideoGames } from "../actions";
import s from "./CreateVideogame.module.css";

export default function CreateVideogames() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const created = useSelector((state) => state.created);
  const platforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});
  const [disabled, setdisabled] = useState(true);
  const pattern = new RegExp(
    /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/
  ); //released

  const patternUrl = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: "",
    released: "",
    image: "",
    platforms: [],
    genres: [],
  });
  //console.log('en hacedor por fuera',created)
  const resetVideogame = (e) => {
    e.preventDefault();
    setInput({
      name: "",
      description: "",
      rating: "",
      released: "",
      image: "",
      platforms: [],
      genres: [],
    });
    
  };

  useEffect(() => {
    dispatch(getVideoGames());
    //console.log(created)
  }, [dispatch]);

  useEffect(() => {
    if (
      input.name === "" ||
      input.description === "" ||
      input.rating === "" ||
      pattern.test(input.released) === false ||
      patternUrl.test(input.image) === false ||
      input.platforms.length === 0 ||
      input.genres.length === 0
    ) {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
  }, [
    input.platforms,
    input.genres,
    input.name,
    input.description,
    input.rating,
    input.released,
    input.image,
  ]);

  function validate(post) {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    }
    if (!input.description) {
      errors.description = "Description is required";
    }
    if (
      !input.rating ||
      post.rating < 0 ||
      post.rating > 100 ||
      isNaN(post.rating)
    ) {
      errors.rating = "Required and must be a number between 0 and 100";
    }
    if (!input.released || pattern.test(input.released) === false) {
      errors.released = "Released is required and must be a valid date";
    }

    if (!input.image || patternUrl.test(input.image) === false) {
      errors.image = "Image is required and must be a valid url";
    }
    if (!input.platforms) {
      errors.platforms = "Platforms is required";
    }

    return errors;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") setdisabled(false);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(input)
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    // e.preventDefault();
    //console.log(e.target.value)
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      //console.log(e.target.value)
      //console.log(input.diets)
      return;
    }
    if (input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: input.genres.filter((genre) => genre !== e.target.value),
      });
      // console.log(input.diets)
      return;
    }
  };

  const handleSelect2 = (e) => {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postVideogame(input));
    resetVideogame(e);

    alert("¡Videogame created!");
  }
  function handleDelete(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platforms) => platforms !== e),
    });
  }

  return (
    <div className={s.container}>
    <div className={s.contenedorForm}>
      {created ? (
        setTimeout(() => {
          history.push(`/detail/${created}`);
        }, 2000)
      ) : (
        <div>
          <div className={s.center}>
            <button className={s.btnRegresar}>
              {" "}
              <Link to="/home">back</Link>
            </button>
          </div>
          <h1 className={s.h2}>Create Videogame</h1>
          <form className={s.formVideogame} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Videogame name:</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="text"
                value={input.name}
                name="name"
              />
              {errors.name && <p className={s.errorname}>{errors.name}</p>}
            </div>

            <div>
              <label>Description:</label>
              <textarea
                onChange={(e) => handleInputChange(e)}
                type="text"
                value={input.description}
                name="description"
              />
              {errors.description && (
                <p className={s.errorname}>{errors.description}</p>
              )}
            </div>

            <div>
              <label>Rating:</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                min="0"
                max="5"
                value={input.rating}
                name="rating"
              />
              {errors.rating && <p className={s.errorname}>{errors.rating}</p>}
            </div>

            <div>
              <label>Released:</label>
              <input
                onChange={(e) => handleInputChange(e)}
                placeholder="DD/MM/YYYY"
                type="text"
                value={input.released}
                name="released"
              />
              {errors.released && (
                <p className={s.errorname}>{errors.released}</p>
              )}
            </div>

            <div>
              <label>Image:</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="text"
                value={input.image}
                name="image"
              />
              {errors.image && <p className={s.errorname}>{errors.image}</p>}
            </div>

            <div>
              <div className={s.platform}>Select platforms</div> <br></br>
              <select onChange={(e) => handleSelect2(e)}>
                placeholder="Select platform"
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
              {input.platforms.length === 0 ? (
                <p className={s.errorname}>{"platform is required"}</p>
              ) : null}
              {input.platforms.map((el) => {
                return (
                  <div className={s.h3} key={el}>
                    <button onClick={() => handleDelete(el)}>x</button>
                    <p >{el}</p>
                  </div>
                );
              })}
            </div>

            <label>
              Select genre<br></br>
            </label>
            <div className={s.divCheck}>
              {genres?.map((el) => {
                return (
                  <div key={el}>
                    <input 
                      onChange={(e) => handleSelect(e)}
                      checked={input.genres.includes(el)} 
                      key={el}
                      type="checkbox"
                      value={el}
                    />
                    {el}
                  </div>
                );
              })}
            </div>

            {input.genres.length === 0 ? (
              <p className={s.errorname}>{"genre is required"}</p>
            ) : null}
            <div className={s.bottonsFinal}>
            <button className={s.btnSubmit} disabled={disabled} onClick={(e) => {}}>
              Submit
            </button>
            <button className={s.btnRegresar} onClick={(e) => resetVideogame(e)}>Reset form</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

{
  /* <div>
  {input.platforms.map((el) => {
    return(
    <div key={el}>
      <p>{el}</p>
      <button onClick={() => handleDelete(el)}>{el}</button>
    </div>);
  })}
</div> */
}
