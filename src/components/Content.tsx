import { Container, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { Context } from '../context/Context';
import MovieList from './MovieList';


const styles = makeStyles((theme) => ({
  content: {
    marginLeft: 200,
    height: '100%',
    paddingTop: '7.3rem',
  }
}));

const Content = () => {
  const classes = styles();
  const { mrg } = useContext(Context);

  return (
    <div style={{ marginLeft: mrg}} className={classes.content}>
      <Container>
        <MovieList />
      </Container>
    </div>
    
  )
}

export default Content; 