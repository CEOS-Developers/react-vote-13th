import React, {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';


var axios = require('axios');

const Button = styled.button`
  &:focus{
    outline:none;
  }
`
function App() {
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies();

  const loadCandidate = async () =>{
    //await - 20번째 줄이 끝나야 그 다음 수행 (get을 기다리겠다): 비동기화
    //result가 success라고 가정함 - 이때 result = response
    const result = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates')
    setData(result.data);
    //14-19는 클릭시 -> 로 이동, 여기 있으면 새로고침 할 때마다 선종오빠한테 투표됨
  }
  async function ClickVote(key){
    console.log(cookies);
    const config = {
      method: 'get',
      url:`http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${key}`,
      headers:{
        'Authorization' : `${cookies['LoginData']}`
      }
    }
    //투표할 때 어떻게 한 표씩 증가시킬거냐- 화면 갱신
    axios(config)
    .then(function (response) {
    console.log(response.data);
    loadCandidate();
    })
    .catch(function (error) {
    console.log(error.response.data);
    });
    // await axios.get(`http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote`, config)
  }
//useEffect에는 async, await 안붙여도됨
  useEffect(() => {
    loadCandidate() //useEffect로 안묶어주면 state값 바뀔 때마다 컴포넌트에 load~ 무한렌더링
  }, [data])

  return (
    <Fragment>
      <div >{
        data.map(item => {
        return <p key={item.id}> {item.name} : {item.voteCount} 
            <Button onClick={() =>ClickVote(item.id)}>vote</Button>
          </p>
        })}
      </div>
      <div>
        <Link to = {`/signup`}>
          <Button> SignUp! </Button>
        </Link>
        <Link to = {`/signin`}>
          <Button> SignIn! </Button>
        </Link>
      </div>
    </Fragment> 
  );
}
export default App;
