import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Vote from './Vote';

function App() {
  const [jwt, setJwt] = useState(null);

  return (
    <Router>
      <Switch>
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
