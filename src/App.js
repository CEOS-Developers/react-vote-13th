import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

var axios = require('axios');

const button = styled.button`
  :focus{
    outline:none;
  }
`
function App() {
  const [data, setData] = useState([]);

  const loadCandidate = async () =>{
    //await - 20번째 줄이 끝나야 그 다음 수행 (get을 기다리겠다): 비동기화
    //result가 success라고 가정함 - 이때 result = response
    const result = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates')
    setData(result.data);
    //14-19는 클릭시 -> 로 이동, 여기 있으면 새로고침 할 때마다 선종오빠한테 투표됨
  }
  async function clickVote(key, voteCount){
    const config = {
      params : {
        id: key, //id가 0번인 사람을 투표해주세요
        voteCount: voteCount + 1
      }
    }
    //투표할 때 어떻게 한 표씩 증가시킬거냐- 화면 갱신
    const vote = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}', config)
    setData(vote.data);
    
  }
//useEffect에는 async, await 안붙여도됨
  useEffect(() => {
    loadCandidate()
  }, [])

  return (
    <div >{
      data.map(item => {
       return <p key={item.id}> {item.name} : {item.voteCount} 
        <button onClick={clickVote(item.id, item.voteCount)}>vote</button>
        </p>
      })}
    </div>
  );
}
export default App;
