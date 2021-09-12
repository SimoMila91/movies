import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoviesState } from '../redux/reducers/moviesReducer';
import { RootState } from '../redux/store';
import { getGenres, getMovies } from '../redux/actions/index';
import Movie from './Movie';
import { Grid, makeStyles, Container } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';


const styles = makeStyles(() => ({
  jc: {
    justifyContent: 'center',
  },
  pagination: {
    marginTop: '5rem',
    marginBottom: '2rem',
  }
}))

const MovieList: React.FC = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const movies = useSelector<RootState, MoviesState>((state) => state.movies);
  const { data, error, loading, page } = movies; 
  const [next, setNext] = useState<any>(1);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getMovies(next));
  }, [dispatch, next])

  const handleNext = (event: object, page: number) => {
    setNext(page);
  }

  return (
    <>
      <Grid container spacing={3} className={classes.jc}>
        {
          loading ? null : error ? <h2>{error}</h2> : 
          data.map((data: any, i: number) => (
            <Grid key={i} item>
              <Movie movie= {data} />
            </Grid>
          )) 
        }
      </Grid>
      {
        loading ? null : 
        <Container className={classes.pagination} maxWidth="xs">
          <Pagination onChange={handleNext} count={page} page={next} variant="outlined" color="primary" />
        </Container>
      }

    </>
  )
}

export default MovieList;