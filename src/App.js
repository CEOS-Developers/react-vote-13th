import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const axiosConfig = {
    method: 'get',
    url:
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates',
    header: {},
  };

  const axiosVoteConfig = (id) => {
    return {
      method: 'get',
      url: `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}`,
      header: {},
    };
  };

  const [candidateList, setCandidateList] = useState([
    {
      id: '',
      name: '',
      voteCount: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchAPI = async () => {
    setLoading(true);
    await axios(axiosConfig)
      .then((response) => {
        setCandidateList(response.data);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const voteToCandidate = (candidateId) => {
    axios(axiosVoteConfig(candidateId))
      .then((response) => {
        alert(response.data);
      })
      .then(() => {
        fetchAPI();
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const list = candidateList
    .sort((item1, item2) => {
      if (item1.voteCount < item2.voteCount) {
        return 1;
      } else if (item1.voteCount > item2.voteCount) {
        return -1;
      } else return 0;
    })
    .map((item, index) => {
      return (
        <SingleCandidateItem key={item.id}>
          <CandidateRank>{index + 1}</CandidateRank>
          <CandidateName>{item.name}</CandidateName>
          <CandidateVotes>{item.voteCount}</CandidateVotes>
          <VoteButton onClick={() => voteToCandidate(item.id)}>vote</VoteButton>
        </SingleCandidateItem>
      );
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div>14th FE leader vote</div>
      {list}
    </Fragment>
  );
}

const Candidates = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SingleCandidateItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 50px;
  margin: 10px;
`;

const CandidateRank = styled.div`
  font-size: 12px;
`;

const CandidateName = styled.div`
  font-size: 15px;
`;

const CandidateVotes = styled.div`
  font-size: 12px;
`;

const VoteButton = styled.button`
  width: 20px;
  font-size: 12px;
  border-radius: 9999px;

  &:focus {
    outline: none;
  }
`;

export default App;
