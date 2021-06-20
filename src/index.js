import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LoginView from './LoginView';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <LoginView />} />
          <Route path="/vote" render={() => <App />}></Route>
        </Switch>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
