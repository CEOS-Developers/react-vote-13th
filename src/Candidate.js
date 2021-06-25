import axios from 'axios';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import {
  GET_VOTE_FAILURE,
  GET_VOTE_REQUEST,
  GET_VOTE_SUCCESS,
  AppContext,
} from './App.js';

const Candidate = ({ rank }) => {
  const { data, dispatch } = useContext(AppContext);
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const history = useHistory();
  const handleButtonClick = async () => {
    let aler;
    dispatch({ type: GET_VOTE_REQUEST });
    try {
      const response = await axios.get(
        `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${data[rank].id}
        `,
        {
          headers: { Authorization: cookie.Token },
        }
      );
      aler = response.data;
      dispatch({ type: GET_VOTE_SUCCESS });
    } catch (err) {
      dispatch({ type: GET_VOTE_FAILURE, error: err.response.data });
      if (err.response.status === 401) {
        alert('다시 로그인 해주세요.');
        history.push('/');
      } else {
        alert('존재하지 않는 후보입니다.');
      }
    }
    alert(aler);
  };

  return (
    <>
      <li>
        <span>{rank + 1}위: </span>
        <span>{data[rank].name}</span>
        <span>[{data[rank].voteCount}표]</span>
        <button onClick={handleButtonClick}>투표</button>
      </li>
    </>
  );
};

export default Candidate;
