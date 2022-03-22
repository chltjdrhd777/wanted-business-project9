import React, { useEffect } from "react";

import Header from "components/layout/Header";
import Main from "components/layout/Main";

import Search from "./Search";
import { useDispatch } from "react-redux";
import { reset } from "redux/searchSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    //if comming back
    dispatch(reset());
    localStorage.removeItem("searchState");
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main>
        <Search />
      </Main>
    </>
  );
}

export default Home;
