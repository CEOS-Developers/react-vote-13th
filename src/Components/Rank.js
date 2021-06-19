import React from 'react';
import { TrophyFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

export default function Rank({rank}) {
  // 득표수 1,2,3위는 트로피 아이콘 표시. 색상은 각각 금, 은, 동
  const TROPHY_COLOR = ["#FFD700", "#C0C0C0", "#CD7F32"]

  return (
    <StyledRank>
      <Trophy color={rank <= 3 ? TROPHY_COLOR[rank-1] : 'white'}>
        {rank <= 3 ? <TrophyFill /> : ''}
      </Trophy>
      <RankNum>{rank}</RankNum>
    </StyledRank>
  );
}

const StyledRank = styled.div`
  margin-right: 5px;
  width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Trophy = styled.div`
  width: 25px;
  & * {
    color: ${(props) => props.color};
  }
`;

const RankNum = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: black;
`;
