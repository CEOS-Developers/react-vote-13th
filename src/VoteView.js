import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CandidateVotes from './Candidate';
const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates';

function VoteView() {
  const [candidates, setCandidates] = useState([]);
  const [voteFlag, setVoteFlag] = useState(false);

  function flipVoteFlag() {
    setVoteFlag(!voteFlag);
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(url);
        setCandidates(response.data);
      } catch (e) {
        alert(e);
      }
    };

    fetchCandidates();
  }, [voteFlag]);

  const sortedCandidates = candidates.sort((a, b) => {
    return b.voteCount - a.voteCount;
  });
  return (
    <Container>
      <Title>CEOS 13기 FRONT 운영진 투표 &gt;.0</Title>
      <Container>순위 이름 득표수</Container>
      {sortedCandidates.map((candidate) => (
        <CandidateVotes
          candidate={candidate}
          key={candidate.id}
          flipVoteFlag={flipVoteFlag}
          rank={sortedCandidates.indexOf(candidate) + 1}
        />
      ))}
    </Container>
  );
}

export default VoteView;

const Container = styled.div`
  text-align: center;
`;
const Title = styled.h1``;
