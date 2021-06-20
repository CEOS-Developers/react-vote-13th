import { useReducer, useEffect } from 'react';
import axios from 'axios';

const axiosConfig = {
  method: 'get',
  url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates',
  header: {},
};

const axiosVoteConfig = (id) => {
  return {
    method: 'get',
    url: `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}`,
    header: {},
  };
};

const iniitialState = [
  {
    id: '',
    name: '',
    voteCount: '',
  },
];

const voteReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return iniitialState;
    case 'loaded':
      return action.data;
    default:
      return state;
  }
};

const useVote = () => {
  const [candidateList, dispatch] = useReducer(voteReducer, iniitialState);

  const fetchAPI = async () => {
    await axios(axiosConfig).then((res) => {
      dispatch({ type: 'loaded', data: res.data });
    });
  };

  const voteToCandidate = (id) => {
    axios(axiosVoteConfig(id))
      .then((res) => {
        alert(res.data);
        fetchAPI();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dispatch({ type: 'loading' });
    fetchAPI();
  }, []);

  return [candidateList, voteToCandidate];
};

export default useVote;
