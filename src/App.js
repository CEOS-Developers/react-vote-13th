import React from 'react';
import VoteView from './VoteView';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useCookies } from 'react-cookie';

function App() {
  const [loginCookie, setLoginCookie, removeLoginCookie] = useCookies([
    'loginCookie',
  ]);

  return (
    <div>
      <Route exact path="/">
        <VoteView
          loginCookie={loginCookie}
          removeLoginCookie={removeLoginCookie}
        ></VoteView>
      </Route>
      <Route path="/signup">
        <SignUp></SignUp>
      </Route>
      <Route path="/signin">
        <SignIn setLoginCookie={setLoginCookie}></SignIn>
      </Route>
    </div>
  );
}

export default App;
