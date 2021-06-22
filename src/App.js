import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Vote from './Components/Vote';
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import { Route, Switch } from 'react-router-dom';

function App() {
  

  return (
    <>
      <GlobalStyle />
      <Container>
        <Switch>
          <Route path="/signin"><Signin /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/"><Vote /></Route>
        </Switch>
      </Container>
    </>
  );
}

// COMPONENTS


// STYLES
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
    background: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div#root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100%;
  min-height: 600px;
  background: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default App;
