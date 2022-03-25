## 📑 1. 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스 개인과제

### < 오드컨셉 >

제작기간: 2022.03.21 ~ 2022.03.25

[배포링크](https://chltjdrhd777.netlify.app/)

<br>

---

## ✨ 2. 주요 기능

- A. 첫 페이지에서 자동 focus 되는 검색 바에 키워드나 url로 검색을 하면 결과 페이지로 이동을 할 수 있습니다
  <br/>
- B. 헤더에 있는 로고를 누르면 검색 기록이 초기화되며 좌측의 종료버튼을 누르면 전체 캐시까지 함께 clear되도록 제작하였습니다
  <br/>

- C. [keyword로 검색했을 시] masonry layout으로 상품들이 나열되고 마우스를 올리게 되면 오버레이가 생기며 상품 상세 데이터가 나오도록 제작하였습니다
  <br/>

- D. [keyword로 검색했을 시] 상품 카드를 클릭하게 되면 이미지 페이지로 라우팅되라는 요구조건에 맞추어 제작하였고, 뒤로가기 버튼을 하면 history를 통해 뒤로 이동하며 기존 저장해둔 스크롤 위치를 유지하도록 제작하였습니다
  <br/>

- E. [url로 검색했을 시] 상품 좌측에는 url 검색 상세데이터를, 우측에는 masonry layout에서 상품 상세데이터가 하단에 위치하도록 반영하여 구현하였습니다
  <br/>

- F. [url로 검색했을 시] 상품 카드를 클릭하게 되면 url 데이터를 조회하여 해당 카테고리 정보와 일치하는 상품 데이터들을 다시 업데이트하여 반영되라는 요구사항에 맞추어 제작하였습니다

<br/>

- G. 전체 레이아웃은 반응형으로 제작되었습니다.

---

### 🧔 시연사항

<br>

A. 첫페이지

<img src="https://user-images.githubusercontent.com/85816029/158819764-b613d861-4066-423d-879f-c93c1900273b.gif" width="700px" height="400px">

<br>

1. 탭 슬라이드

<img src="https://user-images.githubusercontent.com/85816029/158819686-9e027a02-a0aa-402f-a513-613544f2f78c.gif" width="700px" height="400px">

<br>

3. 알쓸B잡

<img src="https://user-images.githubusercontent.com/85816029/158819733-37964975-32ae-48cb-a1f3-95fd41249c69.gif" width="700px" height="400px">

<br>

4. 유튜브

<img src="https://user-images.githubusercontent.com/85816029/158819742-45bbac17-232b-446d-9265-c6a65e0b9583.gif" width="700px" height="400px">

<br>

5. 인사이트

<img src="https://user-images.githubusercontent.com/85816029/158819754-4e31afd2-1dab-4ca0-a656-74ee5d4ca665.gif" width="700px" height="400px">

<br>

---

## 🧔 회고

[회고 블로그]()

---

## 🗂 프로젝트 구조

```
├── README.md
├── netlify.toml
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.tsx
│   ├── api.ts
│   ├── components
│   │   ├── ContentDetail.tsx
│   │   ├── ContentList.tsx
│   │   ├── ContentListItem.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── NewCards.tsx
│   │   ├── Subscribe.tsx
│   │   └── Template.tsx
│   ├── index.tsx
│   ├── setupProxy.js
│   └── store.ts
├── tsconfig.json
└── yarn.lock
```

<br>

## 🛠 사용 기술

front-end

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

deploy

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

community

![Discord](https://img.shields.io/badge/DISCORD-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
