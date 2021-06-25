import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUp from './signup';
import SignIn from './SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/vote" component={App} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
