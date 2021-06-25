import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

    async function postSignUp() {
        try {
          setLoading(true);
          const url = 'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/signup';
          const data = {
              email, password, name
          }
          const response = await axios.post(url, data);
          alert(response.data);
          history.push('/signIn');
        } catch (e) {
          setError(e);
          alert(e.response.data);
        } finally {
          setLoading(false);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        postSignUp();
    }

    return (
        <Container>
            <form onSubmit={handleFormSubmit}>
                <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="이메일 입력"
                />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="비밀번호 입력"
                />
                </div>

                <div>
                <label htmlFor="name">Password</label>
                <input 
                    type="text"
                    name="username"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    placeholder="이름 입력"
                />
                </div>

                <Button type="submit">회원가입</Button>
            </form>
        </Container>
    )

}

const Container = styled.div`
  width: 20rem;
  height: 47rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid green;
  font-size: 20px;
  background: #1913;
`;

const Button = styled.button`
  width: 6rem;
  height: 2rem;
  border: 1.5px solid black;
  border-radius: 10px;
  background: lightyellow;
  margin: 0.5rem;
  z-index: 2;
`;
