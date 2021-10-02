import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Button, 
  DialogActions, DialogContent,
  DialogTitle, Typography, Grid, Divider
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { RootState } from '../redux/store';
import { DetailsState } from '../redux/reducers/moviesReducer';
import { Context } from '../context/Context';
import {  CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import no from '../images/17.svg';
 
interface IModal {
  onOpen: boolean 
  closeModal: () => void
}

const useStyles = makeStyles((theme) => ({ 
  rootProviders: {
    margin: '31px 0',
    position: 'relative',
  },
  gridStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 74,
  },
  logoNet: {
    width: 70,
    marginLeft: 0,
  },
  logoWatch: {
    height: 40, 
    marginRight: 7,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 8, 
    boxShadow: '2px 3px 17px black',
  },
  titleWatch: {
    position: 'absolute',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
    textTransform: 'uppercase',
    left: -24,
    width: 90
  },
  videoRes: {
    paddingTop: 30,
  },
  divider: {
    backgroundColor: '#696969',
    width: '100%',
    margin: 'auto !important'
  },
  gridCont: {
    marginTop: '0 !important',
    marginLeft: '0 !important'
  },
  backdrop: {
    [theme.breakpoints.up('xs')]: {
      height: '12rem',
    },
    [theme.breakpoints.up('sm')]: {
      height: '15rem',
    },
    [theme.breakpoints.up('md')]: {
      height: '20rem',
    },
    width: '100%',
    boxShadow: '1px 6px 11px black',
    marginBottom: 30,
  },
  valutation: {
    padding: '23px 23px 23px 0',
    display: 'flex',
    alignItems: 'center',
  },
  voteCount: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 10
  }
}));

