import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import Card from "components/Card";
import Masonary from "masonry-layout";

function Keyword() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.search);
  const { state } = useLocation();
  const testTarget = selector?.searchList.slice(0, 10);

  useEffect(() => {
    if (!selector.searchList.length && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, selector]);

  //masonary
  // const grid = useRef<HTMLElement | null>(null);
  const masonary = new Masonary(".masonry-grid", {
    itemSelector: ".masonry-grid-item",
    columnWidth: ".masonry-grid-sizer",
    percentPosition: true,
    gutter: 10,
  });

  return (
    <Section className="masonry-grid">
      <div className="masonry-grid-sizer"></div>
      {testTarget.map((target) => (
        <Card
          imgSrc={target?.image_url}
          name={target?.name}
          price={target?.price}
          type={"keyword"}
        />
      ))}
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  min-height: 100%;

  & .masonry-grid-sizer {
    width: 35%;
  }
`;

export default Keyword;
