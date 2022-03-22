import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import makeClass from "helper/makeClass";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SearchData } from "redux/searchSlice";
import { useDispatch } from "redux/store";
import { setSearchListByKeyword, setSearchTargetByUrl } from "redux/searchSlice";

export interface SubmitState {
  status: "idle" | "pending" | "error";
  message: string;
}

export type SearchType = "keyword" | "url";

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const resetSubmit = { status: "idle", message: "" } as const;

  // search bar focus when mounted
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  async function onHandleSearch() {
    if (typeof value === "string" && !value.trim()) return;
    if (submitState.status === "pending" || submitState.status === "error") return;

    setSubmitState({ status: "pending", message: "" });
    const isURL = /^https?:\/\//;

    if (!isURL.test(value)) {
      search("keyword");
      return;
    }

    if (isURL.test(value)) {
      search("url");
      return;
    }
  }

  async function search(type: SearchType) {
    const URL = "https://static.pxl.ai/problem/data/products.json";
    const cacheStorage = await caches.open("products");
    const responsedCache = await cacheStorage.match(URL);
    try {
      if (responsedCache) {
        const lists = await responsedCache.json();
        const filteredLists = filter(value, lists, type);

        if (!filteredLists?.length) {
          denySubmit("No result");
          return;
        }

        finishSubmit(filteredLists, `/product/${type}`, type);
      } else {
        fetch(URL).then(async (response) => {
          cacheStorage.put(URL, response);
          const lists = await response.clone().json();
          const filteredLists = filter(value, lists, type);

          if (!filteredLists?.length) {
            denySubmit("No result");
            return;
          }

          finishSubmit(filteredLists, `/product/${type}`, type);
        });
      }
    } catch (err) {
      console.log(err);
      denySubmit("Can't find");
      return;
    }
  }

  function filter(value: string, lists: SearchData[], type: SearchType) {
    value = value.replace("드레스", "원피스");

    if (type === "keyword") {
      return lists.filter((list) => list.name.includes(value));
    }

    if (type === "url") {
      const target = lists.find((list) => list.image_url.includes(value));

      if (!target) return [];
      return [target];
    }
  }

  function denySubmit(message: string) {
    setSubmitState({ status: "error", message });
    setTimeout(() => setSubmitState(resetSubmit), 1000);
  }

  function finishSubmit(filteredLists: SearchData[], navigatePath: string, type: SearchType) {
    if (type === "keyword") {
      dispatch(setSearchListByKeyword(filteredLists));
      navigate(navigatePath, { state: { keyword: value } });
    } else if (type === "url") {
      dispatch(setSearchTargetByUrl(filteredLists[0]));
      navigate(navigatePath);
    }

    localStorage.setItem("searchState", "true");
  }

  function buttonText() {
    switch (submitState.status) {
      case "idle":
        return "search";
      case "pending":
        return <AiOutlineLoading3Quarters className="loading-icon" />;
      case "error":
        return submitState.message;
    }
  }

  return (
    <Section className="flex-center-C">
      <p className="title">
        <span className="bold">Artificial Intelligence</span>

        <br />

        <span>PXL</span>
        <span className="bold"> Fashion </span>
        <span>Viewer</span>
      </p>

      <form
        className="input-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
        <button
          onClick={onHandleSearch}
          className={makeClass({
            active: value.trim(),
            pending: submitState.status === "pending",
            error: submitState.status === "error",
          })}
        >
          {buttonText()}
        </button>
      </form>
    </Section>
  );
}

const Media = css`
  @media screen and (min-width: 1250px) {
    & p.title {
      font-size: 5rem;
    }

    & form.input-form {
      flex-direction: row;

      & > button {
        max-width: 15rem;
      }
    }
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  gap: 8rem;

  & p.title {
    font-size: 2.8rem;
    text-align: center;
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.grayThree};

    & span.bold {
      color: ${({ theme }) => theme.colors.grayFour};
      font-weight: 500;
    }
  }

  & form.input-form {
    width: 100%;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > input {
      width: 90%;
      max-width: 75rem;
      height: 5rem;
      border: none;
      border-radius: 5rem;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
      font-size: 1.8rem;
      text-align: center;
    }

    & > button {
      width: 30%;
      max-width: 20rem;
      padding: 1rem;
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.grayThree};
      transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out;

      &.active {
        background-color: ${({ theme }) => theme.colors.indigo};
        color: ${({ theme }) => theme.colors.grayOne};
      }

      &.pending {
        & .loading-icon {
          ${({ theme }) => theme.animations.rotate}
        }
      }

      &.error {
        background-color: ${({ theme }) => theme.colors.waringColor};
        color: ${({ theme }) => theme.colors.grayOne};
      }
    }
  }

  ${Media}
`;

export default Index;
