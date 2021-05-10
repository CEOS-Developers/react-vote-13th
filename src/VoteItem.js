import React from 'react';
import styled from 'styled-components';
import Rank from './Rank';

const StyledVoteItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0px;
  border-radius: 5px;
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

const VoteCount = styled.div``;

const VoteButton = styled.button``;

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
