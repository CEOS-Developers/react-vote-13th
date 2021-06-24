import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
      } catch (e) {
        alert(e);
      }
    } else alert('전부 입력해주세요');
  }
  return (
    <div>
      <p>
        email
        <input value={email} onChange={(e) => handleChange(e, 0)} />
      </p>
      <p>
        password
        <input value={password} onChange={(e) => handleChange(e, 1)} />
      </p>
      <button onClick={handleButtonCheck}>확인</button>
    </div>
  );
}
