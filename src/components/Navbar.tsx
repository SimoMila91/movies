import { useState, useContext } from 'react';
import { IconButton, makeStyles, Divider, ButtonGroup, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Context } from '../context/Context';
import Search from './Search';
import { motion } from 'framer-motion';
import { setTimeout } from 'timers';
import { Link } from 'react-router-dom';

const styles = makeStyles((theme) => ({
  appBar: {
    height: '4rem',
    [theme.breakpoints.down('xs')]: {
      height: '3rem'
    },
    width: '100%',
    backgroundColor: '#FC4C54',
    position: 'fixed',
    top: 0,
    zIndex: 1001,
    opacity: 0.9,
    display: 'flex',
  },
  logo: {
    margin: 'auto 1.5rem',
    textTransform: 'uppercase',
    display: 'flex',
    width: '11rem'
  },
  logoTitle: {
    marginTop: 'auto',
    marginBottom: 'auto',
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
    zIndex: 1000,
  },
  navBut: {
    color: 'white'
  },
  butMarg: {
    margin: 'auto 10px auto auto'
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
  linkSize: {
    fontSize: 13,
  },
  divider: {
    width: '100%',
    padding: '50px 20px',
    opacity: 0.7,
  },
  dividerColor: {
    backgroundColor: '#696969',
  },
  buttonGrStyle: {
    margin: 'auto auto 34px auto',
  },
  searchDiv: {
    margin: 'auto auto auto -12px',
    textDecoration: 'none',
  }
}));

const menuVariants = {
  opened: {
    left: 0,
  },
  closed: {
    left: -200,
  }
}


const NavBar = () => {
  const classes = styles();
  const [showArrow, setShowArrow] = useState<boolean>(true);
  const { handleResizeContent, isMobile, 
    activeArrow, handleArrow, 
    typeExplore, handleTypeExplore } = useContext(Context);
  const [sidebar, setSidebar] = useState<string>(window.innerWidth < 720 ? '0' : '13rem');
 

  const handleSidebar = () => { 
    setSidebar(sidebar === '0' ? '13rem' : '0');
    handleResizeContent(sidebar);
  };

  const handleFocus = ( n: number ) => {
    setShowArrow(true);
    handleArrow(n);
    setTimeout(() => {
      setSidebar(window.innerWidth < 720 ? '0' : '13rem');
    }, 500);
    if (isMobile) {
      handleResizeContent(sidebar);
    }
  };

  const movieButton: any = typeExplore === 0  ? { color: 'primary' } : null;
  const tvButton: any = typeExplore === 1 ? { color: 'primary' } : null; 

  return (
    <div>
      <div className={classes.appBar}>
        <div className={classes.logo}>
          <BarChartIcon />
          <h5 className={classes.logoTitle}>Friendly Search</h5>
        </div>
        {
          !isMobile && <Link className={classes.searchDiv} onFocus={(e: any) => handleFocus(4)} to={'/multisearch'}><Search /></Link>
        }
          <IconButton className={classes.butMarg} onClick={handleSidebar}>
            <MenuIcon className={classes.navBut} fontSize="medium" />
          </IconButton>
      </div>
      <motion.div 
        style={{ width: sidebar }} 
        className={classes.root}
        initial={window.innerWidth < 720 ? false : true}
        variants={menuVariants}
        animate={sidebar === '13rem' ? 'opened' : 'closed'}
        transition={{ duration: 0.5 }}
      >
        <Link
          onFocus={(e: any) => handleFocus(0)} 
          to={'/'}
          style={ showArrow && activeArrow === 0 ? 
            {  color: '#FC4C54', backgroundColor: 'rgb(34, 42, 49)', marginTop: 20} : 
            { marginTop: 20}
          } 
          className={classes.linkStyle} 
        >
          <div className={classes.linkContent}>
            <p className={classes.linkSize}>{ typeExplore === 0 ? 'New Releases' : 'Discover Series' }</p>
            { showArrow && activeArrow === 0 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </Link>
        <Link
          onFocus={(e: any) => handleFocus(1)} 
          to={'/'}
          className={classes.linkStyle} 
          style={ showArrow && activeArrow === 1 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
          <div className={classes.linkContent}>
            <p className={classes.linkSize}>{ typeExplore === 0 ? 'Coming Soon' : 'Top Rated' }</p>
            { showArrow && activeArrow === 1 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </Link>
        <Link
          onFocus={(e: any) => handleFocus(2)} 
          to={'/'}
          className={classes.linkStyle} 
          style={ showArrow && activeArrow === 2 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
          <div className={classes.linkContent}>
            <p className={classes.linkSize}>Trending</p>
            { showArrow && activeArrow === 2 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </Link>
        <Link
          onFocus={(e: any) => handleFocus(3)} 
          to={'/'}
          className={classes.linkStyle} 
          style={ showArrow && activeArrow === 3 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
          <div className={classes.linkContent}>
              <p className={classes.linkSize}>Popular</p>
              { showArrow && activeArrow === 3 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </Link>
        <div className={classes.divider}>
          <Divider className={classes.dividerColor} />
        </div>
        <Link
          onFocus={(e: any) => handleFocus(4)} 
          to={'/multisearch'}
          className={classes.linkStyle} 
          style={ showArrow && activeArrow === 4 ? 
            {  color: 'rgb(255, 67, 80)', backgroundColor: 'rgb(34, 42, 49)'} : 
            {}
          }
        >
          <div className={classes.linkContent}>
              <p className={classes.linkSize}>Multi Search</p>
              { showArrow && activeArrow === 4 ? <ChevronRightIcon className={classes.iconLink} /> : null }
          </div>
        </Link>
        <ButtonGroup className={classes.buttonGrStyle} size="small" variant="contained">
          <Button onClick={() => handleTypeExplore(0)} {...movieButton}>Movie</Button>
          <Button onClick={() => handleTypeExplore(1)} {...tvButton}>Series</Button>
        </ButtonGroup>
      </motion.div>
    </div>
  )
}

export default NavBar; 