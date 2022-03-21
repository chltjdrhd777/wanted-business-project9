import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider } from "@emotion/react";
import theme from "styles/theme";
import GlobalStyle from "styles/global";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "redux/store";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
