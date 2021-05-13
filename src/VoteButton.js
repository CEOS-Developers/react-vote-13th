import React, { useState } from 'react';
import axios from 'axios';


function VoteButton(props){
    const [count, setCount] = useState(null);
    const CastVote = async () => {
        const id=props.vote_id;
        try {
          const data = await axios.get(
            `http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote?id=${id}`
          );
          setCount(data);
        } catch (e) {
          alert("투표 에러가 발생했습니다.");
        }
        props.fetch();
        alert('투표가 반영되었습니다.');
      };
  return(
      <button onClick={CastVote}>투표</button>
  );
}

export default VoteButton;