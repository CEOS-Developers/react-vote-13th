import { useReducer } from 'react';

const initAuthAxiosConfig = {
  method: 'POST',
  header: {},
};

const axiosAuthConfigReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return {
        ...state,
        url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup',
        data: action.data,
      };

    case 'signin':
      return {
        ...state,
        url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signin',
        data: action.data,
      };

    default:
      return state;
  }
};

const authFieldReducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.data };
    case 'password':
      return { ...state, password: action.data };
    case 'name':
      return { ...state, name: action.data };
    default:
      return state;
  }
};

const useAxiosConfig = () => {
  const [axiosConfig, axiosDispatch] = useReducer(
    axiosAuthConfigReducer,
    initAuthAxiosConfig
  );

  return [axiosConfig, axiosDispatch];
};

export { authFieldReducer, useAxiosConfig };
