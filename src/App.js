import React from 'react';
import VoteView from './VoteView';
import { Route } from 'react-router-dom';
import SignUp from './Signup';
import Signin from './Signin';

function App() {
  return (
    <div>
      <Route exact path="/" component={VoteView} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={Signin} />
    </div>
  );
}

export default App;
