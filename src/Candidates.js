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

  return <ListContainer>{list}</ListContainer>;
};

const ListContainer = styled.ul`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

const SingleCandidateItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 2px solid royalblue;
  width: 400px;
  height: 50px;
  margin: 10px;

  &:nth-child(1) {
    border-color: gold;

    h1 {
      color: gold;
    }
  }

  &:nth-child(2) {
    border-color: silver;

    h1 {
      color: silver;
    }
  }

  &:nth-child(3) {
    border-color: sienna;

    h1 {
      color: sienna;
    }
  }
`;

const CandidateRank = styled.h1`
  font-size: 25px;
  margin-left: 20px;
  color: royalblue;
`;

const CandidateName = styled.div`
  font-size: 15px;
`;

const CandidateVotes = styled.div`
  font-size: 12px;
`;

const VoteButton = styled.button`
  width: 45px;
  height: 40px;
  text-align: center;
  color: royalblue;
  background-color: white;
  font-weight: bolder;
  border: 2px solid royalblue;
  font-size: 15px;
  border-radius: 10px;
  margin-right: 5px;
  transition: all 0.15s ease-in;

  &:hover {
    color: white;
    background-color: royalblue;
  }

  &:focus {
    outline: none;
  }
`;

export default Candidates;
