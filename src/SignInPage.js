import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

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
      alert('로그인 성공!');
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
  return localStorage.getItem('response') ? (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem('response');
          history.push('/');
        }}
      >
        로그아웃
      </button>
      <Link to="/VotePage">
        <button>Vote Page</button>
      </Link>
    </div>
  ) : (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={onChange}
          ref={Email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          ref={Password}
        />
        <input type="submit" value="Log In" />
      </form>
      <Link to="/SignUpPage">
        <button>Sign Up</button>
      </Link>
      <Link to="/VotePage">
        <button>Vote Page</button>
      </Link>
    </div>
  );
}

export default SignInPage;
