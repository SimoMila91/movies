import React, { useState } from 'react';
import { IconButton, makeStyles, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = makeStyles(() => ({
  appBar: {
    height: '4rem',
    width: '100%',
    backgroundColor: 'rgb(255, 67, 80)',
    position: 'fixed',
    top: 0,
    zIndex: 2,
    opacity: 0.8,
    display: 'flex',
  },
  logo: {
    margin: 'auto 1.5rem',
    textTransform: 'uppercase',
    display: 'flex',
  },
  logoTitle: {
    marginTop: 6,
    marginLeft: 4,
  },
  root: {
    height: '100%',
    backgroundColor: 'rgb(26, 28, 32)',
    position: 'fixed',
    top: 0,
    left: 0,
    overflowX: 'hidden',
    paddingTop: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navBut: {
    color: 'white'
  },
  butMarg: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  linkStyle: {
    marginTop: 0,
    textDecoration: 'none',
    marginLeft: 0,
    color: 'white',
    padding: 15,
    width: '100%',
    textAlign: 'left',
    "&:hover": {
      backgroundColor: 'rgb(34, 42, 49)',
    },
    "&:focus": {
      color: 'rgb(255, 67, 80)',
      backgroundColor: 'rgb(34, 42, 49)',
    },
    paddingLeft: '2.3rem'
  },
  linkContent: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 25
  },
  iconLink: {
    color: '#696969',
  },
  divider: {
    width: '100%',
    padding: '50px 20px',
    opacity: 0.7,
  }
}));


const NavBar = () => {
  const classes = styles();
  const [sidebar, setSidebar] = useState<string>('0');
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const [activeArrow, setActiveArrow] = useState<number>(0);
 

  const handleSidebar = () => { 
    setSidebar(sidebar === '0' ? '15rem' : '0');
  };

  const handleFocus = ( n: number ) => {
    setShowArrow(true);
    setActiveArrow(n);
  };

  return (
    <div>
      <div className={classes.appBar}>
        <div className={classes.logo}>
          <BarChartIcon />
          <h5 className={classes.logoTitle}>Friendly Search</h5>
        </div>
        <IconButton className={classes.butMarg} onClick={handleSidebar}>
          <MenuIcon className={classes.navBut} fontSize="medium" />
        </IconButton>
      </div>
      <div style={{ width: sidebar }} className={classes.root}>
        <a 
          onFocus={(e: any) => handleFocus(0)} 
          style={ showArrow && activeArrow === 0 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)', marginTop: 20} : 
            { marginTop: 20}
          } 
          className={classes.linkStyle} 
          href="#"
        >
          <div className={classes.linkContent}>
            <p>New Releases</p>
            { showArrow && activeArrow === 0 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </a>
        <a 
          onFocus={(e: any) => handleFocus(1)} 
          className={classes.linkStyle} 
          href="#"
          style={ showArrow && activeArrow === 1 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
        <div className={classes.linkContent}>
            <p>Trending</p>
            { showArrow && activeArrow === 1 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </a>
        <a 
          onFocus={(e: any) => handleFocus(2)} 
          className={classes.linkStyle} 
          href="#"
          style={ showArrow && activeArrow === 2 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
        <div className={classes.linkContent}>
            <p>Popular</p>
            { showArrow && activeArrow === 2 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </a>
        <a 
          onFocus={(e: any) => handleFocus(3)} 
          className={classes.linkStyle} 
          href="#"
          style={ showArrow && activeArrow === 3 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
        <div className={classes.linkContent}>
            <p>Favorites</p>
            { showArrow && activeArrow === 3 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </a>
        <div className={classes.divider}>
          <Divider style={{ backgroundColor: '#696969' }} />
        </div>
      </div>
    </div>
  )
}

export default NavBar; 