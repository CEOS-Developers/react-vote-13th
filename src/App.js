import React from 'react';
import Vote from './Vote.js';
import LogIn from './LogIn';
import SignUp from './SignUp.js';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/vote" component={Vote} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
