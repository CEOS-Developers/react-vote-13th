import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?';

function CandidateVotes({ candidate, flipVoteFlag, rank }) {
  function handleVoteButtonClick() {
    axios
      .get(url, {
        params: {
          id: candidate.id,
        },
      })
      .then(function (response) {
        alert(response.data);
        flipVoteFlag();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <CandidateContainer>
      <CandidateRank>{rank}위</CandidateRank>
      <CandidateName>{candidate.name}</CandidateName>
      <CandidateVoteCounts> [{candidate.voteCount}]</CandidateVoteCounts>
      <button onClick={handleVoteButtonClick}>vote</button>
    </CandidateContainer>
  );
}
export default CandidateVotes;

export const CandidateContainer = styled.div`
  text-align: center;
  font-size: 19px;
  margin: 10px;
`;
export const CandidateRank = styled.span`
  margin-right: 40px;
`;
export const CandidateName = styled.span`
  margin-right: 10px;
`;

export const CandidateVoteCounts = styled.span`
  margin-right: 10px;
`;
