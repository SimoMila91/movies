import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/Navbar';
import Content from './components/Content';
import { ContextProvider } from './context/Context';


const App: React.FC = () => {

  return (
    <div className="App">
      <Container maxWidth={false} disableGutters={true}>
        <ContextProvider>
          <NavBar />
          <Content />
        </ContextProvider>
      </Container>
    </div>
  )
}

export default App;
