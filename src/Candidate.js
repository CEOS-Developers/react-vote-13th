import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?';

function CandidateVotes({ candidate, flipVoteFlag }) {
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
    <div>
      <p>
        {candidate.name}
        {candidate.voteCount}
        <button onClick={handleVoteButtonClick}>vote</button>
      </p>
    </div>
  );
}
export default CandidateVotes;
