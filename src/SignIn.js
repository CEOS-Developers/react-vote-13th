import styled from 'styled-components';
import React, { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
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
  width: 60px;
`;

export default function SignIn() {
    const [ID, setID] = useState();
    const [PW, setPW] = useState();
    const [loginData, setLoginData] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['LoginData']);

    useEffect(() => {
        setLoginData({
            "email" : ID,
            "password" : PW,
        });
    },[ID, PW]);  //setState 함수가 비동기로 걸리는데, 이가 왜 문제인지 알아보기

    function handleSubmit(e){
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
        }

        axios(config)
        .then(function(response){
            setCookie('LoginData', response.data);
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.response.data);
        });
    }


    function handleChangeInput_ID(e) {
        setID(e.target.value);
    }

    function handleChangeInput_PW(e) {
        setPW(e.target.value);
    }

    return (
        <Box onSubmit = {handleSubmit}>
            <label>Email</label>
            <Input
                type='email'
                value={ID}
                onChange={handleChangeInput_ID}
            />
            <label>Password</label>
            <Input
                type='password'
                value={PW}
                onChange={handleChangeInput_PW}
            />
            <Button type='submit'> Submit! </Button>
            <Link to = {`/vote`}>
                <Button> Back </Button>
            </Link>
        </Box>
    )
}