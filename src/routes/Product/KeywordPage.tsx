import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import Card from "components/Card";
import Masonry from "masonry-layout";
import { SearchData } from "redux/searchSlice";

function Keyword() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.search);
  const { state } = useLocation();
  const [itemList, setItemList] = useState<SearchData[]>(selector?.searchList.slice(0, 10));
  const [cursor, setCursor] = useState<number>(10);

  useEffect(() => {
    if (!selector.searchList.length && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, selector]);

  useEffect(() => {
    if (itemList.length) {
      setCursor(itemList[itemList.length - 1].product_code);
    }
  }, [itemList]);

  //masonry
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const msnry = new Masonry(ref.current as HTMLElement, {
      itemSelector: ".masonry-grid-item",
      columnWidth: ".grid-resizer",
      percentPosition: true,
      gutter: 10,
    });
  });

  return (
    <Section className="masonry-grid" ref={ref}>
      <div className="grid-resizer"></div>
      {itemList.map((item) => (
        <Card
          imgSrc={item?.image_url}
          name={item?.name}
          price={item?.price}
          type={"keyword"}
          q={(state as { keyword: string }).keyword}
        />
      ))}
    </Section>
  );
}

const Media = css`
  @media screen and (min-width: 768px) {
    & .grid-resizer {
      width: 32%;
    }

    margin-left: 0.5rem;
  }

  @media screen and (min-width: 1000px) {
    & .grid-resizer {
      width: 23%;
    }

    margin-left: 2.5rem;
  }

  @media screen and (min-width: 1500px) {
    & .grid-resizer {
      width: 10%;
    }

    margin-left: 3.5rem;
  }
`;

const Section = styled.section`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;

  //masonry part
  & .grid-resizer {
    width: 45%;
  }
  margin-left: 1.5rem;
  ///

  ${Media}
`;

export default Keyword;
