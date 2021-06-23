import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

function SignInPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const Email = useRef();
  const Password = useRef();

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
      default:
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    Email.current.value = '';
    Password.current.value = '';
    postSignIn();
  };

  const postSignIn = async () => {
    try {
      const url =
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin';
      const info = { email: userEmail, password: userPassword };

      setError();
      const res = await axios.post(url, info);
      setLoading(true);
      localStorage.setItem('response', res.data);
    } catch (e) {
      const statusCode = parseInt(e.message.split(' ').pop());
      switch (statusCode) {
        case 400:
          alert('사용자 정보를 모두 입력해주세요.');
          break;
        case 404:
          alert('사용자 정보가 존재하지 않습니다.');
          break;
        default:
          setError(e);
          break;
      }
    }
    setLoading(false);
  };
  if (loading) return <div>로그인 처리중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <SignInTemplateBlock>
      <StyledHeader>14기 프론트 팀장 투표</StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        {localStorage.getItem('response') ? (
          <>
            <StyledButton
              onClick={() => {
                localStorage.removeItem('response');
                history.push('/');
              }}
            >
              Log Out
            </StyledButton>
            <Link to="/VotePage">
              <StyledButton>Vote Page</StyledButton>
            </Link>
          </>
        ) : (
          <>
            <StyledLink to="/SignUpPage">Click here to Sign Up</StyledLink>
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
            <StyledButton type="submit">Log In</StyledButton>
          </>
        )}
      </StyledForm>
    </SignInTemplateBlock>
  );
}

const SignInTemplateBlock = styled.div`
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

const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin: 0.5rem;
  display: inline-block;
  border: 0.1rem solid lightgrey;
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

const StyledLink = styled(Link)`
  font-size: 1rem;
  float: right;
  margin-bottom: 1rem;
`;
export default SignInPage;
