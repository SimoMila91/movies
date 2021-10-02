import * as actionType from '../constants/requestMovie';

  interface IAction {
    type: string,
    payload: any,
  }

 export const moviesReducer = (state = { data: [], loading: false, page: 0, error: null, results: 0 }, action: IAction) => {
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
        page: action.payload.total_pages,
        results: action.payload.total_results
      }
    case actionType.GET_MOVIES_FAIL:
      return {
        error: action.payload,
        loading: false,
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

export const detailsReducer = (state = { data: [], loading: true, error: null}, action: IAction) => {
  switch (action.type) {
    case actionType.GET_ITEM_DETAILS_REQUEST: 
      return {
        loading: true,
        data: [],
      }
    case actionType.GET_ITEM_DETAILS:
      return {
        data: action.payload,
        loading: false,
      }
    default: 
      return state; 
  } 
}


export type MoviesState = ReturnType<typeof moviesReducer>;
export type GenresState = ReturnType<typeof genresReducer>;
export type DetailsState = ReturnType<typeof detailsReducer>;