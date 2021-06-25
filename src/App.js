import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Vote from './Vote';
import Signup from './Signup';

function App() {
  const [jwt, setJwt] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route
          path="/"
          exact
          render={(props) => <Vote {...props} jwt={jwt} />}
        />
        {/*<Route*/}
        {/*    path="/signup"*/}
        {/*    render={(props) => <Vote {...props} jwt={jwt} />}*/}
        {/*/>*/}
      </Switch>
    </Router>
  );
}

export default App;
