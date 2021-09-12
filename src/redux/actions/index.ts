import * as actionTypes from '../constants/requestMovie';
import server from '../../api/movieApi';

export const getMovies = (n: number) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_MOVIES_REQUEST });
    const { data } = await server.get('/home', {
      params: {
        page: n,
      }
    });
    // da cancellare
    console.log(data);
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