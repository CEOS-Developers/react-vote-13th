import React from 'react';
import styled from 'styled-components';
import Rank from './Rank';

const StyledVoteItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 5px 0px;
  border-radius: 5px;
  &:hover {
    background: #F0F6FC;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  margin-right: 8px;
  font-weight: bold;
  font-size: 1.2em;
`;

const VoteCount = styled.div`
  color: gray;
`;

const VoteButton = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background: rgb(1, 90, 206);
  cursor: pointer;
`;

export default function VoteItem({
  rank,
  candidate,
  onVoteButtonClick: handleVoteButtonClick,
}) {
  return (
    <StyledVoteItem>
      <ItemInfo>
        <Rank rank={rank} />
        <Name>{candidate.name}</Name>
        <VoteCount>{`${candidate.voteCount}표`}</VoteCount>
      </ItemInfo>
      <VoteButton data-vote-id={candidate.id} onClick={handleVoteButtonClick}>
        투표
      </VoteButton>
    </StyledVoteItem>
  );
}
