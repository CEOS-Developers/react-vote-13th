import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  let history = useHistory();

  function handleChange(e, inputID) {
    if (inputID === 0) setEmail(e.target.value);
    else if (inputID === 1) setPassword(e.target.value);
    else setName(e.target.value);
  }
  async function checkButtonHandle() {
    if (email && password && name) {
      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
          name: name,
        });
        alert(response.data);
        history.push('/signin');
      } catch (error) {
        if (error.response.status === 409) alert('이미 가입된 이메일입니다.');
        else if (error.response.status === 400) alert('잘못된 요청입니다.');
        else alert(error.response.data);
      }
    } else alert('빈칸 없이 입력해주세요');
  }
  return (
    <Container>
      <Title>회원가입</Title>
      <InputText>
        email
        <InputForm value={email} onChange={(e) => handleChange(e, 0)} />
      </InputText>
      <InputText>
        pw
        <InputForm value={password} onChange={(e) => handleChange(e, 1)} />
      </InputText>
      <InputText>
        name <InputForm value={name} onChange={(e) => handleChange(e, 2)} />
      </InputText>
      <button onClick={checkButtonHandle}>확인</button>
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
