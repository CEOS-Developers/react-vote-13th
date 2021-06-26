import React from 'react';
import { useSignup } from './authHooks';
import styled from 'styled-components';

const SignupView = () => {
  const [signupValue, setSignupValue, handleSubmit] = useSignup();
  const handleCancelClick = (e) => {
    e.preventDefault();
    window.location = '/';
  };

  return (
    <SignupViewContainer>
      <PageTitle>SIGNUP</PageTitle>
      <SignupForm onSubmit={(data) => handleSubmit(data)}>
        <InputForm
          type="email"
          value={signupValue.email}
          onChange={(e) => {
            setSignupValue({ type: 'email', data: e.target.value });
          }}
          id="email"
          placeholder="이메일"
        />
        <InputForm
          type="password"
          value={signupValue.password}
          onChange={(e) => {
            setSignupValue({ type: 'password', data: e.target.value });
          }}
          id="password"
          placeholder="비밀번호"
        />
        <InputForm
          type="text"
          value={signupValue.name}
          onChange={(e) => {
            setSignupValue({ type: 'name', data: e.target.value });
          }}
          id="username"
          placeholder="아이디"
        />
        <AuthButton type="submit">회원가입</AuthButton>
        <AuthButton onClick={handleCancelClick}>취소</AuthButton>
      </SignupForm>
    </SignupViewContainer>
  );
};

const SignupViewContainer = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  color: royalblue;
  font-weight: bolder;
  font-family: Helvetica;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.input`
  width: 250px;
  height: 30px;
  margin: 5px auto;
  border-radius: 3px;
  border: 1px solid gainsboro;
  padding-left: 8px;

  &:focus {
    outline: none;
    border: 1px solid blue;
  }

  &:nth-child(3) {
    margin-bottom: 50px;
  }
`;

const AuthButton = styled.button`
  width: 250px;
  height: 30px;
  border-radius: 8px;
  border: 2px solid royalblue;
  color: royalblue;
  background-color: white;
  margin: 3px auto;
  transition: all 0.15s ease-in;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: royalblue;
    color: white;
  }
`;

export default SignupView;
