import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
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
  q?: string;
}

function Card({ name, price, imgSrc, type, q }: CardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (q === "드레스") {
    q = "원피스";
  }

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
    <CardArticle onClick={navigation} className="masonry-grid-item">
      <div className="product-img">
        <img src={imgSrc} alt={name} />
      </div>

      <div className="product-info-overlay">
        <div className="product-info-content">
          <div className="product-name">
            <p>
              <span>[테스트_테스트백화점] 그럴싸한 백화점 </span>
              {name.split("").map((ch, idx) => (
                <span key={idx} className={q?.includes(ch) ? "highlight" : ""}>
                  {ch}
                </span>
              ))}
            </p>
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

const Media = css``;

const CardArticle = styled.article`
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;

    & .product-info-content {
      max-width: 80%;
      background-color: white;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      padding: 1rem;
      border-radius: 1rem;

      & > .product-name {
        font-weight: 500;
        font-size: 1.8rem;
        text-align: right;
        font-size: 1.5rem;

        & span {
          white-space: pre-wrap;
          word-break: break-word;
        }

        & span.highlight {
          color: red;
        }
      }

      & > .price {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-direction: row-reverse;
        margin-top: 1.2rem;
        font-size: 1.5rem;
        & > .icon {
          font-size: 2rem;
        }
        color: ${({ theme }) => theme.colors.pointColorPurple};
      }
    }
  }

  ${Media}
`;

export default Card;
