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
    const result = await axios.get('http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates')
    setData(result.data);
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
    axios(config)
    .then(function (response) {
    console.log(response.data);
    loadCandidate();
    })
    .catch(function (error) {
    console.log(error.response.data);
    });
  }

  useEffect(() => {
    loadCandidate() 
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
        <Link to = {`/`}>
          <Button> SignIn! </Button>
        </Link>
      </div>
    </Fragment> 
  );
}
export default App;
