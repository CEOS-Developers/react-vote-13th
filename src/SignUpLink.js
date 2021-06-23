import React, { useState } from 'react';
import axios from 'axios';

function SignUpLink() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    enrollSignUpInfo();
  };

  const enrollSignUpInfo = async () => {
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={userEmail}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={onChange}
        />
        <input
          name="name"
          type="name"
          placeholder="Name"
          value={userName}
          onChange={onChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUpLink;
