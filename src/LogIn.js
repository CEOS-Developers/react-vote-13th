import axios from 'axios';
import React, { useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import {
  AppContext,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from './App.js';
import styled from 'styled-components';

const LogIn = () => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);

  const handleToSignUp = () => {
    history.push('/signup');
  };
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOG_IN_REQUEST });
    try {
      const response = await axios.post(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin',
        {
          email: email,
          password: password,
        }
      );
      dispatch({ type: LOG_IN_SUCCESS, email: email });
      setCookie('Token', response.data, { path: '/' });
      history.push('/vote');
    } catch (err) {
      dispatch({ type: LOG_IN_FAILURE, error: err.response });
      if (err.response.status === 404) {
        alert('Email 또는 password가 일치하지 않습니다');
      } else {
        alert('빈칸없이 작성하세요');
      }
    }
  };
  return (
    <LogInContainer>
      <legend>로그인</legend>
      <StyledForm onSubmit={handleFormSubmit}>
        <label>이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button type="submit">로그인</button>
        <button type="button" onClick={handleToSignUp}>
          회원가입
        </button>
      </StyledForm>
    </LogInContainer>
  );
};

export default LogIn;

const LogInContainer = styled.fieldset`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 2px black;
  padding: 80px;
  & legend {
    margin: 0 auto;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  & input {
    width: 30vw;
    height: 3vh;
  }
  & label {
    padding-top: 10px;
  }
  & button {
    margin-top: 10px;
  }
`;
