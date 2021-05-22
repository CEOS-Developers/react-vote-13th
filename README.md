## 4~5주차 미션: React-vote

---

### 서론

---
++ (05.22) 5주차 미션 [안내노션 링크](https://www.notion.so/5-react-vote-with-auth-37ec0df1734a41b8bf32a5211cb12fbd)입니다.

---
안녕하세요👋, 13기 프론트엔드 팀장 장창훈입니다!😆

이번 미션은 제가 배포해 놓은 API를 이용하여 'CEOS 14기 프론트엔드 팀장 투표' 를 2주차에 걸쳐서 구현해 보는 것입니다.

API Fetching 또한 여러분들이 각 팀에서 프론트엔드로써 개발을 할 때 필수적인 요소이기에

몇 주 후의 자신과 팀을 위해 열심히 만들어 보셨으면 좋겠어요😤😤

하지만 긴 시험기간 동안 리액트를 쉬고 있었기에 먼저 감을 되찾기 위해서

이번 주는 지난 미션들보다 간단하게 제공하려고 합니다.

투표 화면과 후보자 목록, 투표하기 기능을 먼저 만들어 주시고

추가적인 기능들은 차주 미션으로 포함 될 예정입니다.

이제 모두 팀이 꾸려졌으니 팀 활동도 계속 함께 하게 될텐데

프론트 미션까지 너무 어려우면 안되니 난이도에 주의를 기울이겠습니다!

응원해요 13기 여러분!!



---

## 미션

---

#### 미션목표

---

- 리액트를 복습합니다.
- axios 라이브러리를 사용하여 AJAX를 호출합니다.
- REST API, AJAX, axios 등을 통하여 클라이언트와 서버의 통신을 이해합니다.
- 동기,비동기처리와 async/await 대해 이해합니다. (힌트: 공부순서는 동기,비동기 -> Promise -> async/await 를 권장합니다.) 

### 기한

---

- 2021년 5월 14일(금)까지

### Key Questions?

---

다음 미션에 제공

### 필수 요건

---

- 각자 사이트를 자신만의 방식으로 꾸민다.
- 미션 완성 후 가독성을 위해 코드를 다듬는다.
- PR 전에 불필요한 주석은 모두 지운다.
- 배포 후 PR 코멘트에 url를 포함시킨다. (배포 사이트에선 api가 작동하지 않을 수 있는데, 그럴 경우엔 로컬에서 잘 돌아가는 것을 확인시켜 주세요.)

- axios 라이브러리를 사용한다.
- 제공되는 api를 이용하여 후보 명단을 가져온다.
- 화면상에서 보이는 후보 명단은 득표가 많은 순서대로 정렬되어 있어야 한다.
- 이름과 득표수, 몇위인지, 투표 버튼은 반드시 표시한다.
- 투표 버튼을 누르면 alert가 뜨면서 투표가 된다.

<img width="446" alt="프론트 14기 팀장 투표" src="https://user-images.githubusercontent.com/54088062/117558893-d68efc80-b0bb-11eb-8087-2444c99cd45f.png">


## API Doc

---

[API를 정리 해 놓은 Postman 문서](https://documenter.getpostman.com/view/15686523/TzRRDozw)



## 링크 및 참고자료

---

- [리액트 API 연동의 기본](https://react.vlpt.us/integrate-api/01-basic.html)
- [자바스크립트 - 동기(Synchronous)? 비동기(asynchronous)?](https://ljtaek2.tistory.com/142)
- [async와 await, 비동기를 동기코드 처럼](https://kamang-it.tistory.com/entry/JavaScript11async%EC%99%80-await-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A5%BC-%EB%8F%99%EA%B8%B0%EC%BD%94%EB%93%9C-%EC%B2%98%EB%9F%BC)
- [REST API 제대로 알고 사용하기](https://meetup.toast.com/posts/92)
- [axios란? (feat. Fetch API)](https://velog.io/@shin6403/React-axios%EB%9E%80-feat.-Fetch-API)
