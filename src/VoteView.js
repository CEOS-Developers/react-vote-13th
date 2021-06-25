import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CandidateVotes from './Candidate';
import { Link } from 'react-router-dom';
import { Button } from './Candidate';

const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates';

function LoginoutButton({ isLogined, handleLogoutButton }) {
  if (isLogined) {
    return (
      <UserButton onClick={handleLogoutButton} r={128} g={203} b={196}>
        로그아웃
      </UserButton>
    );
  } else
    return (
      <Link to="/signin">
        <UserButton r={128} g={203} b={196}>
          로그인
        </UserButton>
      </Link>
    );
}

function VoteView({ loginCookie, removeLoginCookie }) {
  const [candidates, setCandidates] = useState([]);
  const [voteFlag, setVoteFlag] = useState(false);
  const [isLogined, setIsLogined] = useState(Boolean(loginCookie.loginCookie));

  function flipVoteFlag() {
    setVoteFlag(!voteFlag);
  }
  function handleLogoutButton() {
    if (isLogined) {
      removeLoginCookie('loginCookie');
      setIsLogined(false);
      alert('로그아웃 되었습니다.');
    } else alert('로그인이 되어있지 않습니다.');
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(url);
        setCandidates(response.data);
      } catch (e) {}
    };

    fetchCandidates();
  }, [voteFlag]);

  const sortedCandidates = candidates.sort((a, b) => {
    return b.voteCount - a.voteCount;
  });

  return (
    <Container>
      <Title>CEOS 13기 FRONT 운영진 투표 &gt;.0</Title>
      <Link to="/signup">
        <UserButton r={207} g={216} b={220}>
          회원가입
        </UserButton>
      </Link>
      <LoginoutButton
        isLogined={isLogined}
        handleLogoutButton={handleLogoutButton}
      ></LoginoutButton>
      <CandidateContainer>
        {sortedCandidates.map((candidate) => (
          <CandidateVotes
            candidate={candidate}
            key={candidate.id}
            flipVoteFlag={flipVoteFlag}
            rank={sortedCandidates.indexOf(candidate) + 1}
            loginCookie={loginCookie}
          />
        ))}
      </CandidateContainer>
    </Container>
  );
}

export default VoteView;

const Container = styled.div`
  text-align: center;
`;

const CandidateContainer = styled.div`
  margin-top: 50px;
`;

const Title = styled.h1``;

const UserButton = styled(Button)`
  border: #00897b 1px solid;
  color: #004d40;
`;
