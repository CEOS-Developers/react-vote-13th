import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import SignIn, { Top, RightBottomTag } from './SignIn';
import axios from 'axios';

const TopImg = styled.img`
  margin-bottom: 1vh;
  margin-right: 16vw;
  height: 4.8em;
  width: 38.4em;
`;

const ForSpace = styled.div`
  width: 5em;
`;

const Container = styled.div`
  flex-grow: 9.5;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgb(150, 144, 138);
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-family: serif;
  font-weight: bold;
  letter-spacing: -1px;
`;

const DataBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 7vh;
`;

const Button = styled.button`
  font-family: serif;
  background-color: black;
  border: none;
  border-radius: 15px;
  color: white;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 5px;
  margin-left: 5px;
`;

const LabelForList = styled.label`
  font-family: Georgia, 'Times New Roman', Times, serif; //폰트 새로 가져오기
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 5px;
`;

function App() {
  const [data, setData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  let history = useHistory();

  const loadCandidate = async () => {
    const result = await axios.get(
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
    );
    let data = result.data;
    data.sort(function (a, b) {
      return b.voteCount - a.voteCount;
    });
    setData(data);
  };

  function logout(e) {
    removeCookie('LoginData');
    history.push('/');
  }
  async function ClickVote(key) {
    console.log(cookies);
    const config = {
      method: 'get',
      url: `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${key}`,
      headers: {
        Authorization: `${cookies['LoginData']}`,
      },
    };
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
    loadCandidate();
  }, []);

  const VoteList = () => {
    return (
      <div>
        {data.map((item) => {
          return (
            <p key={item.id}>
              {' '}
              <LabelForList>
                {item.name} &nbsp;&nbsp;:&nbsp;&nbsp; {item.voteCount}&nbsp;&nbsp;
              </LabelForList>
              <Button onClick={() => ClickVote(item.id)}>vote</Button>
            </p>
          );
        })}
      </div>
    );
  };

  const UserDataBar = () => {
    return (
      <DataBar>
        <Label> Your name here </Label>
        <ForSpace />
        <Button onClick={logout}> * press here to logout </Button>
        {/* <Label> {cookies.LoginData.email} </Label> */}
      </DataBar>
    );
  };

  return (
    <Top>
      <Container>
        <TopImg src={process.env.PUBLIC_URL + './design/vote_title.png'} />
        <UserDataBar />
        <VoteList />
      </Container>
      <RightBottomTag />
    </Top>
  );
}
export default App;
