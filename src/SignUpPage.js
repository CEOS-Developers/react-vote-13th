import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SignUpPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Email = useRef();
  const Password = useRef();
  const Name = useRef();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'email':
        setUserEmail(value);
        break;
      case 'password':
        setUserPassword(value);
        break;
      case 'name':
        setUserName(value);
        break;
      default:
        break;
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    Email.current.value = '';
    Password.current.value = '';
    Name.current.value = '';
    postSignUp();
  };

  const postSignUp = async () => {
    try {
      const url =
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup';
      const info = { email: userEmail, password: userPassword, name: userName };
      setError();
      const res = await axios.post(url, info);
      setLoading(true);
      alert('회원가입이 성공적으로 완료되었습니다!');
    } catch (e) {
      const statusCode = parseInt(e.message.split(' ').pop());
      switch (statusCode) {
        case 400:
          alert('사용자 정보를 모두 입력해주세요.');
          break;
        case 409:
          alert('이미 존재하는 이메일 또는 이름입니다. 다시 입력해주세요.');
          break;
        default:
          setError(e);
          break;
      }
    }
    setLoading(false);
  };

  if (loading) return <div>회원가입 처리중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <SignUpTemplateBlock>
      <StyledHeader>14기 프론트 팀장 투표</StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledLink to="/">Click here to Log In</StyledLink>
        <StyledInput
          name="email"
          type="text"
          placeholder="Email"
          onChange={onChange}
          ref={Email}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          ref={Password}
        />
        <StyledInput
          name="name"
          type="name"
          placeholder="Name"
          onChange={onChange}
          ref={Name}
        />
        <StyledButton type="submit">Sign Up</StyledButton>
      </StyledForm>
    </SignUpTemplateBlock>
  );
}

const SignUpTemplateBlock = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #cbc3e3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledHeader = styled.div`
  text-align: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 360px;
  padding: 2rem;
  background: white;
  border-radius: 3px;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  float: right;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin: 0.5rem;
  display: inline-block;
  border: 0.1rem solid lightgrey;
  &::placeholder {
    color: #a8a8a8;
    letter-spacing: 0.07rem;
  }
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const StyledButton = styled.button`
  width: 7.5rem;
  height: 3rem;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
  background: #e6e6e6;
`;

export default SignUpPage;
