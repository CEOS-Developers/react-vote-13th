import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignin } from './authHooks';

const SigninView = () => {
  const [signinValue, setSigninValue, handleLogin] = useSignin();

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={signinValue.email}
        onChange={(e) => {
          setSigninValue({ type: 'email', data: e.target.value });
        }}
      />
      <input
        type="password"
        value={signinValue.password}
        onChange={(e) => {
          setSigninValue({ type: 'password', data: e.target.value });
        }}
      />

      <button type="submit">로그인</button>
      <Link to="/">회원가입</Link>
    </form>
  );
};

export default SigninView;
