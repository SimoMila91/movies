import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { GenresState } from '../redux/reducers/moviesReducer';
import { RootState } from '../redux/store';
import axios from 'axios';

interface IMovie {
  movie: any,
};

const useStyles = makeStyles(() => ({
  root: {
    width: 170,
    textAlign: 'left',
    "&:hover": {
      transform: 'scale(1.02)',
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
    color: '#FFFAFA',
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
  }
}));


const Movie: React.FC<IMovie> = ({ movie }) => {
  const classes = useStyles();
  const [genres, setGenres] = useState<Array<string>>([]); 
  const { data } = useSelector<RootState, GenresState>(state => state.genres);

  const handleGenres = () => { 
    if (genres.length === 0) {
      for (let i = 0; i < movie.genre_ids.length; i++) {
        for (let k = 0; k < data.length; k++) {
          if (movie.genre_ids[i] === data[k].id) {
            setGenres((oldGenres: any) => [...oldGenres, data[k].name]);
          }
        }
      }
    }
  };

 useEffect(() => {
   handleGenres();
 }, [data])

  return (
      movie !== undefined ? 
      <div className={classes.root}>
        <div className={classes.headerCard}>
          <span className={classes.rateCard}>{ movie.vote_average}</span>
          <img className={classes.img} src={ movie !== undefined ?  `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : ''} alt={movie.original_title} />
        </div>
        <div className={classes.footerCard}>
          <Typography variant="subtitle2">{movie.title}</Typography>
          <Typography className={classes.genreStyle} variant="caption" component="p" style={{ color: 'rgb(95, 190, 244)'}}>
          { genres.join(" ") }
          </Typography>         
        </div>
      </div>
      : null
  )

}

export default Movie; 