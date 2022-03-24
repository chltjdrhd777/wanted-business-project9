import React, { useEffect, useCallback } from "react";
import { Search, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "redux/store";
import styled from "@emotion/styled";
import Card from "components/Card";
import {
  SearchData,
  setSearchTargetByUrl,
  setSearchList,
  setSliderList,
  RegionData,
  setAttributes,
} from "redux/searchSlice";

function Url() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTarget, searchList } = useSelector((state) => state.search);
  const target = searchTarget as SearchData;

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
  }, [navigate]);

  async function storeListUpdate(filteredList: SearchData[]) {
    const URL = "https://static.pxl.ai/problem/data/regions.json";
    const cacheStorage = await caches.open("regions");
    const responsedCache = await cacheStorage.match(URL);
    if (responsedCache) {
      const lists = (await responsedCache.json()) as RegionData[];
      const findtargetRegion = lists.find(
        (list) => list.product_code === searchTarget?.product_code
      );

      if (!findtargetRegion) {
        alert("there is an Error from data");
        navigate("/");
        return;
      }

      dispatch(setSearchList(filteredList));
      dispatch(setAttributes(findtargetRegion.attributes));
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

  return (
    <Section>
      <Card imgSrc={target?.image_url} name={target?.name} price={target?.price} type={"url"} />
    </Section>
  );
}

const Section = styled.section`
  height: 100%;
`;

export default Url;
