import { InputBase, InputAdornment, makeStyles, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Context } from '../context/Context';
import { useContext, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';

const style = makeStyles(() => ({
  search: {
    marginLeft: 24,
    backgroundColor: '#FC4C54',
    color: 'white',
    fontSize: 13,
    width: '30rem',
  },
  searchMobile: {
    border: '2px solid',
    padding: 5,
    paddingLeft: 15,
    backgroundColor: 'rgb(34 42 49)',
    borderColor: '#FC4C54',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    color: 'white',
    borderRadius: 1,
    opacity: 0.9,
    fontSize: 13,
    
  },
  button: {
    height: 42,
    marginBottom: 11,
    borderRadius: '0 0 5px 0',
    backgroundColor: '#FC4C54',
    opacity: 0.9,
    fontSize: 13,
    "&:hover": {
      backgroundColor: '#FC4C54',
    },
  }
}))

const Search = () => {
  const classes = style();
  const { isMobile, handleSubmit } = useContext(Context);
  const [value, setValue] = useState<string>('');

  const handleSub = (e: any) => {
    e.preventDefault();
    handleSubmit(value);
  };

  return (
    <form action="post" onSubmit={handleSub}>
      <InputBase
              className={ !isMobile ? classes.search : classes.searchMobile}
              placeholder="Multi search...movie and tv series"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setValue(e.target.value)}
              startAdornment={<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>}
      />
      { 
        isMobile && value !== '' ? 
        <Button type="submit" className={classes.button}><SendIcon fontSize="small" /></Button>
        : null
      }
    </form>
  )
}

export default Search;