import axios from 'axios'


export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_GENRES= 'GET_GENRES'
export const GET_DETAIL = 'GET_DETAIL'
export const POST_VIDEOGAME = 'GET_VIDEOGAME'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_GENRE = 'ORDER_BY_GENRE'
export const ORDER_BY_CREATED = 'ORDER_BY_CREATED'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const CLEAN_DETAIL_CREATED = 'CLEAN_DETAIL_CREATED'
export const HOME_LOADING = 'HOME_LOADING' 
export const CLEAN_All_VIDEOGAMES = 'CLEAN_All_VIDEOGAMES'
export const DELETE_VIDEOGAME= 'DELETE_VIDEOGAME'
export const UPDATE= 'UPDATE'
export const SEARCH_STATE= 'SEARCH_STATE'
export const ERROR_BY_NAME= 'ERROR_BY_NAME'
export const GET_LOCAL_VIDEOGAMES= 'GET_LOCAL_VIDEOGAMES'



export function getVideoGames () {
    return async function(dispatch){
        try {
       const json = await axios.get('https://project-videogame.herokuapp.com/videogames');
       const json2 = await axios.get('https://project-videogame.herokuapp.com/genres');
      //console.log('hola',json.data)
      const apiVideogames= json.data?.filter((el)=> !el.createdInDb)
      
      //console.log(apiVideogames)
      const bdVideogames= json.data?.filter((el)=> el.createdInDb===true)
      for (let x of bdVideogames){
        x.genres=x.genres.map(el=> Object.values(el.name).join(''));
        //console.log(bdVideogames)
      }

      const allData=[...apiVideogames,...bdVideogames]
      
      //console.log(allData)
      const plat=[]
      const platfo= allData.map(el=> plat.concat(el.platforms)).flat()
      const platforms = Array.from(new Set(platfo)) // [...new Set(platfo)]
      //console.log(platforms)
      
      const Genres= json2.data.map(el=> el.name)
       //console.log(Genres)
        //console.log(Genres)
       return dispatch({
           type: GET_VIDEOGAMES,
           payload: allData,
           genres: Genres,
           platforms: platforms

        })
    } catch (error) {
        console.log('Error in getVideogames', error)
    }
}
}

export function getLocalVideoGames (payload) {
  return async function(dispatch){
    //console.log('payload',payload)
      try {
        return dispatch({
          type:GET_LOCAL_VIDEOGAMES,
          payload: payload
       })
   } catch (error) {
       console.log('Error in getLocalVideogames', error)
   }
}
}



 
export function filteredByGenre(payload){
    return ({
        type: FILTER_BY_GENRE,
        payload
    })
 }
export function filteredByCreated(payload){
    return ({
        type: FILTER_BY_CREATED,
        payload
    })
 }
export function orderByName(payload){
    return ({
        type: ORDER_BY_NAME,
        payload
    })
 }
export function orderByRating(payload){
    return ({
        type: ORDER_BY_RATING, 
        payload
    })
 }

export  function serchVideogameByName(name){
    //console.log(name)
    return async function (dispatch) {
   try{
    let json= await axios.get('https://project-videogame.herokuapp.com/Videogames?name='+ name);
    //console.log('hola')
    
    const apiVideogames= json.data.filter((el)=> !el.createdInDb)
      const bdVideogames= json.data.filter((el)=> el.createdInDb===true)
      for (let x of bdVideogames){
        x.genres=x.genres.map(el=> Object.values(el.name).join(''));
        
      }
      const allData=[...bdVideogames,...apiVideogames]

    //console.log(allData)
     return dispatch({
    type: SEARCH_BY_NAME,
    payload: allData
    })
    
} catch (err) {
    return dispatch(errorByName(1))
    }
}
}
export function postVideogame(payload){
    return async function(dispatch){
        try{
            //console.log(payload)
            const result= await axios.post('https://project-videogame.herokuapp.com/videogames', payload);
            //console.log('actions',result.data)
            result.status===200?
            dispatch({
                type: POST_VIDEOGAME,
                videogame: result.data,
            }): dispatch({
              type: POST_VIDEOGAME,
              payload: false
          })
            
        } catch (err) {
            console.log('error in postVideogame',err )}
    }
}

export function getDetail(id) {
    if (id) {
      return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `https://project-videogame.herokuapp.com/videogames/${id}`
          );
          //console.log(data)
          if(data.createdInDb)
           {const II= data.genres.map(el=> Object.values(el.name).join(''))
            data.genres=II}
            if(!data.createdInDb)
            {data.description= data.description.replace( /(<([^>]+)>)/ig, '')}
            //console.log(data)
          return dispatch({
            type: GET_DETAIL,
            payload: data,
          });
        } catch (error) {
          console.log(error);
        }
      };
    }
    return {
      type: GET_DETAIL,
      payload: [],
    };
  }

export function CleanDetail(){
    return ({
        type: CLEAN_DETAIL_CREATED
        
    })
}

export function CleanAllVideogames(){
  return ({
      type: CLEAN_All_VIDEOGAMES
      
  })
}

export function DeleteVideogame(id) {
  if (id) {
    return async function (dispatch) {
      try {
        const {data} = await axios.delete(`https://project-videogame.herokuapp.com/delete/${id}`);
        //console.log(data)
        return dispatch({
          type: DELETE_VIDEOGAME,
          payload: data,
        });
      } catch (error) {
        console.log('error en actions delete',error);
      }
    };
  }
  return {
    type: GET_DETAIL,
    payload: [],
  };
}

export function UpdatePlatforms(id,payload){
  return async function(dispatch){
      try{
        //console.log(id)
         //console.log(payload)
          const result= await axios.put(`https://project-videogame.herokuapp.com/put/${id}`, payload);
          //console.log('actions',result.data)
          dispatch({
              type: UPDATE,
              payload: result.data,

          })
          
      } catch (err) {
          console.log('error in Update Videogame',err )}
  }
}
export function homeLoading(payload){
  return ({
      type: HOME_LOADING,
      payload: payload
      
  })
}
export function searchState(payload){
  return ({
      type: SEARCH_STATE,
      payload: payload
      
  })
}
export function errorByName(payload){
  return ({
      type: ERROR_BY_NAME,
      payload: payload
      
  })
}





// ==
/*
export const RELOAD= 'RELOAD';
 export function reload(){
   return { 
     type: RELOAD
   }
 }

  case RELOAD:{
        return{
          ...state,
          games:state.fullGames
   }
      }
*/