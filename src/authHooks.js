import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { authFieldReducer, useAxiosConfig } from './authMixin';

const initialSignupFormValue = {
  email: '',
  password: '',
  name: '',
};

const initialSigninValue = {
  email: '',
  password: '',
};

const useSignup = () => {
  const [signupValue, dispatch] = useReducer(
    authFieldReducer,
    initialSignupFormValue
  );

  const [axiosConfig, axiosDispatch] = useAxiosConfig();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios(axiosConfig)
      .then((res) => {
        alert(res.data);
        window.location.replace('/vote');
      })
      .catch((err) => {
        alert(err.data);
        dispatch({ type: '' });
      });
  };

  useEffect(() => {
    axiosDispatch({ type: 'signup', data: signupValue });
  }, [signupValue]);

  return [signupValue, dispatch, handleSubmit];
};

const useSignin = () => {
  const [signinValue, dispatch] = useReducer(
    authFieldReducer,
    initialSigninValue
  );

  const [axiosConfig, axiosDispatch] = useAxiosConfig();

  const handleLogin = (e) => {
    e.preventDefault();

    axios(axiosConfig)
      .then((res) => {
        alert(res.data);
        window.location.replace('/vote');
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  useEffect(() => {
    axiosDispatch({ type: 'signin', data: signinValue });
  }, [signinValue]);

  return [signinValue, dispatch, handleLogin];
};

export { useSignup, useSignin };
