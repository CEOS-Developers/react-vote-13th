import axios from 'axios';
import React, { useCallback, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAsync from '../Hooks/useAsync';
import VoteItem from './VoteItem';

export default function Vote() {
  const [cookie, , removeCookie] = useCookies(['vote-13th-token', 'vote-13th-email']);
  const history = useHistory();
  const castVoteResultRef = useRef(null);

  const getVoteCountCallback = useCallback(async () => {
    const url = 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates';
    const res = await axios.get(url);
    // 불러온 데이터 득표순 정렬
    if(res.data) {
      // custom compareFunction을 이용, voteCount 기준 내림차순 정렬
      return res.data.sort((a, b) => ( b.voteCount - a.voteCount ));
    }
    return res.data;
  }, [])
  
  const [voteCountStatus, getVotes] = useAsync(getVoteCountCallback, [], true);
  const { loading: voteCountLoading, data: voteCount, error: voteCountError } = voteCountStatus;

  const castVoteCallback = useCallback(async (params) => {
    const { voteId } = params;
    const url = `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${voteId}`;
    const config = { headers: { 'Authorization': cookie['vote-13th-token']} }
    const res = await axios.get(url, config).catch((e) => { throw Error(e.response.status) });

    return res.data;
  }, [cookie])

  const [castVoteStatus, castVote] = useAsync(castVoteCallback, [], false);
  const { loading: castVoteLoading, data: castVoteResponse, error: castVoteError } = castVoteStatus;

  const handleVoteButtonClick = async (e) => {
    const {voteId} = e.target.dataset;
    await castVote({voteId});
    if (castVoteResultRef.current) {
      castVoteResultRef.current.style.visibility = 'visible';
      setTimeout(() => { castVoteResultRef.current.style.visibility = 'hidden'; }, 4000)
    }
    getVotes();
  }

  let candidates = null;
  if (voteCountLoading) {
    candidates = <Loading />
  } else if (voteCountError) {
    candidates = <ErrorDiv />
  } else {
    if (voteCount) {
      candidates = voteCount.map((candidate, idx) => (
        <VoteItem
          key={idx}
          rank={idx + 1}
          candidate={candidate}
          onVoteButtonClick={handleVoteButtonClick}
        />
      ));
    }
  }

  let castVoteResult = null;
  if (castVoteLoading) {
    castVoteResult = 'Loading...'
  } else if (castVoteError) {
    if (castVoteResultRef.current) castVoteResultRef.current.style.color = 'red';
    if (castVoteError.message && castVoteError.message === '401') { 
      castVoteResult = '투표하려면 먼저 로그인하세요'
    } else {
      castVoteResult = castVoteError.message ? castVoteError.message : castVoteError;
    }
  } else {
    if (castVoteResultRef.current) castVoteResultRef.current.style.color = 'black';
    castVoteResult = castVoteResponse;
  }

  const isLoggedIn = 'vote-13th-token' in cookie;
  const handleUserClick = () => {
    if (isLoggedIn) {
      removeCookie('vote-13th-token');
      removeCookie('vote-13th-email');
    } else {
      history.push('/signin');
    }
  }

  return (
    <>
      <Topbar>
        <Title>13기 FE 투표</Title>
        <User onClick={handleUserClick}>{isLoggedIn ? cookie['vote-13th-email'] : '로그인'}</User>
      </Topbar>
      {candidates ? candidates : ''}
      <CastVoteResult ref={castVoteResultRef}>{castVoteResult}</CastVoteResult>
    </>
  )
}

function Loading() {
  return <div>Loading...</div>
}

function ErrorDiv() {
  return <div>Error</div>
}

const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const Title = styled.h1`
  display: block;
  margin: 0;
  padding: 0;
  font-size: 1.4em;
`;

const User = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CastVoteResult = styled.div`
  padding: 8px 10px;
  text-align: center;
`;