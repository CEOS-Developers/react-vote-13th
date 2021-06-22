import React from 'react';
import { Route } from 'react-router-dom';
import VotePage from './VotePage';
import SignInPage from './SignInPage';
import SignUpLink from './SignUpLink';

function App() {
  return (
    <div>
      <Route path="/" component={SignInPage} exact={true} />
      <Route path="/SignUpLink" component={SignUpLink} />
      <Route path="/VotePage" component={VotePage} />
    </div>
  );
}

export default App;
