import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

function Index({ children }: PropsWithChildren<{}>) {
  return <Main>{children}</Main>;
}

const Media = css`
  @media screen and (min-width: 768px) {
    padding: var(--w-header-padding);
  }
`;

const Main = styled.main`
  height: 100%;
  padding: var(--m-header-padding);

  ${Media};
`;

export default Index;
