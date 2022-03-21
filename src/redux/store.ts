import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatch,
  useSelector as selector,
} from "react-redux";
import saerchReducer from "./searchSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "searchData",
  storage,
};

const reducers = combineReducers({
  search: saerchReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<AppState> = selector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatch<AppDispatch>();

export default store;
