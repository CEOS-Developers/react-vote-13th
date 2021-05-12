import React, {useReducer, createContext, useEffect} from 'react';
import axios from 'axios';

export const VoteContext = createContext({
    data: [],
    dispatch: () =>{},
})

const initialState = {
    data: [],
    getCandidatesLoading: false,
    getCandidatesDone: false,
    getCandidatesError: null,
    getVoteLoading: false,
    getVoteDone: false,
    getVoteError: null,
}

export const GET_CANDIDATES_REQUEST = "GET_CANDIDATES_REQUEST";
export const GET_CANDIDATES_SUCCESS = "GET_CANDIDATES_SUCCESS";
export const GET_CANDIDATES_FAILURE = "GET_CANDIDATES_FAILURE";

export const GET_VOTE_REQUEST = "GET_VOTE_REQUEST";
export const GET_VOTE_SUCCESS = "GET_VOTE_SUCCESS";
export const GET_VOTE_FAILURE = "GET_VOTE_FAILURE";

const reducer = (state, action) => {
    switch(action.type){
        case GET_CANDIDATES_REQUEST:
            return{
                ...state,
                getCandidatesLoading: true,
                getCandidatesDone: false,
                getCandidatesError: null,
            }
        case GET_CANDIDATES_SUCCESS:
            return{
                ...state,
                getCandidatesLoading: false,
                getCandidatesDone: true,
                data: action.data,
            }
        case GET_CANDIDATES_FAILURE:
            return{
                ...state,
                getCandidatesLoading: false,
                getCandidatesError: action.error,
            }
        case GET_VOTE_REQUEST:
            return{
                ...state,
                getVoteLoading: true,
                getVoteDone: false,
                getVoteError: null,
            }
        case GET_VOTE_SUCCESS:
            return{
                ...state,
                getVoteLoading: false,
                getVoteDone: true,
            }
        case GET_VOTE_FAILURE:
            return{
                ...state,
                getVoteLoading: false,
                getVoteError: action.error,
            }
        default:
            return state;
    }
}



const Vote = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCandidates = async () => {
        dispatch({type: GET_CANDIDATES_REQUEST});
        try{
            const response = await axios.get(
                'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
            );
            dispatch({type: GET_CANDIDATES_SUCCESS, data: response.data})
        } catch (err) {
            dispatch({type: GET_CANDIDATES_FAILURE, error: err.response.data})
        }
    }
    useEffect(()=>{
        fetchCandidates();
    }, []);

    return(
        <ul>
            {state.data.map(candidate=>(
                <li key={candidate.id}>
                    {candidate.name}
                </li>
            ))}
        </ul>
    );

}

export default Vote;