const Modal: React.FC<IModal> = ({ onOpen, closeModal }) => {
  const { isMobile } = useContext(Context);
  const { data, loading } = useSelector<RootState, DetailsState>(state => state.details);
  const classes = useStyles();

  const checkNetworks = (array: any) => { 
    if (array.networks) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === "Netflix" || array[i].name === "Amazon") {
          return true; 
        }
      } 
    }
    return false; 
  }

  const duration = (n: number) => {
    let hour = Math.floor(n / 60);
    let min = n % 60; 
    return `${hour}h ${min}m`;
  }

  return ( 
    <>  
      { loading ? null : 
        <Dialog
          maxWidth="md"
          open={onOpen}
          PaperProps={{
            style: {
              opacity: isMobile ? 1 : 0.98,
              color: 'white',
              margin: isMobile ? 10 : 37, 
              width: !isMobile ? '50rem' : ''
            }
          }}
        >
              <DialogTitle>
                <span style={{ fontSize: 25 }}> 
                {data.title ? data.title : data.name}
                <span className="grey-clear"> {
                (data.release_date && data.release_date !== null) ? 
                  "("+data.release_date.slice(0, 4)+")" : 
                  (data.first_air_date && data.first_air_date !== null) ? 
                  "("+data.first_air_date.slice(0, 4)+")"
                  : null }
                </span>
                </span>
                <Typography variant="body2" style={{ marginLeft: 2, fontWeight: 400 }}>
                  <span>
                  {data.release_date ? data.release_date : data.first_air_date} (IT) •&nbsp;  
                  </span>
                  <span>
                    {data.genres.length > 0 ? data.genres.map((genre: any, i: number) => (
                      i === data.genres.length - 1 ? genre.name + " " : genre.name + ", "
                    )) : 'No genres available'}
                  </span>
                  <span>
                    • {data.runtime ? duration(data.runtime) : null }
                  </span>
                </Typography>
              </DialogTitle>
              <Divider className={classes.divider} />
              <DialogContent style={{paddingTop: 0}}>
                <div className={classes.valutation}>
                  <div style={{ width: 60, height: 60 }}>
                    <CircularProgressbarWithChildren 
                      maxValue={10} 
                      value={data.vote_average}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: '#081c22',
                        textColor: "#fff",
                        pathColor: "#21d07a",
                        trailColor: '#204529',
                        textSize: 25,
                      })}
                      text={`${data.vote_average}`}
                    />
                  </div>
                  <div className={classes.voteCount}>
                  <img
                      style={{ width: 30, borderRadius: '50%' }}
                      src={data.vote_average > 5 ? `https://i.imgur.com/zhxREoP.png` : 'https://i.imgur.com/b9NyUGm.png'}
                      alt="doge"
                    />
                  <span style={{ fontSize: 11, marginLeft: 3 }}><span style={{ color: '#21d07a' }}>{data.vote_count}</span> Votes</span>
                  </div>
                </div>
                {
                  data.backdrop_path ? 
                    <img className={classes.backdrop} src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`} alt={data.title ? data.title : data.name} />
                  : null 
                }
               
                    { data["watch/providers"].results.IT ? 
                    <div className={classes.rootProviders}>
                      { 
                        data["watch/providers"].results.IT.flatrate ?  
                        <div className={classes.gridStyle}>
                          <span style={{ marginBottom: 21 }} className={classes.titleWatch}>Streming </span>
                          <Grid className={classes.gridCont} container spacing={1}>
                            { data["watch/providers"].results.IT.flatrate.map((flat: any, i: number) => (
                              <Grid key={i} item md={1}>
                                <img className={classes.logoWatch} src={`https://image.tmdb.org/t/p/w92/${flat.logo_path}`} alt={flat.name} />
                              </Grid>
                            ))}
                          </Grid>
                        </div> : null  
                      }
                      {
                        data["watch/providers"].results.IT.rent ? 
                        <div className={classes.gridStyle}>
                          <span className={classes.titleWatch}>Rent </span>
                          <Grid className={`${classes.gridCont}`} container spacing={1}>
                            {data["watch/providers"].results.IT.rent.map((flat: any, i: number) => (
                              <Grid key={i} item md={1}>
                                <img className={classes.logoWatch} src={`https://image.tmdb.org/t/p/w92/${flat.logo_path}`} alt={flat.name} />
                              </Grid>
                            ))}
                          </Grid>
                        </div> : null 
                      }
                      {
                        data["watch/providers"].results.IT.buy ?
                        <div className={classes.gridStyle}>
                          <span className={classes.titleWatch}>Buy </span>
                          <Grid className={classes.gridCont} container spacing={1}>
                            {data["watch/providers"].results.IT.buy.map((flat: any, i: number) => (
                              <Grid key={i} item md={1}>
                                <img className={classes.logoWatch} src={`https://image.tmdb.org/t/p/w92/${flat.logo_path}`} alt={flat.name} />
                              </Grid>
                            ))}
                          </Grid>
                        </div> : null
                      }
                    </div>
                    : checkNetworks(data) ? 
                    <div style={{ marginBottom: '4rem' }} className={classes.rootProviders}>
                      <div className={classes.gridStyle}>
                        <span className={classes.titleWatch}>Streaming </span>
                        <Grid className={classes.gridCont} container spacing={1}>
                          {data.networks.map((net: any, i: number) => (
                            (net.name === "Amazon" || net.name === 'Netflix') ? 
                            <Grid key={i} item md={1}>
                              <img className={classes.logoNet} src={`https://image.tmdb.org/t/p/w92/${net.logo_path}`} alt={net.name} /> 
                            </Grid> : null
                          ))}
                        </Grid>
                      </div>
                      </div> : null
                    }
                { data.overview ? 
                <>
                <Typography gutterBottom variant="h6">
                  Overview
                </Typography>
                <Typography style={{ color: '#E0E0E0' }} variant="body2"> 
                  {data.overview}
                </Typography>
                </> : null
                }
                <div className={classes.videoRes}>
                  { data.videos.results.length > 0 && 
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                  }
                </div>
                {
                  (data.videos.results.length <= 0 && data.overview === "" && data.backdrop_path === null ) ?
                  <div style={{ textAlign: 'center', display: 'flex' }}>
                    <Typography style={{ textAlign: 'end'}}>We are sorry, we don't have more informations</Typography>
                    <img height="300" src={no} alt="no informations" />
                  </div> 
                  : null
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal}>Disagree</Button>
                <Button onClick={closeModal}>
                  Agree
                </Button>
              </DialogActions>
        </Dialog>
      }
    </>
  )
}

export default Modal; 