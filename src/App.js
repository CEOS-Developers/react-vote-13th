import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn'
import SignUp from './SignUp'
import VoteMain from './VoteMain'
import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Switch>
      <Route path="/signIn"><SignIn /></Route>
      <Route path="/signUp"><SignUp /></Route>
      <Route path="/"><VoteMain /></Route>
    </Switch>
  );
}

export default App;
