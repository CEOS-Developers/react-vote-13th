import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [candidates, setCandidates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getVotes() {
    try {
      if(!loading) setLoading(true);
      const response = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates');
      setCandidates(response.data);
    } catch (e) {
      setError(e);
    } finally {
      if(loading) setLoading(false);
    }
  }

  async function doVotes(candidateId) {
    try {
      setLoading(true);
      const response = await axios.get(`http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${candidateId}`);
      alert(response.data);
      getVotes();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  function compareFunction(a, b) {
    return b.voteCount - a.voteCount;
  }

  useEffect(() => {
    getVotes();
    // eslint-disable-next-line
  }, [])

  if(!candidates) return null;
  if(loading) return <div>Loading...</div>;
  if(error) return <div>{`${error.name}: ${error.message}`}</div>;

  return (
    <div>
      <h1>13기 FE 투표</h1>
      {candidates
        .sort(compareFunction)
        .map((candidate, idx) => (
            <p>
              {`[${idx+1}등]\t${candidate.name} (${candidate.voteCount}표)`} 
              <button onClick={() => { doVotes(candidate.id) }}>투표</button>
            </p>
          )
        )}
    </div>
  );
}

export default App;
