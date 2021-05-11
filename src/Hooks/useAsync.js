import { useEffect, useReducer } from 'react'

function asyncReducer(state, action) {
  switch(action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`voteReducer: Unhandled action type: ${action.type}`);
  }
}

export default function useAsync(callback, deps=[]) {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchData = async (params=null) => {
    dispatch({ type: 'LOADING' });
    try {
      let data = null;
      if(params) {
        data = await callback(params);
      } else {
        data = await callback();
      }
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, deps)

  return [state, fetchData];
}
