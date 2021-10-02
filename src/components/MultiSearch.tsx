import MovieList from "./MovieList";
import { useContext } from 'react';
import { Context } from "../context/Context";
import Search from './Search';
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(() => ({
  searchDiv: {
    paddingTop: 0,
    paddingBottom: '3rem',
  }
}))

export default function MultiSearch() {
  const { isMobile } = useContext(Context);
  const classes = styles();
  return (
    <>
      { isMobile && <div className={classes.searchDiv}><Search /></div> }
      <MovieList />
    </>
  )
}