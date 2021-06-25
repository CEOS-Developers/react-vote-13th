import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import VoteButton from './VoteButton';
import styled from 'styled-components';

function VotePage() {
  const [candidates, setCandidates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const fetchCandidates = async () => {
    try {
      setError(null);
      setCandidates(null);
      setLoading(true);
      const res = await axios.get(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
      );
      res.data.sort((a, b) => b.voteCount - a.voteCount);
      setCandidates(res.data);
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

  const handleClickLogOut = () => {
    localStorage.removeItem('currentUser');
    history.push('/');
  };
  return (
    <VoteTemplateBlock>
      <Container>
        <Header>대망의 CEOS 14기 프론트 팀장 투표</Header>
        {candidates.map((person, index) => (
          <li key={person.id}>
            <text>{index + 1}위</text>
            <text>{person.name}</text>
            <text>[{person.voteCount}표]</text>
            <VoteButton vote_id={person.id} fetch={fetchCandidates}>
              투표
            </VoteButton>
          </li>
        ))}
        <div>
          {localStorage.getItem('currentUser') ? (
            <StyledButton onClick={handleClickLogOut}>로그아웃</StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                history.push('/');
              }}
            >
              로그인
            </StyledButton>
          )}
          <StyledButton
            onClick={() => {
              history.push('/');
            }}
          >
            돌아가기
          </StyledButton>
        </div>
      </Container>
    </VoteTemplateBlock>
  );
}

const VoteTemplateBlock = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #cbc3e3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 23px;
  background: white;
  & li {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  & div {
    flex-direction: row;
  }
  & text {
    margin-right: 2rem;
  }
`;

const Header = styled.div`
  font-size: 32px;
  color: #b3b3ff;
  padding: 2rem;
`;

const StyledButton = styled.button`
  width: 7.5rem;
  height: 3rem;
  margin: 2rem;
  margin-top: 3rem;
  border-radius: 2px;
  border: none;
  background: #e6e6e6;
`;

export default VotePage;
