import axios from 'axios';
import { useReducer } from 'react';

const axiosSignupConfig = (userValue) => {
  return {
    method: 'post',
    url: 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup',
    headers: {},
    data: userValue,
  };
};

const initialSignupFormValue = {
  email: '',
  password: '',
  name: '',
};

const signupFieldReducer = (state, action) => {
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

const useSignup = () => {
  const [signupValue, dispatch] = useReducer(
    signupFieldReducer,
    initialSignupFormValue
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    axios(axiosSignupConfig(signupValue))
      .then((res) => {
        alert(res.data);
        window.location.replace('/vote');
      })
      .catch((err) => {
        alert(err.data);
        dispatch({ type: '' });
      });
  };

  return [signupValue, dispatch, handleSubmit];
};

export default useSignup;
