import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { SearchType } from "routes/Home/Search";
import { useDispatch } from "redux/store";
import { SearchData, setSearchTargetByUrl } from "redux/searchSlice";

interface CardProps {
  name: string;
  price: number;
  imgSrc: string;
  type: SearchType;
}

function Card({ name, price, imgSrc, type }: CardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function navigation() {
    if (type === "keyword") {
      navigate("img", {
        state: {
          url: imgSrc,
        },
      });
      return;
    }

    if (type === "url") {
      try {
        const URL = "https://static.pxl.ai/problem/data/products.json";
        const cacheStorage = await caches.open("products");
        const responsedCache = await cacheStorage.match(URL);
        const lists = await responsedCache!.json();
        const target = lists!.find((list: SearchData) => list.image_url.includes(imgSrc));

        dispatch(setSearchTargetByUrl(target));

        navigate("");
      } catch (err) {
        alert("cannot occur only if intentionally delete cache");
        navigate("/");
      }
    }
  }

  return (
    <CardArticle className="flex-center-C">
      <div className="product-img" onClick={navigation}>
        <img src={imgSrc} alt={name} />
      </div>

      <div className="product-name">
        <p>{name}</p>
      </div>

      <div className="price">
        <span>{price}</span>
      </div>
    </CardArticle>
  );
}

const CardArticle = styled.article``;

export default Card;
