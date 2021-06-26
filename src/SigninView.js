import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignin } from './authHooks';
import styled from 'styled-components';

const SigninView = () => {
  const [signinValue, setSigninValue, handleLogin, userToken] = useSignin();

  const handleSignupButtonClick = () => {
    window.location = '/signup';
  };

  return (
    <SigninViewContainer>
      <MainLogo src={process.env.PUBLIC_URL + 'ceoslogo_web.jpg'} />
      <SigninForm onSubmit={handleLogin}>
        <InputForm
          type="email"
          placeholder="이메일 입력"
          value={signinValue.email}
          onChange={(e) => {
            setSigninValue({ type: 'email', data: e.target.value });
          }}
        />
        <InputForm
          type="password"
          placeholder="비밀번호 입력"
          value={signinValue.password}
          onChange={(e) => {
            setSigninValue({ type: 'password', data: e.target.value });
          }}
        />

        <AuthButton type="submit">로그인</AuthButton>
        <AuthButton onClick={handleSignupButtonClick}>회원가입</AuthButton>
      </SigninForm>
    </SigninViewContainer>
  );
};

const SigninViewContainer = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const SigninForm = styled.form`
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

  &:nth-child(2) {
    margin-bottom: 50px;
  }
`;

const MainLogo = styled.img`
  width: 300px;
  margin: 100px auto;
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

export default SigninView;
