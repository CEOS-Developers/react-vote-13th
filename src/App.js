import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Vote from './Vote';
import Signup from './Signup';
import Signin from './Signin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/" exact component={Vote} />
      </Switch>
    </Router>
  );
}

export default App;
