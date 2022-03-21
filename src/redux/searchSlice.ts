import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchData {
  product_code: number;
  name: string;
  price: number;
  image_url: string;
  category_names: string[];
}

export interface State {
  searchList: SearchData[];
}

export const initialState: State = {
  searchList: [],
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchList: (state, action: PayloadAction<SearchData[]>) => {},
  },
});

export const { setSearchList } = slice.actions;
export default slice.reducer;
