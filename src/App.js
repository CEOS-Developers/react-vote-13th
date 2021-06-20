import React, { Fragment } from 'react';
import useVote from './useVote';
import Candidates from './Candidates';

function App() {
  const [candidateList, voteToCandidate] = useVote();

  return (
    <Fragment>
      <div>14th FE leader vote</div>
      <Candidates candidateList={candidateList} handleVote={voteToCandidate} />
    </Fragment>
  );
}

export default App;
