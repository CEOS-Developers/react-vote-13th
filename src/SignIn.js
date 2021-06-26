import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Top = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgb(150, 144, 138);
  justify-content: space-between;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const Container = styled.div`
  flex-grow: 9.5;
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgb(150, 144, 138);
  justify-content: center;
  align-items: center;
`;

const IndexImg = styled.img`
  margin-right: 6vw;
  width: 23em;
  height: 23em;
`;

const TagLabel = styled.label`
  font-family: NewYork;
  font-weight: bold;
  letter-spacing: -1px;
  -webkit-transform: rotate(-90deg);
  -webkit-transform-origin: 0 0;
  -moz-transform: rotate(-90deg);
  -moz-transform-origin: 0 0;
  -ms-transform: rotate(-90deg);
  -ms-transform-origin: 0 0;
  -o-transform: rotate(-90deg);
  -o-transform-origin: 0 0;
  transform: rotate(-90deg);
  transform-origin: 0 0;
`;

const TagImg = styled.img`
  width: 0.9em; 
  margin-right: 0.7vw;
  margin-bottom: 30px;
  margin-top: 60px;
`;

const Label = styled.label`
  font-family: serif; //여기 어뜨캄
  font-weight: bold;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 7px;
  letter-spacing: -1px;
`;

const LabelBottom = styled.label`
  font-family: serif;
  font-weight: bold;
  font-size: 13px;
  margin-top: 5px;
  letter-spacing: -1px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 45vh;
  justify-content: space-around;
`;

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  margin-bottom: 3px;

  border: none;
  background: transparent;
  border-bottom: 0.8px solid;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-family: serif;
  font-weight: bold;
  font-size: 1em;
  letter-spacing: -1px;
  background: transparent;
  width: 70px;
  border: none;
  margin-top: 10px;
  margin-left: 0;
  padding-left: 0;
  text-align: left;
`;

const ButtonSignUp = styled.button`
  font-family: serif;
  font-weight: bold;
  color: white;
  background: black;
  border-radius: 15px;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  padding-bottom: 5px;
  border: none;
  margin-left: 10px;
  margin-top: 15px;
`;

const RightBottomTag = () => {
  return (
    <Tag>
      <TagImg src={process.env.PUBLIC_URL + './design/tag_2021.png'} />
      <TagImg src={process.env.PUBLIC_URL + './design/tag_front.png'} />
      <TagImg src={process.env.PUBLIC_URL + './design/tag_ceos.png'} />
    </Tag>
  );
};

export {
  Top,
  Container,
  IndexImg,
  RightBottomTag,
  LabelBottom,
  Input,
  ButtonSignUp,
};

export default function SignIn() {
  const [ID, setID] = useState();
  const [PW, setPW] = useState();
  const [loginData, setLoginData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['LoginData']);
  let history = useHistory();

  useEffect(() => {
    setLoginData({
      email: ID,
      password: PW,
    });
  }, [ID, PW]); //setState 함수가 비동기로 걸리는데, 이가 왜 문제인지 알아보기

  function handleSubmit(e) {
    e.preventDefault();
    if (ID === null || PW === null) {
      window.alert('값을 입력해주세요');
      return false;
    }

    console.log(loginData);

    setID('');
    setPW('');

    var config = {
      method: 'post',
      url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin',
      headers: {},
      data: loginData,
    };

    axios(config)
      .then(function (response) {
        setCookie('LoginData', response.data);
        console.log(response.data);
        history.push('/vote');
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function handleChangeInput_ID(e) {
    setID(e.target.value);
  }

  function handleChangeInput_PW(e) {
    setPW(e.target.value);
  }

  const LoginForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Label>ID</Label>
        <Input type="email" value={ID} onChange={handleChangeInput_ID} />
        <Label>Password</Label>
        <Input type="password" value={PW} onChange={handleChangeInput_PW} />
        <Button type="submit"> sign in ! </Button>
      </Form>
    );
  };

  const ClickToSignUp = () => {
    return (
      <Form>
        <LabelBottom>* if you don't have an account</LabelBottom>
        <LabelBottom>&nbsp;&nbsp;press the button below</LabelBottom>
        <Link to={`/signup`}>
          <ButtonSignUp> create account </ButtonSignUp>
        </Link>
      </Form>
    );
  };

  return (
    <Top>
      <Container>
        <IndexImg src={process.env.PUBLIC_URL + './design/index_mark.png'} />
        <Box>
          {LoginForm()}
          {ClickToSignUp()}
        </Box>
      </Container>
      <RightBottomTag />
    </Top>
  );
}
