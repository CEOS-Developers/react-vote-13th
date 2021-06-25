import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  text-align: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

const HeaderLink = styled.p`
  margin-left: 10px;
`;

function Vote({ jwt, setJwt }) {
  const [userList, setUserList] = useState([]);

  async function load() {
    const result = await axios.get(
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
    );
    sortUserList(result.data);
  }

  async function vote(id) {
    const result = await axios.get(
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote',
      {
        params: { id },
        headers: { Authorization: jwt },
      }
    );
    for (const user of userList) {
      if (user.id == id) {
        user.voteCount++;
      }
    }
    sortUserList(userList);
  }

  function sortUserList(list) {
    const newList = [...list];
    newList.sort(function (a, b) {
      return a.voteCount < b.voteCount ? 1 : -1;
    });
    setUserList(newList);
  }

  useEffect(() => {
    load();
  }, []);

  const logout = () => {
    setJwt(null);
  };

  const header =
    jwt == null ? (
      <HeaderContainer>
        <Link to={'/signin'}>
          <HeaderLink>로그인</HeaderLink>
        </Link>
        <Link to={'/signup'}>
          <HeaderLink>회원가입</HeaderLink>
        </Link>
      </HeaderContainer>
    ) : (
      <HeaderContainer>
        <p onClick={logout}>로그아웃</p>
      </HeaderContainer>
    );

  return (
    <StyledContainer>
      {header}
      <h1>12기 프론트엔드 개발팀장 투표 ^.^</h1>
      {userList.map((user) => {
        return (
          <p key={user.id}>
            {user.name} ({user.voteCount}){' '}
            <button
              onClick={() => {
                vote(user.id);
              }}
            >
              투표하기
            </button>
          </p>
        );
      })}
    </StyledContainer>
  );
}

export default Vote;