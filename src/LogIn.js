import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    try {
      const response = await axios.post(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin',
        {
          email: email,
          password: password,
        }
      );

      console.log(response);
      history.push('/vote');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>여기는 LogIn</div>
      <form onSubmit={handleFormSubmit}>
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
      </form>
    </>
  );
};
export default LogIn;
