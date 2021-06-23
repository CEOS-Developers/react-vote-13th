import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
      } catch (e) {
        alert(e);
      }
    } else alert('전부 입력해주세요');
  }
  return (
    <div>
      <p>
        email <input value={email} onChange={(e) => handleChange(e, 0)} />
      </p>
      <p>
        pw <input value={password} onChange={(e) => handleChange(e, 1)} />
      </p>
      <p>
        name <input value={name} onChange={(e) => handleChange(e, 2)} />
      </p>
      <button onClick={checkButtonHandle}>확인</button>
    </div>
  );
}
