import React, { useEffect } from "react";

import Header from "components/layout/Header";
import Main from "components/layout/Main";

import Search from "./Search";
import axios from "axios";

function Home() {
  return (
    <>
      <Header />
      <Main>
        <Search></Search>
      </Main>
    </>
  );
}

export default Home;
