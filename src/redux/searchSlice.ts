import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchData {
  product_code: number;
  name: string;
  price: number;
  image_url: string;
  category_names: string[];
  attributes?: { [key: string]: string[] };
}

export interface State {
  searchTarget: SearchData | null; // only for url search
  searchList: SearchData[];
  sliderList: SearchData[];
}

export const initialState: State = {
  searchTarget: null,
  searchList: [],
  sliderList: [],
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchListByKeyword: (state, { payload }: PayloadAction<SearchData[]>) => {
      state.searchList = payload;
    },
    setSearchTargetByUrl: (state, { payload }: PayloadAction<SearchData>) => {
      state.searchTarget = payload;
    },
    setSliderList: (state, { payload }: PayloadAction<SearchData[]>) => {
      state.sliderList = payload;
    },
    reset: (state) => {
      state.searchTarget = null;
      state.searchList = [];
      state.sliderList = [];
    },
  },
});

export const { setSearchListByKeyword, setSearchTargetByUrl, setSliderList, reset } = slice.actions;
export default slice.reducer;
