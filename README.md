# React Movie App

이 웹 애플리케이션은 사용자가 영화 정보를 검색하고, 좋아요 기능을 통해 선호하는 영화를 관리할 수 있는 서비스입니다. TMDB API를 활용해 영화 데이터를 제공하며, Firebase를 통해 사용자 인증과 영화 좋아요 기능을 구현하였습니다. 이 프로젝트는 리액트와 타입스크립트, 리액트 쿼리 등을 학습하기 위한 목적으로 개발되었습니다.

## 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black) ![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## 주요 기능

- 영화 목록
  - TMDB API애서 현재 상영중인 영화, 개봉 예정 영화, 인기 영화 데이터를 받아와 각각 다른 섹션으로 보여줍니다.

- 영화 상세 정보
  - 각 영화는 상세 페이지를 통해 줄거리, 개봉일, 러닝타임, 출연 배우 등 세부 정보를 확인할 수 있습니다.

- 영화 검색
  - TMDB API를 사용해 영화 제목을 검색하고 관련 영화 목록을 확인할 수 있습니다.

- 회원가입 및 로그인
  - Firebase Authentication을 통해 이메일과 비밀번호로 회원가입하고 로그인할 수 있습니다.
  
- 좋아요 기능
  - 로그인한 사용자는 영화 상세 페이지에서 좋아요 버튼을 클릭하여 영화를 좋아요 목록에 추가할 수 있습니다. 좋아요한 영화는 Firebase에 저장됩니다.

## 링크

- [Demo](https://film-search-jj.netlify.app)

- [Notion](https://jjung-in.notion.site/React-Movie-Search-174db2bfcb9d80749522da9b449aaa66?pvs=73)