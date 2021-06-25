import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

export default function VoteMain() {

  const [candidates, setCandidates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookie, , ] = useCookies(['vote-token']);

  async function getVotes() {
    try {
      setLoading(true);
      const response = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates');
      setCandidates(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  async function doVotes(candidateId) {
    try {
      setLoading(true);
      const url = `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${candidateId}`;
      const config = {
        headers: {
          'Authorization': cookie['vote-token']
        }
      }
      const response = await axios.get(url, config);
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
    <Container>
      <h1>13기 FE 투표</h1>
      {candidates
        .sort(compareFunction)
        .map((candidate, idx) => (
            <p key={idx}>
              {`[${idx+1}등]\t${candidate.name} (${candidate.voteCount}표)`} 
              <button onClick={() => { doVotes(candidate.id) }}>투표</button>
            </p>
          )
        )
      }

      <Button>
        <Link to='/signIn'>로그인</Link>
      </Button>

      <Button>
       <Link to='/signUp'>회원가입</Link>
      </Button>

    </Container>
  )
}

const Container = styled.div`
  width: 20rem;
  height: 47rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid green;
  font-size: 20px;
  background: #1913;
  z-index: 1;
`;

const Button = styled.button`
  width: 6rem;
  height: 2rem;
  border: 1.5px solid black;
  border-radius: 10px;
  background: lightyellow;
  margin: 0.5rem;
  z-index: 2;
`;