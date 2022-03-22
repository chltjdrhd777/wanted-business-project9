import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import Card from "components/Card";

function Keyword() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.search);
  const { state } = useLocation();
  // console.log(state);
  // console.log(selector);
  const testTarget = selector?.searchList[0];

  useEffect(() => {
    if (!selector.searchList.length && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, selector]);

  return (
    <Section>
      <Card
        imgSrc={testTarget?.image_url}
        name={testTarget?.name}
        price={testTarget?.price}
        type={"keyword"}
      />
    </Section>
  );
}

const Section = styled.section`
  height: 100%;
`;

export default Keyword;
