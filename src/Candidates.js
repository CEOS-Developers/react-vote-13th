import React, { Fragment } from 'react';
import styled from 'styled-components';

const Candidates = (props) => {
  const { candidateList, handleVote } = props;

  const list = candidateList
    .sort((item1, item2) => {
      if (item1.voteCount < item2.voteCount) {
        return 1;
      } else if (item1.voteCount > item2.voteCount) {
        return -1;
      } else return 0;
    })
    .map((item, index) => {
      return (
        <SingleCandidateItem key={item.id}>
          <CandidateRank>{index + 1}</CandidateRank>
          <CandidateName>{item.name}</CandidateName>
          <CandidateVotes>{item.voteCount}</CandidateVotes>
          <VoteButton onClick={() => handleVote(item.id)}>vote</VoteButton>
        </SingleCandidateItem>
      );
    });

  return <>{list}</>;
};

const SingleCandidateItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 50px;
  margin: 10px;
`;

const CandidateRank = styled.div`
  font-size: 12px;
`;

const CandidateName = styled.div`
  font-size: 15px;
`;

const CandidateVotes = styled.div`
  font-size: 12px;
`;

const VoteButton = styled.button`
  width: 20px;
  font-size: 12px;
  border-radius: 9999px;

  &:focus {
    outline: none;
  }
`;

export default Candidates;
