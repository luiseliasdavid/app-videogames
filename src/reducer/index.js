import { ORDER_BY_RATING,
         GET_VIDEOGAMES,
         ORDER_BY_NAME ,
         GET_DETAIL,
         POST_VIDEOGAME,
         SEARCH_BY_NAME,
         FILTER_BY_GENRE,
         FILTER_BY_CREATED,
         CLEAN_DETAIL_CREATED,
         CLEAN_All_VIDEOGAMES,
         DELETE_VIDEOGAME,
         UPDATE,
         HOME_LOADING,
         SEARCH_STATE,
         ERROR_BY_NAME,
         GET_LOCAL_VIDEOGAMES,
         
       } from '../actions/index'

const initialState = {
    videogames: [],
    fullVideogames: [],
    genres: [],
    platforms: [],
    detail:[],
    created: '',
    deleted: '',
    homeLoading: true,
    searchState: false,
    errorByName: 0,
    
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES: 
        //console.log('action.payload', action.payload)
            return {
                ...state,
                videogames: action.payload,
                fullVideogames: action.payload,
                genres: action.genres,
                platforms: action.platforms
            }
        case GET_LOCAL_VIDEOGAMES:
            
            
            return {
                ...state,
                videogames: action.payload
            }

     
        case SEARCH_BY_NAME :
           console.log(action.payload)
             return {
                ...state,
               videogames: action.payload,
               
               
            }
          case FILTER_BY_GENRE :
              const allVideogames= state.fullVideogames
              const filteredVideogames= action.payload==="all videogames"? allVideogames: 
              allVideogames.filter(el=> el.genres.includes(action.payload))
                   //console.log(filteredRecipes);
          
              return{
                 ...state,
                videogames: filteredVideogames,
              }
          case FILTER_BY_CREATED:
              const allVideogames2= state.fullVideogames
              const filtered= action.payload==='true'? allVideogames2.filter(el=>el.createdInDb): 
              allVideogames2.filter(el=>!el.createdInDb);
                   
              return{
                 ...state,
                 videogames: action.payload==='all'?allVideogames2:filtered
              }
          case ORDER_BY_NAME:
          let videogames= state.fullVideogames
          let sortedArr= action.payload === 'a-z'?
          videogames.sort(function (a,b) {
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return 1;
                      }
                      if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return -1;
                      }
                      return 0
                  }):
                  videogames.sort(function (a,b) {
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return -1;
                      }
                      if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return 1;
                      }
                      return 0
                  });

              return{
                  ...state,
                  videogames: sortedArr
              }
          case ORDER_BY_RATING:
              let videogames2= state.fullVideogames
              //console.log(action.payload)
              let sortedArr2= action.payload === 'asc'?
              videogames2.sort(function (a,b) {
                  console.log(a.rating,b.rating)
                  if (a.rating>b.rating) {
                      return 1;
                  }
                  if (a.rating < b.rating) {
                      return -1;
                  }
                  return 0
              }):
              videogames2.sort(function (a,b) {
                  if (a.rating >b.rating) {
                      return -1;
                  }
                  if (a.rating < b.rating) {
                      return 1;
                  }
                  return 0
              });
              //console.log(sortedArr2);
              return{
                  ...state,
                  videogames:  sortedArr2
              }
          
              case POST_VIDEOGAME:
                //console.log('reduce pre return', state.created)
            return{
                ...state,
                //created: action.payload
                created: action.videogame
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL_CREATED:
            return{
                ...state,
                detail: [],
                created: ''
            }
        case CLEAN_All_VIDEOGAMES:
            return{
                ...state,
                videogames: [],
            }
        case DELETE_VIDEOGAME:
            return{
                ...state,
                deleted: action.payload
            }
        case UPDATE:
            return{
                ...state,
            }
        case HOME_LOADING:
            return{
                ...state,
                homeLoading: action.payload
            }
        case SEARCH_STATE:
            return{
                ...state,
                searchState: action.payload
            }
        case ERROR_BY_NAME:
            return{
                ...state,
                errorByName: action.payload
            }
        



          
              
          default:
              return state
          
      }


}
export default rootReducer

//Eliminar