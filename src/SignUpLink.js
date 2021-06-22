import React from 'react';

function SignUpLink() {
  return (
    <div>
      <form>
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input name="name" type="name" placeholder="Name" />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUpLink;
