import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoviesState } from '../redux/reducers/moviesReducer';
import { RootState } from '../redux/store';
import { getDetails, getMovies } from '../redux/actions/index';
import Movie from './Movie';
import { Grid, Container, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Context } from '../context/Context';
import { motion } from 'framer-motion';
import noFound from '../images/nofound.svg';
import Modal from './Modal';


const styles = makeStyles((theme) => ({
  jc: {
    justifyContent: 'start',
    marginLeft: '76px !important'
  },
  jcTwo: {
    justifyContent: 'start',
    marginLeft: '60px !important',
  },
  pagination: {
    marginTop: '5rem',
    marginBottom: '2rem',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingBottom: 60,
      paddingTop: 30,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 65,
      textAlign: 'left',
      paddingBottom: 80,
      paddingTop: 20
    },
  },
  titleStyle: {
    fontSize: 26,
  },
  noFoundStyle: {
    [theme.breakpoints.up('xs')]: {
      height: '15rem',
    },
    [theme.breakpoints.up('md')]: {
      height: '20rem',
    },
    [theme.breakpoints.up('xl')]: {
      height: '30rem',
    },
  },
  noFoundDiv: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: '6%',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '2%',
    },
  },
  grid: {
    position: 'relative',
    paddingRight: 24,
  }
}));

const listVariant = {
  hidden: {
    y: 140,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    delay: 1,
  },
  hiddenImage: {
    x: 1000,
    opacity: 0,
  },
  visibleTwo: {
    x: 0,
    opacity: 1,
  },
};


const MovieList: React.FC = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const movies = useSelector<RootState, MoviesState>((state) => state.movies);
  const { data, error, loading, page, results } = movies; 
  const [next, setNext] = useState<any>(1);
  const { typeSearch, typeExplore, titlePage, value, activeArrow, mrg } = useContext(Context);
  const [clicked, setClicked] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeSearch !== 'multisearch') {
      let type: string; 
      if ((typeSearch === 'trending' && typeExplore === 0 )|| 
      (typeSearch === 'popular' && typeExplore === 0) ) {
        type = 'movie'; 
      } else {
        type = 'tv';
      }
      dispatch(getMovies(next, typeSearch, type, ''));
    } else {
      dispatch(getMovies(next, typeSearch, '', value))
    }
  }, [dispatch, next, typeSearch, typeExplore, value])


  useEffect(() => {
    setNext(1);
  }, [typeSearch, value])

  const handleNext = (event: object, page: number) => {
    setNext(page);
  }

  const mt = (typeExplorer: number, activeArrow: number, data: any, i: number) => {
    let type; 
    if (typeExplorer === 0 && activeArrow !== 2 && activeArrow !== 4) {
      type = 'movie'; 
    } else if (typeExplorer === 1 && activeArrow !== 2 && activeArrow !== 4) {
      type = 'tv'; 
    } else {
      type = data[i].media_type; 
    }
    return type; 
  };


  const handleClickedItem = (i: number) => {
    setClicked(i);
    dispatch(getDetails(data[i].id, mt(typeExplore, activeArrow, data, i)));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setClicked(-1);
  }

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h4" className={classes.titleStyle}>
            { titlePage }
        </Typography>
      </div>
      <Grid 
        container 
        spacing={3} 
        className={ mrg === 0 ? classes.jcTwo : classes.jc }
      >
        {
          loading ? null : error ? <h2>{error}</h2> : 
            data.map((data: any, i: number) => (
              <Grid item className={classes.grid} key={i} onClick={() => handleClickedItem(i)}>
                  <motion.div
                    animate="visible"
                    initial="hidden"
                    variants={listVariant}
                  >
                    <Movie id={i} clicked={clicked} movie={data} />
                  </motion.div>
              </Grid>
            )) 
        }
        <Modal onOpen={open} closeModal={handleClose}  />
      </Grid>
      {
        results === 0 ? 
          <motion.div
            variants={listVariant}
            initial="hiddenImage"
            animate="visibleTwo"
            transition={{ duration: 1 }}
            className={classes.noFoundDiv}
          >
            <img className={classes.noFoundStyle} src={noFound} alt="No results found" />
            <Typography variant="h6">No results found</Typography>
          </motion.div>
        : null
      }
      {
        (loading || error || data.length === 0) ? null : 
        <Container className={classes.pagination} maxWidth="xs">
          <Pagination onChange={handleNext} count={page} page={next} variant="outlined" color="primary" />
        </Container>
      }
    </>
  )
}

export default MovieList;