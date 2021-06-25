import styled from 'styled-components';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

var axios = require('axios');

const Box = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  width: 200px;
`;

const Button = styled.button`
  margin-top: 5px;
  width: 50px;
`;

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData({
        "email" : email,
        "password" : password,
        "name" : name
    });
  },[email, password, name]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email === null || password === null || name === null) {
      window.alert('값을 입력해주세요');
      return false;
    }

    setUserData({
      "email": email,
      "password": password,
      "name": name,
    });

    setEmail('');
    setPassword('');
    setName('');

    var config = {
      method: 'post',
      url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup',
      headers: {},
      data: userData,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function handleChangeInput_email(e) {
    setEmail(e.target.value);
  }

  function handleChangeInput_pw(e) {
    setPassword(e.target.value);
  }

  function handleChangeInput_name(e) {
    setName(e.target.value);
  }
  return (
    <Box onSubmit={handleSubmit}>
      <label>email</label>
      <Input
        type="email"
        value={email}
        placeholder="please enter a email"
        onChange={handleChangeInput_email}
      >
        {/* @ <select>
                <option>naver.com</option>
                <option>gmail.com</option>
                <option>daum.net</option>
                </select> */}
      </Input>
      <label>password</label>
      <Input
        type="password"
        value={password}
        placeholder="please enter a password"
        onChange={handleChangeInput_pw}
      />
      <label>name</label>
      <Input
        type="text"
        value={name}
        placeholder="please enter your name"
        onChange={handleChangeInput_name}
      />
      <Button type="submit">
        전송
      </Button>
      <Link to = {`/vote`}>
        <Button> Back </Button>
      </Link>
    </Box>
  );
}
