import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

const SignUp = () => {
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
    try {
      const response = await axios.post(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup',
        {
          email: email,
          password: password,
          name: name,
        }
      );
      console.log(response);
      history.push('/');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div>여기는 SignUp</div>
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
        <label>이름</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={handleNameChange}
        ></input>
        <button>회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
