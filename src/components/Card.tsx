import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { SearchType } from "routes/Home/Search";
import { useDispatch } from "redux/store";
import { SearchData, setSearchTargetByUrl } from "redux/searchSlice";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

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
    <CardArticle className="masonry-grid-item" onClick={navigation}>
      <div className="product-img">
        <img src={imgSrc} alt={name} />
      </div>

      <div className="product-info-overlay">
        <div className="product-info-content">
          <div className="product-name">
            <p>{name}</p>
          </div>

          <div className="price">
            <span>{price}</span>
            <RiMoneyDollarCircleLine className="icon" />
          </div>
        </div>
      </div>
    </CardArticle>
  );
}

const CardArticle = styled.article`
  width: 25%;
  position: relative;
  cursor: pointer;
  &:hover {
    & .product-info-overlay {
      opacity: 1;
    }
  }

  & .product-img {
    display: flex;
    & > img {
      width: 100%;
    }
  }

  & .product-info-overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;

    & .product-info-content {
      max-width: 40%;
      background-color: white;
      transform: translate(1rem, 1rem);
      padding: 1rem;
      border-radius: 1rem;

      & > .product-name {
        font-weight: 500;
        font-size: 1.8rem;
      }

      & > .price {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-direction: row-reverse;
        margin-top: 1.2rem;
        font-size: 1.8rem;
        & > .icon {
          font-size: 2.5rem;
        }
        color: ${({ theme }) => theme.colors.pointColorPurple};
      }
    }
  }
`;

export default Card;
