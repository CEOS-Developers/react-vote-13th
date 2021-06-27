import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const url =
  'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?';

function CandidateVotes({ candidate, flipVoteFlag, rank, loginCookie }) {
  let history = useHistory();
  function handleVoteButtonClick() {
    axios
      .get(url, {
        params: {
          id: candidate.id,
        },
        headers: {
          authorization: `${loginCookie.loginCookie}`,
        },
      })
      .then(function (response) {
        alert(response.data);
        flipVoteFlag();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          alert('로그인 후 투표 가능합니다.');
          history.push('/signin');
        } else if (error.response.status === 404)
          alert('해당 후보는 존재하지 않습니다.');
        else alert(error.response.data);
      });
  }
  return (
    <CandidateContainer>
      <CandidateRank>{rank}위</CandidateRank>
      <CandidateName>{candidate.name}</CandidateName>
      <CandidateVoteCounts> [{candidate.voteCount}]</CandidateVoteCounts>
      <VoteButton onClick={handleVoteButtonClick} r={194} g={147} b={216}>
        vote
      </VoteButton>
    </CandidateContainer>
  );
}
export default CandidateVotes;

export const CandidateContainer = styled.div`
  text-align: center;
  font-size: 19px;
  margin: 10px;
  margin-bottom: 15px;
`;
export const CandidateRank = styled.span`
  margin-right: 40px;
`;
export const CandidateName = styled.span`
  margin-right: 10px;
`;

export const CandidateVoteCounts = styled.span`
  margin-right: 10px;
`;

export const Button = styled.button`
  border-radius: 28px;
  display: inline-block;
  margin-right: 30px;
  font-size: 15px;
  width: 85px;
  height: 35px;
  text-decoration: none;
  background-color: rgba(
    ${(props) => props.r},
    ${(props) => props.g},
    ${(props) => props.b},
    0.7
  );
  &:hover {
    background-color: rgba(
      ${(props) => props.r},
      ${(props) => props.g},
      ${(props) => props.b},
      1
    );
  }
`;
const VoteButton = styled(Button)`
  border: #6a1b9a 1px solid;
  color: #6a1b9a;
  width: 50px;
  height: 23px;
  font-size: 12px;
  margin: auto;
`;
