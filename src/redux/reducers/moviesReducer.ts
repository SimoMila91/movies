import * as actionType from '../constants/requestMovie';

  interface IAction {
    type: string,
    payload: any,
  }

 export const moviesReducer = (state = { data: [], loading: false, page: 0, error: null }, action: IAction) => {
  switch (action.type) {
    case actionType.GET_MOVIES_REQUEST:
      return {
        loading: true,
        data: [],
        page: 0,
      }
    case actionType.GET_MOVIES_SUCCESS: 
      return {
        data: action.payload.results,
        loading: false,
        page: action.payload.total_pages
      }
    case actionType.GET_MOVIES_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    case actionType.ADD_MOVIES_PAGE: 
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    default: 
      return state;
  }
} 

export const genresReducer = (state = { data: [], error: null}, action: IAction) => {
  switch (action.type) {
    case actionType.GET_GENRES_MOVIE:
      return {
        data: action.payload
      }
    default: 
      return state; 
  }
}


export type MoviesState = ReturnType<typeof moviesReducer>;
export type GenresState = ReturnType<typeof genresReducer>;