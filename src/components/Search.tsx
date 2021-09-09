import React from 'react';
import { InputBase, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const style = makeStyles(() => ({
  search: {
    marginLeft: 50,
    backgroundColor: '#FC4C54',
    color: 'white',
    fontSize: 13,
    width: '30rem'
  },
}))

const Search = () => {
  const classes = style();
  return (
    <InputBase
            className={classes.search}
            placeholder="Search a movie"
            startAdornment={<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>}
    />
  )
}

export default Search;