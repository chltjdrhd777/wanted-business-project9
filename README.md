## 📑 1. 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스 개인과제

### < 오드컨셉 >

제작기간: 2022.03.21 ~ 2022.03.25

[배포링크](https://chltjdrhd777.netlify.app/)
<br/>

[회고 블로그](https://velog.io/@chltjdrhd777/%EA%B8%B0%EC%97%85%EA%B3%BC%EC%A0%9C-%ED%9A%8C%EA%B3%A0-cache-storage-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EA%B3%A0%EC%83%9D%EB%82%B4%EC%9A%A9)

<br>

---

## ✨ 2. 주요 기능

- A. 첫 페이지에서 자동 focus 되는 검색 바에 키워드나 url로 검색을 하면 결과 페이지로 이동을 할 수 있습니다
  <br/>
- B. 헤더에 있는 로고를 누르면 검색 기록이 초기화되며 좌측의 종료버튼을 누르면 전체 캐시까지 함께 clear되도록 제작하였습니다
  <br/>

- C. [keyword로 검색했을 시] masonry layout으로 상품들이 나열되고 마우스를 올리게 되면 오버레이가 생기며 상품 상세 데이터가 나오도록 제작하였습니다. 검색된 키워드는 붉은색으로 하이라이트되도록 처리하였습니다.
  <br/>

- D. [keyword로 검색했을 시] 상품 카드를 클릭하게 되면 이미지 페이지로 라우팅되라는 요구조건에 맞추어 제작하였고, 뒤로가기 버튼을 하면 history를 통해 뒤로 이동하며 기존 저장해둔 스크롤 위치를 유지하도록 제작하였습니다
  <br/>

- E. [url로 검색했을 시] 상품 좌측에는 url 검색 상세데이터를, 우측에는 masonry layout에서 상품 상세데이터가 하단에 위치하도록 반영하여 구현하였습니다
  <br/>

- F. [url로 검색했을 시] 상품 카드를 클릭하게 되면 url 데이터를 조회하여 해당 카테고리 정보와 일치하는 상품 데이터들을 다시 업데이트하여 반영되라는 요구사항에 맞추어 제작하였습니다

<br/>

- G. 뒤로가기나 앞으로 가기 등 history를 통해 이동하려는 시도를 할 때 필요한 데이터가 없으면 홈페이지로 다시 돌아가도록 라우팅 처리하였습니다

<br/>

- H. 전체 레이아웃은 반응형으로 제작되었습니다.

<br/>

- I . Masonry layout은 무한스크롤로 업데이트되도록 구현하였습니다.

<br/>

- J . 데이터들은 요구사항에 맞춰 초기요청이 일어나면 cache storage에 저장하고 그 이후로는 요청을 보내지 않고 캐시 스토리지에 있는 데이터를 사용하도록 구현하였습니다. 만약 스토리지나 네트워크 조회가 실패시 에러문구가 뜨도록 조치하였습니다.

---

### 🧔 시연사항

<br>

A. 첫페이지

![a](https://user-images.githubusercontent.com/58500558/160059130-fcab9ce9-5445-4c22-b52b-d78fd2e74216.gif)

<br>

B. 키워드 검색 및 무한스크롤 업데이트

![B](https://user-images.githubusercontent.com/58500558/160060390-9f5a4c07-d92e-44c0-9273-b055c267046d.gif)

<br>

3. 이미지 카드 마우스 올릴 시 상세데이터 및 클릭시 이미지 라우팅

![C](https://user-images.githubusercontent.com/58500558/160060777-f0075b0c-ab49-406c-8d09-c84df52e46d2.gif)

<br>

4. url로 상품검색

![D](https://user-images.githubusercontent.com/58500558/160060965-39be7e67-41d3-439e-927e-4012cee4ffca.gif)

<br>

5. URL 검색 후 상품카드 클릭시 상세컴포넌트 업데이트

![E](https://user-images.githubusercontent.com/58500558/160061111-0bba4820-f056-46b6-8051-24207ff9d2e6.gif)

<br>

## 🗂 프로젝트 구조

```
pxl
├─ .eslintrc.json
├─ README.md
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  └─ robots.txt
├─ react-app-env.d.ts
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  ├─ Card.tsx
│  │  └─ layout
│  │     ├─ Header.tsx
│  │     └─ Main.tsx
│  ├─ helper
│  │  └─ makeClass.ts
│  ├─ index.tsx
│  ├─ redux
│  │  ├─ searchSlice.ts
│  │  └─ store.ts
│  ├─ routes
│  │  ├─ Home
│  │  │  ├─ Home.tsx
│  │  │  └─ Search.tsx
│  │  └─ Product
│  │     ├─ KeywordPage.tsx
│  │     ├─ Product.tsx
│  │     ├─ ProductImg.tsx
│  │     └─ UrlPage.tsx
│  └─ styles
│     ├─ emotion.d.ts
│     ├─ global.tsx
│     └─ theme.ts
├─ tsconfig.json
└─ yarn.lock

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
