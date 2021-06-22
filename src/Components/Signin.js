import axios from 'axios';
import React, { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAsync from '../Hooks/useAsync';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookie, ] = useCookies(['vote-13th-token'])
  const history = useHistory();

  const signinCallback = useCallback(async (params=null) => {
    if(params) {
      const url = 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin';
      const data = { email: params.email, password: params.password };
      const res = await axios.post(url, data);
      if (res.status === 201) {
        setCookie('vote-13th-token', res.data, {path: '/', maxAge: 7200});
        setCookie('vote-13th-email', params.email, {path: '/', maxAge: 7200});
        console.log(res.data)
        history.push('/');
        return true;
      } else {
        throw Error('Login failed!')
      }
    } else {
      throw Error('No params specified')
    }
    return false;
  },[setCookie]);

  const [signinState, signin] = useAsync(signinCallback, [], false);
  const { loading: signinLoading, data: signinData, error: signinError } = signinState;

  const handleSigninFormSubmit = async (e) => {
    e.preventDefault();
    if (!signinLoading && email !== '' && password !== '') {
      await signin({email, password});
    }
  }

  return (
    <>
      <Title>로그인</Title>
      <SigninForm onSubmit={handleSigninFormSubmit}>
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

        <Button
          type="submit"
          className={(email==='' || password==='' || signinLoading) ? 'disabled' : ''}
        >
          {signinLoading ? '로그인 중..' : '로그인'}
        </Button>
      </SigninForm>
      <Button className="text" onClick={() => { history.push('/signup') }}>회원 가입</Button>
      {signinError ? <ErrorDiv>{signinError.message ? signinError.message : signinError}</ErrorDiv> : signinData}
    </>
  )
}

const Title = styled.h1`
  text-align: center;
  margin-bottm: 30px;
`;

const SigninForm = styled.form`
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