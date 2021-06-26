import React, { createContext, useMemo, useReducer } from 'react';
import Vote from './Vote.js';
import LogIn from './LogIn';
import SignUp from './SignUp.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export const AppContext = createContext({
  data: [],
  flag: false,
  dispatch: () => {},
});

const initialState = {
  data: [],
  me: {},
  flag: false,
  getCandidatesLoading: false,
  getCandidatesDone: false,
  getCandidatesError: null,
  getVoteLoading: false,
  getVoteDone: false,
  getVoteError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

export const GET_CANDIDATES_REQUEST = 'GET_CANDIDATES_REQUEST';
export const GET_CANDIDATES_SUCCESS = 'GET_CANDIDATES_SUCCESS';
export const GET_CANDIDATES_FAILURE = 'GET_CANDIDATES_FAILURE';

export const GET_VOTE_REQUEST = 'GET_VOTE_REQUEST';
export const GET_VOTE_SUCCESS = 'GET_VOTE_SUCCESS';
export const GET_VOTE_FAILURE = 'GET_VOTE_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_OUT = 'LOG_OUT';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CANDIDATES_REQUEST:
      return {
        ...state,
        getCandidatesLoading: true,
        getCandidatesDone: false,
        getCandidatesError: null,
      };
    case GET_CANDIDATES_SUCCESS:
      action.data.sort((a, b) => {
        return b.voteCount - a.voteCount;
      });
      return {
        ...state,
        getCandidatesLoading: false,
        getCandidatesDone: true,
        data: [...action.data],
      };
    case GET_CANDIDATES_FAILURE:
      return {
        ...state,
        getCandidatesLoading: false,
        getCandidatesError: action.error,
      };
    case GET_VOTE_REQUEST:
      return {
        ...state,
        getVoteLoading: true,
        getVoteDone: false,
        getVoteError: null,
      };
    case GET_VOTE_SUCCESS:
      return {
        ...state,
        getVoteLoading: false,
        getVoteDone: true,
        flag: !state.flag,
      };
    case GET_VOTE_FAILURE:
      return {
        ...state,
        getVoteLoading: false,
        getVoteError: action.error,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: { email: action.email },
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case LOG_OUT:
      return {
        ...state,
        me: {},
        data: [],
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, flag } = state;
  const value = useMemo(() => ({ data, flag, dispatch }), [data, flag]);
  return (
    <AppContext.Provider value={value}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/vote" component={Vote} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
`;
