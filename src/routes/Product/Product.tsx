import React from "react";
import { useLocation, useParams } from "react-router-dom";
import KeywordPage from "./KeywordPage";
import UrlPage from "./UrlPage";
import Header from "components/layout/Header";
import Main from "components/layout/Main";

function Keyword() {
  const { searchType } = useParams();

  return (
    <>
      <Header />
      <Main className="searchResult-main">
        {searchType === "keyword" && <KeywordPage />}
        {searchType === "url" && <UrlPage />}
      </Main>
    </>
  );
}

export default Keyword;
