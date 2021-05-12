import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CandidateVotes({ name, voteCount }) {
  return (
    <p>
      {name}
      {voteCount}
    </p>
  );
}
export default CandidateVotes;
