import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

function VoteButton(props) {
  const history = useHistory();
  const CastVote = async () => {
    const id = props.vote_id;
    try {
      const data = await axios.get(
        `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}`,
        {
          headers: {
            Authorization: getWithExpiry('currentUser'),
          },
        }
      );
      alert('투표가 반영되었습니다.');
    } catch (e) {
      const statusCode = parseInt(e.message.split(' ').pop());
      if (statusCode === 401) {
        alert('로그인을 먼저 진행해주세요.');
        history.push('/VotePage');
        return;
      } else alert('투표 에러가 발생했습니다.');
    }
    props.fetch();
  };
  return <StyledButton onClick={CastVote}>투표</StyledButton>;
}

const StyledButton = styled.button`
  display: inline-flex;
  border: none;
  border-radius: 4px;
  background-color: #bf80ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

export default VoteButton;
