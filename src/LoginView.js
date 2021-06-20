import React from 'react';
import useSignup from './useSignup';

const LoginView = () => {
  const [signupValue, setSignupValue, handleSubmit] = useSignup();

  return (
    <form onSubmit={(data) => handleSubmit(data)}>
      <input
        type="email"
        value={signupValue.email}
        onChange={(e) => {
          setSignupValue({ type: 'email', data: e.target.value });
        }}
        id="email"
        placeholder="이메일"
      />
      <input
        type="password"
        value={signupValue.password}
        onChange={(e) => {
          setSignupValue({ type: 'password', data: e.target.value });
        }}
        id="password"
        placeholder="비밀번호"
      />
      <input
        type="text"
        value={signupValue.name}
        onChange={(e) => {
          setSignupValue({ type: 'name', data: e.target.value });
        }}
        id="username"
        placeholder="아이디"
      />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default LoginView;
