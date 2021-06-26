import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignupView from './SignupView';
import SigninView from './SigninView';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  display: flex;

  #root {
    margin:0;
    display:flex;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <SigninView />} />
          <Route path="/signup" render={() => <SignupView />} />
          <Route path="/vote" render={() => <App />} />
        </Switch>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
