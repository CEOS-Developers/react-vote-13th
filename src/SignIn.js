import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin';
export default function SignIn({ setLoginCookie }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  function handleChange(e, inputID) {
    if (inputID === 0) setEmail(e.target.value);
    else if (inputID === 1) setPassword(e.target.value);
  }
  async function handleButtonCheck() {
    if (email && password) {
      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
        });
        alert(response.data);
        setLoginCookie('loginCookie', response.data);
        history.push('/');
      } catch (error) {
        if (error.response.status === 404)
          alert('로그인에 실패하였습니다. 잘못된 이메일 혹은 비밀번호');
        else if (error.response.status === 400) alert('잘못된 요청입니다.');
        else alert(error.response.data);
      }
    } else alert('빈칸 없이 입력해주세요');
  }
  return (
    <Container>
      <Title>로그인</Title>
      <InputText>
        email
        <InputForm value={email} onChange={(e) => handleChange(e, 0)} />
      </InputText>
      <InputText>
        password
        <InputForm value={password} onChange={(e) => handleChange(e, 1)} />
      </InputText>
      <button onClick={handleButtonCheck}>로그인하기</button>
      <Link to="/signup">
        <button r={207} g={216} b={220}>
          회원가입
        </button>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  text-align: center;
`;
const Title = styled.h1``;

const InputForm = styled.input`
  position: absolute;
  left: 7vw;
  z-index: 2;
`;
const InputText = styled.p`
  text-align: left;
  position: relative;
  left: 40vw;
`;
