import { Container, makeStyles } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';


const styles = makeStyles((theme) => ({
  content: {
    marginLeft: 200,
    height: '100%',
    paddingTop: '9rem',
  }
}));

const Content = () => {
  const classes = styles();
  const { mrg } = useContext(Context);

  return (
    <div style={{ marginLeft: mrg}} className={classes.content}>
      <Container>
        { [0, 1, 2, 3, 4, 5, 6,].map((i) => 
          <div key={i}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad illo, in nesciunt libero tempora pariatur, minima, vitae deleniti ipsam quia ex hic. Non, fuga fugit aut ullam corporis sapiente esse.</p>
          </div>
        )}
      </Container>
    </div>
    
  )
}

export default Content; 