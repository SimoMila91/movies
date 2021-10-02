import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/Navbar';
import Content from './components/Content';
import { ContextProvider } from './context/Context';
import { BrowserRouter } from 'react-router-dom';


const App: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Container style={{ overflow: 'hidden' }} maxWidth={false} disableGutters={true}>
          <ContextProvider>
            <NavBar />
            <Content />
          </ContextProvider>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App;
