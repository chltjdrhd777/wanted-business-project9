import { Global, css } from "@emotion/react";

const globalCSS = css`
  :root {
    --m-header-height: 5rem;
    --m-header-padding: 1.3rem;
    --w-header-height: 7rem;
    --w-header-padding: 2rem;
    --main-font-color: #292929;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    color: var(--main-font-color);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
  ul {
    list-style-type: none;
  }
  img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  button {
    border: none;
    border-radius: 1rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
  input {
    outline: none;
    padding: 0 1.5rem;
    &:focus::placeholder {
      color: transparent;
    }
  }
  #root {
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-center-C {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

function GlobalStyle() {
  return <Global styles={globalCSS} />;
}

export default GlobalStyle;
