import axios from 'axios';
import React, { useContext } from 'react';
import {
  GET_VOTE_FAILURE,
  GET_VOTE_REQUEST,
  GET_VOTE_SUCCESS,
  VoteContext,
} from './Vote';

const Candidate = ({ rank }) => {
  const { data, dispatch } = useContext(VoteContext);

  const handleOnClick = async () => {
    dispatch({ type: GET_VOTE_REQUEST });
    try {
      const response = await axios.get(
        `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${data[rank].id}
            `
      );
      console.log(response.data);
      dispatch({ type: GET_VOTE_SUCCESS, data: response.data });
    } catch (err) {
      dispatch({ type: GET_VOTE_FAILURE, error: err.response });
    }
  };

  return (
    <li>
      <span>{rank + 1}위: </span>
      <span>{data[rank].name}</span>
      <span>[{data[rank].voteCount}표]</span>
      <button onClick={handleOnClick}>투표</button>
    </li>
  );
};

export default Candidate;
