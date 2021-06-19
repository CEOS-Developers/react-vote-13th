import React from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import VoteItem from './Components/VoteItem';
import useAsync from './Hooks/useAsync';

function App() {
  const [votesState, getVotes] = useAsync(getVotesCallback, []);

  const handleVoteButtonClick = async (e) => {
    // 투표 버튼(VoteButton)의 data-vote-id attribute 값을 가져옴
    const { voteId } = e.target.dataset;
    getVotes({ voteId });
  };

  const { loading, data: candidates, error } = votesState;

  if(loading) return <Loading />
  if(error) return <Error errorObject={error}/>
  if(!candidates) return <div>데이터 없음.</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>13기 FE 투표</Title>
        {candidates.map((candidate, idx) => (
          <VoteItem
            key={idx}
            rank={idx + 1}
            candidate={candidate}
            onVoteButtonClick={handleVoteButtonClick}
          />
        ))}
      </Container>
    </>
  );
}

// API CALLERS
async function getVotesCallback(params=null) { // 투표 현황 불러오기
  // argument로 voteId가 주어진 경우, 투표를 먼저 수행한다
  if(params && params.voteId) {
    const { voteId } = params;
    castVote({ voteId });
  }
  // 'Candidates' API(GET) call을 통해 투표 현황 불러오기
  const res = await axios.get(
    'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
  );
  // 불러온 데이터 득표순 정렬
  if(res.data) {
    // custom compareFunction을 이용, voteCount 기준 내림차순 정렬
    return res.data.sort((a, b) => ( b.voteCount - a.voteCount ));
  }
  return res.data;
}

async function castVote({voteId}) { // 특정 사람(voteId)에게 투표
  // 'Vote' API(GET) call을 통해 투표하기
  const res = await axios.get(
    `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${voteId}`
  )
  // 투표 결과 유저에게 피드백
  if(res.status === 200) {
    alert(res.data);
  } else {
    alert(`투표에 실패하였습니다. (${res.data})`)
  }
}

// COMPONENTS
function Loading() {
  return <StyledLoading>Loading...</StyledLoading>
}

function Error({ errorObject }) {
  return <div>{`${errorObject.name}: ${errorObject.message}`}</div>
}

// STYLES
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
    background: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div#root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100%;
  background: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottm: 30px;
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default App;
