import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

function Index({ children }: PropsWithChildren<{}>) {
  return <Main>{children}</Main>;
}

const Media = css`
  @media screen and (min-width: 768px) {
    height: 1px;
    min-height: calc(100vh - var(--w-header-height));
    transform: translateY(var(--w-header-height));
    padding: var(--w-header-padding);
  }
`;

const Main = styled.main`
  height: 1px;
  min-height: calc(100vh - var(--m-header-height));
  transform: translateY(var(--m-header-height));
  padding: var(--m-header-padding);
  overflow-y: scroll;

  ${Media};
`;

export default Index;
