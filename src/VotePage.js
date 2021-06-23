import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import VoteButton from './VoteButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 23px;
  & li {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

const Header = styled.div`
  font-size: 32px;
  color: #b3b3ff;
  padding: 2rem;
`;

function VotePage() {
  const [candidates, setCandidates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const fetchCandidates = async () => {
    try {
      setError();
      setCandidates();
      setLoading(true);
      const response = await axios.get(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
      );
      response.data.sort((a, b) => b.voteCount - a.voteCount);
      setCandidates(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!candidates) return null;

  const handleClickLogOut = (event) => {
    localStorage.removeItem('response');
    history.push('/');
  };
  return (
    <Wrapper>
      <Header>대망의 CEOS 14기 프론트 팀장 투표</Header>
      {candidates.map((person, index) => (
        <li key={person.id}>
          <rank>
            {index + 1}위 {person.name}
          </rank>
          [{person.voteCount}표]
          <VoteButton vote_id={person.id} fetch={fetchCandidates}>
            투표
          </VoteButton>
        </li>
      ))}
      {localStorage.getItem('response') ? (
        <button onClick={handleClickLogOut}>로그아웃</button>
      ) : (
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          로그인
        </button>
      )}
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        돌아가기
      </button>
    </Wrapper>
  );
}

export default VotePage;
