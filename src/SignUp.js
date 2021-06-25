import axios from 'axios';
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {
  AppContext,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from './App';
import styled from 'styled-components';

const SignUp = () => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SIGN_UP_REQUEST });
    try {
      await axios.post(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup',
        {
          email: email,
          password: password,
          name: name,
        }
      );
      dispatch({ type: SIGN_UP_SUCCESS });
      alert('회원가입완료');
      history.push('/');
    } catch (err) {
      dispatch({ type: SIGN_UP_FAILURE, error: err.response });
      if (err.response.status === 409) {
        alert('이미 존재하는 Email입니다.');
      } else {
        alert('빈칸없이 작성해주세요.');
      }
    }
  };

  return (
    <SignUpContainer>
      <legend>회원가입</legend>
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
        <label>이름</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={handleNameChange}
        ></input>
        <button>회원가입</button>
      </StyledForm>
    </SignUpContainer>
  );
};

export default SignUp;

const SignUpContainer = styled.fieldset`
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
