import React from 'react';
import { Route } from 'react-router-dom';
import VotePage from './VotePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

function App() {
  return (
    <div>
      <Route exact path="/" component={SignInPage} />
      <Route path="/SignUpPage" component={SignUpPage} />
      <Route path="/VotePage" component={VotePage} />
    </div>
  );
}

export default App;
