## 2주차 미션: React-Messenger💌

---

### 서론

---

안녕하세요 13기 프론트엔드 운영진 서유빈입니다😆

2주차부터는, React를 사용하여 미션을 진행해주시면 되는데요, 리액트 첫 미션인 만큼 React 자체에 익숙해지기 위한 시간을 가져보시게 될거에요!

또한 1주차에서 사용해봤던 바닐라 JS의 불편함이라고 할 수 있는 점들을 리액트가 어떻게 해결하는지 직접 코드를 짜보면서 알아보면서 리액트의 컨셉을 전체적으로 이해하시면 좋을 것 같습니다~

2주차 미션 마감일시는 2021년 3월 26일 금요일까지입니다.

진행 중 어려운 상황이 있다면, 우선 스스로 공부하고 찾아보시구

너무 해결이 안된다 싶으면 슬랙의 qna채널에 올려주시면 됩니다~~

PR 보내실땐 양식 맞춰주시고, 이번주 부터는 배포한 링크까지 PR 보내주실때 링크 첨부해주세요~~

13기분들 너무 멋져요!! 이번주도 화이팅✨

---

## 미션

---

#### 미션목표

---

- React의 기초를 이해한다.
- useState로 컴포넌트의 상태를 관리할 수 있게된다.
- useEffect의 사용법을 이해한다.

### 기한

---

- 2021년 3월 26일(금)까지

### Key Questions?

---

- Virtual DOM이 무엇일까요?
- 미션을 진행하면서 느낀, 리액트를 사용하는 장점이 있었다면?
- 리액트에서 클래스형과 함수형은 어떤차이가 있을까요?
- 리액트에서는 상태를 어떻게 관리할까요?
- styled-components 사용후기 (CSS와 비교)

### 필수 요건

---

- 함수형 컴포넌트를 사용한다.
- styled-component를 이용하여 스타일링 한다. 스타일링은 자유롭게! 기존에 있는 메신저를 가져오셔도 되고 완전히 독창적인걸 만드셔도 됩니다. 
  다만 기본 구성요소들은 지켜주세요! 그리고 색도 다양하게 넣어보시구요
- 상단바에 메시지를 보내는 사람의 프로필을 띄운다. + 상단바의 프로필로 메시지 발신자를 바꿀 수 있게 한다.
- 공백메시지는 입력되지 않도록 핸들링 한다. + alert 메세지 띄우기
- 메시지 전송후 입력칸을 비워준다.
- 메시지 전송후 스크롤을 밑으로 내려준다. (Hint : useEffect + scrollBy 이용)
- 컴포넌트 이름을 역할이 잘 드러나게 짓는다.
- 개발자도구에서 Style을 복사하지말고, 직접 styled-components를 사용하여 만드는 연습을 한다ㅠㅠ.
- [결과 화면](https://react-messenger-12th-2z7y80m5p.vercel.app/chat/:nayubin)을 구현한다.

## 로컬 실행방법

---

`npm start` : 로컬에서 react application을 자동으로 리로드하여 실행시켜줍니다.

배포는 자유롭게 하시면 됩니다.

## 링크 및 참고자료

---

- [create react app (CRA)](https://create-react-app.dev/docs/getting-started/)
- [리액트 docs 주요 개념 1-12](https://ko.reactjs.org/docs/hello-world.html)
- [리액트 docs Hook 1-3](https://ko.reactjs.org/docs/hooks-intro.html)
- [컴포넌트 네이밍을 위한 자바스크립트 네이밍 컨벤션](https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8)
- [useState, useEffect hooks](https://velog.io/@velopert/react-hooks#1-usestate)
- [styled-component](https://styled-components.com/docs/basics#getting-started)
