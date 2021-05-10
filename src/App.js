import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import VoteItem from './VoteItem';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
    background: lightgray;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  background: white;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottm: 30px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function voteReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`voteReducer: Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(voteReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchVotes = async () => {
    if(!state.loading) dispatch({ type: 'LOADING' });
    try {
      const res = await axios.get(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
      );
      dispatch({
        type: 'SUCCESS',
        data: res.data,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR',
        error: e,
      });
    }
  };

  useEffect(() => {
    fetchVotes();
    // eslint-disable-next-line
  }, []);

  const handleVoteButtonClick = async (e) => {
    const { voteId } = e.target.dataset;
    dispatch({ type: 'LOADING' });
    try {
      // GET 'Vote' API call
      const voteResponse = await axios.get(
        `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${voteId}`
      );
      // 투표 결과 alert
      alert(voteResponse.data);
      fetchVotes();
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  const { loading, data: candidates, error } = state;

  let content = null;
  if (loading) {
    content = <Loading>데이터 로딩중...</Loading>;
  } else if (error) {
    content = <div>error.name + ": " + error.message</div>;
  } else if (candidates) {
    content = candidates
      .sort((firstEl, secondEl) => secondEl.voteCount - firstEl.voteCount)
      .map((candidate, idx) => {
        return (
          <VoteItem
            rank={idx + 1}
            candidate={candidate}
            onVoteButtonClick={handleVoteButtonClick}
          />
        );
      });
  } else {
    content = null;
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Title>13기 FE 투표</Title>
          {content}
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
