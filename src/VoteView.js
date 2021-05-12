import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CandidateVotes from './Candidate';
const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates';

function VoteView() {
  const [candidateSet, setCandidateSet] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fatchCandidates = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setCandidateSet(null);
        // loading 상태를 true 로 바꿉니다.
        const response = await axios.get(url);
        setCandidateSet(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
    };

    fatchCandidates();
  }, []);

  if (error) return alert(error);
  if (!candidateSet) return null;

  return (
    <div>
      <h1>CEOS 13기 FRONT 운영진 투표 &gt;.0</h1>
      {candidateSet.map((candidate) => (
        <CandidateVotes
          name={candidate.name}
          voteCount={candidate.voteCount}
          key={candidate.id}
        />
      ))}
    </div>
  );
}

export default VoteView;
