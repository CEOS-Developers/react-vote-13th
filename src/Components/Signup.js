import axios from 'axios';
import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAsync from '../Hooks/useAsync';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const history = useHistory();

  const signupCallback = useCallback(async (params=null) => {
    if(params) {
      const url = 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup';
      const data = { email: params.email, password: params.password, name: params.userName };
      const res = await axios.post(url, data);
      if (res.status === 201) {
        setTimeout(() => {history.push('/signin');}, 2000);
        return res.data;
      }
    } else {
      throw Error('No params specified')
    }
  },[history]);

  const [signupState, signup] = useAsync(signupCallback, [], false);
  const { loading: signupLoading, data: signupData, error: signupError } = signupState;

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    if (!signupLoading && email !== '' && password !== '' && userName !== '') {
      await signup({email, password, userName});
    }
  }

  return (
    <>
      <Title>회원가입</Title>
      <SignupForm onSubmit={handleSignupFormSubmit}>
        <label htmlFor="email">이메일</label>
        <input 
          type="text" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email 입력"
        />
        
        <label htmlFor="password">비밀번호</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="비밀번호 입력"
        />

        <label htmlFor="username">이름</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          placeholder="이름 입력"
        />

        <Button
          type="submit"
          className={(email==='' || password==='' || signupLoading) ? 'disabled' : ''}
        >
          {signupLoading ? '회원가입 중..' : '회원가입'}
        </Button>
      </SignupForm>
      <Button className="text" onClick={() => { history.push('/signin') }}>로그인</Button>
      {signupError ? <ErrorDiv>{signupError.message ? signupError.message : signupError}</ErrorDiv> : <Response>{signupData}</Response>}
    </>
  )
}

const Title = styled.h1`
  text-align: center;
  margin-bottm: 30px;
`;

const SignupForm = styled.form`
  width: 100%;
  margin-bottom: 15px;

  & label {
    display: block;
    margin-bottom: 5px;
    margin-top: 15px;
  }
  & input {
    border: solid black;
    border-width: 0 0 1px 0;
    padding: 8px 10px;
    font-size: 1em;
    color: black;
    margin-bottom: 10px;
    width: 100%;
    outline: none;
  }
  & input:last-of-type {
    margin-bottom: 30px;
  }

  & input:focus {
    border-color: rgb(13, 126, 247);
    border-width: 0 0 2px 0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  font-weight: bold;
  background: rgb(13, 126, 247);
  margin: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &.text {
    background: none;
    color: rgb(13, 126, 247);
    text-decoration: underline;
  }
  
  &.disabled {
    background: lightgray;
    color: gray;
  }
  &.disabled:hover {
    opacity: 1;
    cursor: default;
  }
`;

const ErrorDiv = styled.div`
  background: rgb(216, 57, 72);
  padding: 8px 10px;
  color: white;
  font-weight: bold;
`;

const Response = styled.div`
  text-align: center;
  margin-top: 15px;
`;