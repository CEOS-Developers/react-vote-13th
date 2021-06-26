import styled from 'styled-components';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SignIn, {
  Top,
  Container,
  IndexImg,
  RightBottomTag,
  LabelBottom,
  Input,
} from './SignIn';

var axios = require('axios');

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 38vh;
`;

const ButtonSignUp = styled.button`
  font-family: serif;
  font-weight: bold;
  color: white;
  background: black;
  border-radius: 15px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 80px;
  padding-top: 3px;
  padding-bottom: 5px;
  border: none;
  margin-top: 15px;
`;

const ButtonGoBack = styled.button`
  margin-top: 5vh;
  font-family: serif;
  font-weight: bold;
  background: transparent;
  border: none;
`;

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [userData, setUserData] = useState({});
  let history = useHistory();

  useEffect(() => {
    setUserData({
      email: email,
      password: password,
      name: name,
    });
  }, [email, password, name]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email === null || password === null || name === null) {
      window.alert('값을 입력해주세요');
      return false;
    }

    setUserData({
      email: email,
      password: password,
      name: name,
    });

    console.log(userData);

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
        history.push('/');
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

  // function selectEmail(e) {
  //   var $ele = $(ele);
  //   var $email2 = $('input[name=email2]');
  //   if ($ele.val() == '1') {
  //     $email2.attr('readonly', false);
  //     $email2.val('');
  //   } else {
  //     $email2.attr('readonly', true);
  //     $email2.val($ele.val());
  //   }
  // }
  
  const CreateAccountForm = () => {
    return(
      <Fragment>
        <LabelBottom>Email</LabelBottom>
          <Input
            type="email"
            value={email}
            placeholder="please enter a email"
            onChange={handleChangeInput_email}
          >
            {/* <select name="select_email" onChange={selectEmail(this)}>
              {' '}
              <option value="" selected>
                선택하세요
              </option>{' '}
              <option value="naver.com">naver.com</option>{' '}
              <option value="gmail.com">gmail.com</option>{' '}
              <option value="hanmail.com">hanmail.com</option>{' '}
              <option value="1">직접입력</option>{' '}
            </select> */}
          </Input>
          <LabelBottom>Password</LabelBottom>
          <Input
            type="password"
            value={password}
            placeholder="please enter a password"
            onChange={handleChangeInput_pw}
          />
          <LabelBottom>Name</LabelBottom>
          <Input
            type="text"
            value={name}
            placeholder="please enter your name"
            onChange={handleChangeInput_name}
          />
          <ButtonSignUp type="submit"> submit ! </ButtonSignUp>
      </Fragment>
    )
  }
  return (
    <Top>
      <Container>
        <IndexImg src={process.env.PUBLIC_URL + './design/index_mark.png'} />
        <Form onSubmit={handleSubmit}>
          {CreateAccountForm()}
          <Link to={`/`}>
            <ButtonGoBack> * click here to go back </ButtonGoBack>
          </Link>
        </Form>
      </Container>
      <RightBottomTag />
    </Top>
  );
}
