import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import Card from "components/Card";
import Masonry from "react-masonry-css";
import { setSliderList } from "redux/searchSlice";
import { useDispatch } from "redux/store";

function Keyword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchList, sliderList } = useSelector((state) => state.search);
  const { state } = useLocation();
  const [cursor, setCursor] = useState<number>(10);
  const [loading, setLoading] = useState(false);

  //todo 위로 올라가는 버튼 (list 길이가 10개 넘어갈 시)

  //io
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const io = useMemo(
    () =>
      new IntersectionObserver(
        (entries, observer) => {
          if (entries[0] && entries[0].intersectionRatio > 0.5) {
            setLoading(true);
          }
        },
        { threshold: 0.5 }
      ),
    []
  );

  useEffect(() => {
    //if no list, go back
    if (!searchList.length && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, searchList]);

  useEffect(() => {
    //set obsever
    io.observe(loadingRef.current as HTMLDivElement);
    if (sliderList.length) {
      setCursor(sliderList.length);
    }
  }, [io, sliderList]);

  useEffect(() => {
    //update list
    if (loading) {
      const updateList = searchList.slice(cursor, cursor + 10);
      if (updateList.length) {
        dispatch(setSliderList([...sliderList, ...updateList]));
        setCursor(cursor + 10);
      }
      setLoading(false);
    }
  }, [dispatch, sliderList, searchList, cursor, loading]);

  useEffect(() => {
    const scrollTop = localStorage.getItem("scrollTop");
    if (scrollTop) {
      const target = document.querySelector(".searchResult-main");
      target!.scrollTop = Number(scrollTop);
    }
    localStorage.removeItem("scrollTop");
  }, []);

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
        {sliderList.map((item, index) => (
          <Card
            key={index}
            imgSrc={item?.image_url}
            name={item?.name}
            price={item?.price}
            type={"keyword"}
            q={(state as { keyword: string }).keyword}
          />
        ))}
      </Masonry>
      <div className="loading-bar" ref={loadingRef}></div>
    </Section>
  );
}

const Media = css``;

const Section = styled.section`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  margin-left: 1.2rem;
  position: relative;

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
    margin-bottom: 0.5rem;
  }

  .loading-bar {
    width: 100%;
    height: 20rem;
    position: absolute;
    bottom: 0;
    background-color: transparent;
  }

  ${Media}
`;

export default Keyword;
