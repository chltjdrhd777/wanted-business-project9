import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface SubmitState {
  status: "idle" | "success" | "fail" | "pending";
  message: string;
}

function Index() {
  const [value, setValue] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const resetSubmit = { status: "idle", message: "" } as const;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const current = inputRef.current as HTMLInputElement;
    current.focus();
  }, []);

  async function onHandleSearch() {
    const URL = "https://static.pxl.ai/problem/data/products.json";
    const cacheStorage = await caches.open("search");
    const responsedCache = await cacheStorage.match(URL);
    try {
      if (responsedCache) {
        console.log(await responsedCache.json());
      } else {
        fetch(URL).then(async (response) => {
          const clone = response.clone();
          cacheStorage.put(URL, response);
          console.log(await clone.json());
        });
      }
    } catch (err) {
      console.log(err);
      setSubmitState({
        status: "fail",
        message: "다시 시도해주세요",
      });

      setTimeout(() => setSubmitState(resetSubmit), 500);
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
        <button type="button" onClick={onHandleSearch}>
          search
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
    }
  }

  ${Media}
`;

export default Index;
