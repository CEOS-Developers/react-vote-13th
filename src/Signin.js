import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const StyledInput = styled.input`
  height: 2rem;
  flex: 8 0 auto;

  border: 1px solid lightgray;
  border-radius: 100vh;
  outline: none;

  margin: 0.3rem 0;
  padding: 0 1.1em;
`;

function Signin({ setJwt }) {
  const email = useRef();
  const pw = useRef();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailText = email.current.value;
    const pwText = pw.current.value;

    if (emailText === '') {
      alert('이메일을 입력해주세요');
      return;
    }

    if (pwText === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }
    try {
      const result = await axios.post(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin',
        {
          email: emailText,
          password: pwText,
        }
      );

      if (result) {
        setJwt(result.data);
        history.push('/');
      }
    } catch (e) {
      console.log(e);
      alert('로그인에 실패하였습니다.');
    }
  };
  return (
    <StyledContainer>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput placeholder="Email" ref={email} />
        <StyledInput type="password" placeholder="PW" ref={pw} />
        <StyledInput type="submit" value="로그인" />
      </StyledForm>
    </StyledContainer>
  );
}

export default Signin;