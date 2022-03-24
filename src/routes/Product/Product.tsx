import React from "react";
import { useParams } from "react-router-dom";
import KeywordPage from "./KeywordPage";
import UrlPage from "./UrlPage";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import styled from "@emotion/styled";
import { useSelector } from "redux/store";
import { AiOutlineArrowUp } from "react-icons/ai";

function Keyword() {
  const { sliderList } = useSelector((state) => state.search);
  const { searchType } = useParams();

  return (
    <>
      <Header />
      <Main className="searchResult-main">
        {searchType === "keyword" && <KeywordPage />}
        {searchType === "url" && <UrlPage />}
      </Main>

      {sliderList.length > 10 && (
        <MoveTop
          className="flex-center-C"
          onClick={() => {
            const main = document.querySelector(".searchResult-main");
            main!.scrollTop = 0;
          }}
        >
          <AiOutlineArrowUp />
        </MoveTop>
      )}
    </>
  );
}

const MoveTop = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid gray;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 20;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.grayOne};
  color: ${({ theme }) => theme.colors.grayFour};
  font-size: 2.7rem;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export default Keyword;
