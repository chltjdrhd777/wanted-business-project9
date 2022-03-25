import React, { useRef } from "react";
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

  const imgRef = useRef<HTMLImageElement | null>(null);

  async function navigation() {
    if (type === "keyword") {
      rememberScroll();

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

        if (!target) {
          alert("cannot occur only if intentionally delete cache");
          navigate("/");
        }

        dispatch(setSearchTargetByUrl(target));

        navigate("");
      } catch (err) {
        alert("cannot occur only if intentionally delete cache");
        navigate("/");
      }
    }
  }

  function rememberScroll() {
    // only for keyword search
    const target = document.querySelector(".searchResult-main");
    localStorage.setItem("scrollTop", JSON.stringify(target?.scrollTop));
  }

  return (
    <CardArticle onClick={navigation} className="masonry-grid-item">
      <div className="product-img">
        <img src={imgSrc} alt={name} ref={imgRef} onError={() => {}} />
      </div>

      {type === "keyword" ? (
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
      ) : (
        <div className="product-info-urlsearch">
          <div className="product-name-urlsearch">
            <p>
              <span>[테스트_테스트백화점] 그럴싸한 백화점 </span>
              {name}
            </p>
          </div>

          <div className="product-price-urlsearch">
            {price}
            <RiMoneyDollarCircleLine className="icon" />
          </div>
        </div>
      )}
    </CardArticle>
  );
}

const Media = css`
  @media screen and (max-width: 500px) {
    .product-info-urlsearch {
      & .product-name-urlsearch {
        font-size: 1.3rem;
      }

      & .product-price-urlsearch {
        font-size: 1.2rem;
        & svg {
          font-size: 1.6rem;
        }
      }
    }
  }

  @media screen and (max-width: 420px) {
    .product-info-urlsearch {
      & .product-name-urlsearch {
        font-size: 1rem;
      }

      & .product-price-urlsearch {
        font-size: 1rem;
        & svg {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

const CardArticle = styled.article`
  position: relative;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 0.5rem;
  overflow: hidden;

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

  & .product-info-urlsearch {
    padding: 0.5rem 1rem;
    background-color: white;
    border-top: 1px solid gray;

    & .product-name-urlsearch {
      font-size: 1.5rem;
    }

    & .product-price-urlsearch {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 0.5rem;
      color: ${({ theme }) => theme.colors.pointColorPurple};
      & svg {
        font-size: 2rem;
      }
      margin-top: 0.5rem;
    }
  }

  ${Media}
`;

export default Card;
