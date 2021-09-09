import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth={false} disableGutters={true}>
        <NavBar />
      </Container>
    </div>
  )
}

export default App;
