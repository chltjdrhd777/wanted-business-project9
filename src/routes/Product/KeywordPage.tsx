import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import Card from "components/Card";
import Masonry from "react-masonry-css";
import { SearchData } from "redux/searchSlice";

function Keyword() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.search);
  const { state } = useLocation();
  const [itemList, setItemList] = useState<SearchData[]>([]);
  const [cursor, setCursor] = useState<number>(10);

  const io = new IntersectionObserver((entries, observer) => {});

  useEffect(() => {
    if (!selector.searchList.length && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, selector]);

  useEffect(() => {
    setItemList(selector.searchList.slice(0, 10));
  }, [selector.searchList]);

  useEffect(() => {
    if (itemList.length) {
      setCursor(itemList[itemList.length - 1].product_code);
    }
  }, [itemList]);

  return (
    <Section>
      <Masonry
        breakpointCols={{
          default: 5,
          1400: 5,
          1000: 4,
          768: 3,
          500: 2,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {itemList.map((item) => (
          <Card
            key={item?.image_url}
            imgSrc={item?.image_url}
            name={item?.name}
            price={item?.price}
            type={"keyword"}
            q={(state as { keyword: string }).keyword}
          />
        ))}
      </Masonry>
    </Section>
  );
}

const Media = css``;

const Section = styled.section`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  margin-left: 1.2rem;

  .my-masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: -3rem;
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 0.5rem;
    background-clip: padding-box;
    transition: all 0.3s ease-in-out;
  }

  .my-masonry-grid_column > article {
    background: grey;
    margin-bottom: 1rem;
  }

  ${Media}
`;

export default Keyword;
