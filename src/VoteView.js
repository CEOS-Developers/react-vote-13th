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
    <div>
      <h1>CEOS 13기 FRONT 운영진 투표 &gt;.0</h1>
      {sortedCandidates.map((candidate) => (
        <CandidateVotes
          candidate={candidate}
          key={candidate.id}
          flipVoteFlag={flipVoteFlag}
        />
      ))}
    </div>
  );
}

export default VoteView;
