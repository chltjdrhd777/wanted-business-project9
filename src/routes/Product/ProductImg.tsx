import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { IoIosArrowBack } from "react-icons/io";

function ProductImg() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  // state:url
  return (
    <Section className="flex-center-C">
      <button onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </button>

      <div className="img">
        <img src={(state as { url: string }).url} alt="" />
      </div>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: 100%;
  background-color: black;
  position: relative;

  & button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    font-size: 2rem;
    & > svg {
      margin-top: 0.2rem;
      margin-right: 0.2rem;
    }
  }

  & .img {
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export default ProductImg;
