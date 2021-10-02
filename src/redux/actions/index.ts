import * as actionTypes from '../constants/requestMovie';
import server from '../../api/movieApi';

export const getMovies = (n: number, querySearch: string, media: string, query: string) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIES_REQUEST });
    const { data } = await server.get(`/${querySearch}`, {
      params: {
        page: n,
        media_type: media,
        query: query
      }
    });
    dispatch({
      type: actionTypes.GET_MOVIES_SUCCESS,
      payload: data
    });
  } catch (error: any) {
      dispatch({
        type: actionTypes.GET_MOVIES_FAIL,
        payload: 
          error.response && error.response.data.message 
          ? error.response.data.message
          : error.message
      });
  }
}

export const getGenres = () => async (dispatch: any) => {
  try {
    const res = await server.get('/genre');
    dispatch({ 
      type: actionTypes.GET_GENRES_MOVIE,
      payload: res.data.genres,
    });
  } catch (error: any) {
    console.log(error);
  }
}

export const getDetails = (id: number, media_query: string ) => (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ITEM_DETAILS_REQUEST
    });
    server.get('/details', {
      params: {
        id: id,
        media_type: media_query, 
      }
    }).then(res => {
      dispatch({
        type: actionTypes.GET_ITEM_DETAILS,
        payload: res.data,
      })
    }).catch(err => {
      console.log(err);
    })
}