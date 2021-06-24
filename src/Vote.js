import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import Candidate from './Candidate.js';
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

const StyledUl = styled.ul`
  list-style: none;
  text-align: center;
`;

const Title = styled.div`
  color: pink;
  font-size: 25px;
  text-align: center;
`;

export const VoteContext = createContext({
  data: [],
  flag: false,
  dispatch: () => {},
});

const initialState = {
  data: [],
  flag: false,
  getCandidatesLoading: false,
  getCandidatesDone: false,
  getCandidatesError: null,
  getVoteLoading: false,
  getVoteDone: false,
  getVoteError: null,
};

export const GET_CANDIDATES_REQUEST = 'GET_CANDIDATES_REQUEST';
export const GET_CANDIDATES_SUCCESS = 'GET_CANDIDATES_SUCCESS';
export const GET_CANDIDATES_FAILURE = 'GET_CANDIDATES_FAILURE';

export const GET_VOTE_REQUEST = 'GET_VOTE_REQUEST';
export const GET_VOTE_SUCCESS = 'GET_VOTE_SUCCESS';
export const GET_VOTE_FAILURE = 'GET_VOTE_FAILURE';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CANDIDATES_REQUEST:
      return {
        ...state,
        getCandidatesLoading: true,
        getCandidatesDone: false,
        getCandidatesError: null,
      };
    case GET_CANDIDATES_SUCCESS:
      action.data.sort((a, b) => {
        return b.voteCount - a.voteCount;
      });
      return {
        ...state,
        getCandidatesLoading: false,
        getCandidatesDone: true,
        data: [...action.data],
      };
    case GET_CANDIDATES_FAILURE:
      return {
        ...state,
        getCandidatesLoading: false,
        getCandidatesError: action.error,
      };
    case GET_VOTE_REQUEST:
      return {
        ...state,
        getVoteLoading: true,
        getVoteDone: false,
        getVoteError: null,
      };
    case GET_VOTE_SUCCESS:
      return {
        ...state,
        getVoteLoading: false,
        getVoteDone: true,
        flag: !state.flag,
      };
    case GET_VOTE_FAILURE:
      return {
        ...state,
        getVoteLoading: false,
        getVoteError: action.error,
      };
    default:
      return state;
  }
};

const Vote = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, flag } = state;
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  const history = useHistory();
  const value = useMemo(() => ({ data, dispatch }), [data]);

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

  const handleButtonClick = () => {
    removeCookie('Token');
    history.push('/');
  };
  return (
    <>
      <Title>대망의 CEOS 프로튼엔드 14기 개발팀장 투표</Title>
      <VoteContext.Provider value={value}>
        <StyledUl>
          {state.data.map((v, i) => (
            <Candidate key={data[i].id} rank={i} />
          ))}
        </StyledUl>
        <button onClick={handleButtonClick}>로그아웃</button>
      </VoteContext.Provider>
    </>
  );
};

export default Vote;
