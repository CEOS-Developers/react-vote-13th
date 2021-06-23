import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

function VoteButton(props) {
  const [count, setCount] = useState(null);
  const CastVote = async () => {
    const id = props.vote_id;
    try {
      console.log(localStorage.getItem);
      const data = await axios.get(
        `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}`,
        {
          headers: {
            Authorization: localStorage.getItem('response'),
          },
        }
      );
      setCount(data);
      alert('투표가 반영되었습니다.');
    } catch (e) {
      const statusCode = parseInt(e.message.split(' ').pop());
      if (statusCode === 401) {
        alert('로그인을 먼저 진행해주세요.');
        return;
      } else alert('투표 에러가 발생했습니다.');
    }
    props.fetch();
  };
  return <StyledButton onClick={CastVote}>투표</StyledButton>;
}

export default VoteButton;
