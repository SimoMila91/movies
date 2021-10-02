import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { GenresState } from '../redux/reducers/moviesReducer';
import { RootState } from '../redux/store';
import not from '../images/not.jpg';

interface IMovie {
  id: number,
  clicked: number,
  movie: any,
};

const useStyles = makeStyles(() => ({
  root: {
    width: 170,
    textAlign: 'left',
    "&:hover": {
      transform: 'scale(1.03)',
    }
  },
  img: {
    height: 250,
    width: 170,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  headerCard: {
    position: 'relative',
  },
  rateCard: {
    position: 'absolute',
    left: '50%',
    bottom: '91%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(253, 204, 69)',
    borderRadius: 15,
    width: 40,
    color: 'rgb(26, 28, 32)',
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
  },
  footerCard: {
    marginTop: 8,
    marginLeft: 4,
  },
  genreStyle: {
    lineHeight: 1.3,
    marginTop: 8,
    color: 'rgb(0 157 247)',
  }
}));


const Movie: React.FC<IMovie> = ({ id, clicked, movie }) => {
  const classes = useStyles();
  const [genres, setGenres] = useState<Array<string>>([]); 
  const { data } = useSelector<RootState, GenresState>(state => state.genres);

  const handleGenres = useCallback(() => { 
    if (movie.genre_ids !== undefined) {
      if (genres.length === 0) {
        for (let i = 0; i < movie.genre_ids.length; i++) {
          for (let k = 0; k < data.length; k++) {
            if (movie.genre_ids[i] === data[k].id) {
              setGenres((oldGenres: any) => [...oldGenres, data[k].name]);
            }
          }
        }
      }
    }
  }, [data, genres, movie.genre_ids] );

 useEffect(() => {
   handleGenres();
 }, [handleGenres])

  return (
      movie !== undefined ? 
      <div className={classes.root}>
        <div 
          className={classes.headerCard}
          style={clicked === id ? { backgroundColor: '#FC4C54', height: 250 } : { background: 'none', height: 'initial'}}
        >
          <span 
            className={classes.rateCard}
            style={ 
              clicked === id ? 
              { backgroundColor: '#e5474f', color: 'white'} 
              : { backgroundColor: 'rgb(253, 204, 69)', color: 'rgb(26, 28, 32)' }}
          >
            { movie.vote_average}
          </span>
          <img 
            className={classes.img} 
            style={ clicked === id ? { opacity: 0.3 } : { opacity: 1 } }
            src={ (movie.poster_path !== undefined && movie.poster_path !== null) ?  
              `https://image.tmdb.org/t/p/w154/${movie.poster_path}` 
              : `${not}`} 
            alt={movie.original_title} 
          />
        </div>
        <div className={classes.footerCard}>
          <Typography variant="subtitle2">{movie.title ?  movie.title : movie.name}</Typography>
          <Typography className={classes.genreStyle} variant="caption" component="p">
          { genres.join(" ") }
          </Typography>         
        </div>
      </div>
      : null
  )

}

export default Movie; 