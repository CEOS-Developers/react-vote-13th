import React from 'react';
import { TrophyFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

const StyledRank = styled.div`
  margin-right: 5px;
  width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Background = styled.div`
  margin-right: 8px;
  & * {
    color: ${(props) => (props.rank === 1 ? 'gold' : 'gray')};
  }
`;

const RankNum = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: black;
`;

export default function Rank(props) {
  
  return (
    <StyledRank>
      <Background rank={props.rank}><TrophyFill /></Background>
      <RankNum>{props.rank}</RankNum>
    </StyledRank>
  );
}
