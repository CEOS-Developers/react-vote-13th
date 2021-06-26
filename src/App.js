import React from 'react';
import useVote from './useVote';
import Candidates from './Candidates';
import styled from 'styled-components';

function App() {
  const [candidateList, voteToCandidate] = useVote();

  return (
    <VoteViewContainer>
      <PageTitle>14th FE leader vote</PageTitle>
      <Candidates candidateList={candidateList} handleVote={voteToCandidate} />
    </VoteViewContainer>
  );
}

const VoteViewContainer = styled.div`
  width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  color: royalblue;
  margin: auto;
  font-weight: bolder;
  font-family: Helvetica;
`;

export default App;
