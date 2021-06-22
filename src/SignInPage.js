import React from 'react';
import { Link } from 'react-router-dom';

function SignInPage() {
  return (
    <div>
      <form>
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input type="submit" value="Log In" />
      </form>
      <Link to="/SignUpLink">
        <button>Sign Up</button>
      </Link>
      <Link to="/VotePage">
        <button>Vote Page</button>
      </Link>
    </div>
  );
}

export default SignInPage;
