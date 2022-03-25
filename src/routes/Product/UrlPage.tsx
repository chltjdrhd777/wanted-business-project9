import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "redux/store";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Card from "components/Card";
import {
  SearchData,
  setSearchList,
  setSliderList,
  RegionData,
  setAttributes,
} from "redux/searchSlice";
import Masonry from "react-masonry-css";

function Url() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTarget, searchList, sliderList, attributes } = useSelector((state) => state.search);
  const target = searchTarget as SearchData;
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const io = useMemo(
    () =>
      new IntersectionObserver(
        (entries, observer) => {
          if (entries[0] && entries[0].isIntersecting) {
            setLoading(true);
          }
        },
        { threshold: 0.5 }
      ),
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTarget && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, searchTarget]);

  const dataUpdate = useCallback(async () => {
    try {
      //1. find list
      const URL = "https://static.pxl.ai/problem/data/products.json";
      const cacheStorage = await caches.open("products");
      const responsedCache = await cacheStorage.match(URL);
      if (responsedCache) {
        const lists = (await responsedCache.json()) as SearchData[];
        const filteredList = lists.filter((list) => {
          let result = false;

          for (let category of list.category_names) {
            if (searchTarget?.category_names.includes(category)) {
              result = true;
            } else {
              result = false;
            }
          }

          return result;
        });
        storeListUpdate(filteredList);
      } else {
        fetch(URL)
          .then(async (response) => {
            const lists = (await response.clone().json()) as SearchData[];
            const filteredList = lists.filter((list) => {
              let result = false;

              for (let category of list.category_names) {
                if (searchTarget?.category_names.includes(category)) {
                  result = true;
                } else {
                  result = false;
                }
              }

              return result;
            });
            cacheStorage.put(URL, response);

            storeListUpdate(filteredList);
          })
          .catch((err) => {
            console.log(err);
            alert("something wrong");
            navigate("/");
          });
      }

      //2. find attribute from regions
    } catch (err) {
      console.log(err);
      alert("error when find data. please check cache");
      navigate("/");
    }
  }, [navigate, searchTarget]);

  async function storeListUpdate(filteredList: SearchData[]) {
    const URL = "https://static.pxl.ai/problem/data/regions.json";
    const cacheStorage = await caches.open("regions");
    const responsedCache = await cacheStorage.match(URL);
    if (responsedCache) {
      const lists = (await responsedCache.json()) as RegionData[];
      const findtargetRegion = lists.find(
        (list) => list.product_code === searchTarget?.product_code
      );

      dispatch(setSearchList(filteredList));

      if (findtargetRegion) {
        dispatch(setAttributes(findtargetRegion!.attributes));
      }
    } else {
      fetch(URL)
        .then(async (response) => {
          const lists = (await response.clone().json()) as RegionData[];
          const findtargetRegion = lists.find(
            (list) => list.product_code === searchTarget?.product_code
          );
          cacheStorage.put(URL, response);

          if (!findtargetRegion) {
            alert("there is an Error from data");
            navigate("/");
            return;
          }

          dispatch(setSearchList(filteredList));
          dispatch(setAttributes(findtargetRegion.attributes));
        })
        .catch((err) => {
          console.log(err);
          alert("there is an Error from data");
          navigate("/");
        });
    }
  }

  useEffect(() => {
    dataUpdate();
  }, [target, dataUpdate]);

  useEffect(() => {
    if (loading && searchList.length && !sliderList.length) {
      const firstData = searchList.slice(0, 30);
      dispatch(setSliderList(firstData));
      setLoading(false);
      return;
    }

    if (loading && searchList.length && sliderList.length) {
      const updateData = searchList.slice(sliderList.length, sliderList.length + 10);
      dispatch(setSliderList([...sliderList, ...updateData]));
      setLoading(false);
      return;
    }
  }, [loading, searchList, sliderList]);

  useEffect(() => {
    if (loadingRef.current) {
      io.observe(loadingRef.current);
    }
  }, []);

  return (
    <Section>
      <div className="detail flex-center-C">
        <div className="container">
          <div className="product-img">
            <img src={searchTarget?.image_url} alt="product" />
          </div>

          <div className="product-type">
            <span className="title">ITEMS</span>
            <div className="tagname">
              <span>{searchTarget?.category_names[0]?.split(".")[1].toUpperCase()}</span>
            </div>
          </div>

          <div className="product-attributes">
            <span className="title">ATTRIBUTES</span>

            <div className="attribute-wrapper">
              {attributes.map((attribute) => {
                const [[key, value]] = Object.entries(attribute);

                return (
                  <div className="attribute">
                    <span>{value}</span>
                    <span>{key}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Masonry
        breakpointCols={{
          default: 5,
          1400: 4,
          1000: 3,
          768: 2,
          500: 2,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {sliderList.map((list) => (
          <Card
            key={list.product_code}
            name={list.name}
            price={list.price}
            imgSrc={list.image_url}
            type={"url"}
          />
        ))}
      </Masonry>

      <div className="loading-bar" ref={loadingRef}></div>
    </Section>
  );
}

const Media = css`
  @media screen and (min-width: 1000px) {
    & .detail {
      & .container {
        max-width: 50%;
      }
    }
  }
`;

const Section = styled.section`
  min-height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;

  & .detail {
    width: 50%;
    height: calc(100vh - var(--m-header-height) - var(--m-header-padding));
    padding: 0.5rem;
    position: sticky;
    top: 0;
    left: 0;

    & .container {
      width: 100%;
      height: 90%;
      border: 1px solid gray;
      padding: 1rem;
      overflow-y: auto;

      & .product-img {
        height: 50%;
        display: flex;
        justify-content: center;
        & > img {
          width: 100%;
          max-width: 30rem;
          height: 100%;
        }
      }

      & .product-type {
        display: flex;
        flex-direction: column;
        padding: 2rem 0;
        border-bottom: 0.18rem solid ${({ theme }) => theme.colors.grayTwo};
        gap: 2.5rem;

        & > .title {
          font-weight: bold;
          font-size: 1.8rem;
        }

        & > .tagname {
          color: white;
          font-size: 1.3rem;
          & > span {
            padding: 0.5rem 1rem;
            background-color: ${({ theme }) => theme.colors.pointColorPurple};
          }
        }
      }

      & .product-attributes {
        margin-top: 2rem;

        & > .title {
          display: inline-block;
          font-weight: bold;
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        & .attribute-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          & > .attribute {
            display: flex;
            flex-direction: column;

            & span:first-child {
              color: ${({ theme }) => theme.colors.pointColorPurple};
              font-weight: 800;
              word-break: break-word;
            }
          }
        }
      }
    }
  }

  .my-masonry-grid {
    display: flex;
    width: 50%;
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

export default Url;
