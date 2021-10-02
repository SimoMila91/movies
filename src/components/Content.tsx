import { Container, makeStyles, Theme } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import Main from '../logic/Main';
import { getGenres } from '../redux/actions';
import { useDispatch } from 'react-redux';

const styles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: 200,
    height: '100%',
    paddingTop: '7.3rem',
    transitionDuration: '500ms',
    transitionDelay: '1',
    color: '#1a1c20',
  },
}));

const Content = () => {
  const classes = styles();
  const { mrg, isMobile } = useContext(Context);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div style={ isMobile ? { marginLeft: mrg, paddingTop: '4rem'} : { marginLeft: mrg }} className={classes.content}>
      <Container maxWidth="xl">       
        <Main />
      </Container>
    </div>
    
  )
}

export default Content; 
