import React from "react";
import Logo from "assets/logo.png";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

function Index() {
  const navigate = useNavigate();

  async function onDisconnect() {
    //clear
    localStorage.removeItem("persist:searchData");
    await caches.delete("search");
    alert("캐시가 삭제되었습니다");
  }

  return (
    <Header>
      <nav className="logo">
        <img src={Logo} alt="logo" onClick={() => navigate("/")} />
      </nav>

      <div className="disconnect flex-center" onClick={onDisconnect}>
        <button type="button">
          <FaPowerOff />
        </button>
      </div>
    </Header>
  );
}

const Media = css`
  @media screen and (min-width: 375px) {
    & button.disconnect {
      width: 2.5rem;
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 768px) {
    height: var(--w-header-height);
    padding: var(--w-header-padding);

    & .disconnect {
      width: 4rem;
      height: 4rem;

      & > button {
        font-size: 2rem;
      }
    }
  }
`;

const Header = styled.header`
  width: 100%;
  height: var(--m-header-height);
  padding: var(--m-header-padding);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .logo {
    display: inline-block;
    height: 100%;

    & img {
      height: 100%;
      cursor: pointer;
    }
  }

  & .disconnect {
    background-color: ${({ theme }) => theme.colors.grayOne};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid gray;
    width: 3rem;
    height: 3rem;

    & > button {
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.grayFour};
      padding-top: 0.2rem;
    }
  }

  ${Media}
`;

export default Index;
