import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignupView from './SignupView';
import SigninView from './SigninView';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <SignupView />} />
          <Route path="/signin" render={() => <SigninView />} />
          <Route path="/vote" render={() => <App />} />
        </Switch>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
