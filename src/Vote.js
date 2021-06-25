import React, { useContext, useEffect } from 'react';
import Candidate from './Candidate.js';
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import {
  AppContext,
  GET_CANDIDATES_FAILURE,
  GET_CANDIDATES_REQUEST,
  GET_CANDIDATES_SUCCESS,
  LOG_OUT,
} from './App.js';

const StyledUl = styled.ul`
  list-style: none;
  text-align: center;
`;

const Title = styled.div`
  color: pink;
  font-size: 25px;
  text-align: center;
`;

const StyledButton = styled.button`
  width: 20vw;
  margin: 20px;
`;

const Vote = () => {
  const { data, flag, dispatch } = useContext(AppContext);
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  const history = useHistory();

  const fetchCandidates = async () => {
    dispatch({ type: GET_CANDIDATES_REQUEST });
    try {
      const response = await axios.get(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
      );
      dispatch({ type: GET_CANDIDATES_SUCCESS, data: response.data });
    } catch (err) {
      dispatch({ type: GET_CANDIDATES_FAILURE, error: err.response });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [flag]);

  const handleLogOutClick = () => {
    dispatch({ type: LOG_OUT });
    removeCookie('Token');
    history.push('/');
  };
  return (
    <>
      <Title>대망의 CEOS 프로튼엔드 14기 개발팀장 투표</Title>
      <StyledUl>
        {data.map((v, i) => (
          <Candidate key={data[i].id} rank={i} />
        ))}
        <StyledButton onClick={handleLogOutClick}>로그아웃</StyledButton>
      </StyledUl>
    </>
  );
};

export default Vote;
