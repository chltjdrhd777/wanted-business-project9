import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "redux/store";
import styled from "@emotion/styled";
import Card from "components/Card";
import { SearchData } from "redux/searchSlice";

function Url() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.search);
  const target = selector.searchTarget as SearchData;

  useEffect(() => {
    if (!selector.searchTarget && !localStorage.getItem("searchState")) {
      navigate("/");
    }
  }, [navigate, selector]);

  const dataUpdate = useCallback(async () => {
    try {
      //1. find list
      const URL = "https://static.pxl.ai/problem/data/products.json";
      const cacheStorage = await caches.open("products");
      const responsedCache = await cacheStorage.match(URL);

      //2. find attribute from regions
      //@ fetch 사용시 catch thenalbe하게 처리한다.
    } catch (err) {
      alert("error when find data. please check cache");
      navigate("/");
    }
  }, [navigate]);

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
