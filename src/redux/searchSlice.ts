import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchData {
  product_code: number;
  name: string;
  price: number;
  image_url: string;
  category_names: string[];
  attributes?: { [key: string]: string[] };
}

export interface RegionData {
  product_code: number;
  region_id: number;
  image_url: string;
  gender: string;
  attributes: { [key: string]: string }[];
}

export interface State {
  searchTarget: SearchData | null; // only for url search
  attributes: { [key: string]: string }[]; //only for url search

  searchList: SearchData[];
  sliderList: SearchData[];
}

export const initialState: State = {
  searchTarget: null,
  searchList: [],
  attributes: [],
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
    setSearchList: (state, { payload }: PayloadAction<SearchData[]>) => {
      state.searchList = payload;
    },
    setAttributes: (state, { payload }: PayloadAction<{ [key: string]: string }[]>) => {
      state.attributes = payload;
    },
    setSliderList: (state, { payload }: PayloadAction<SearchData[]>) => {
      state.sliderList = payload;
    },
    reset: (state) => {
      state.searchTarget = null;
      state.searchList = [];
      state.attributes = [];
      state.sliderList = [];
    },
  },
});

export const {
  setSearchListByKeyword,
  setSearchTargetByUrl,
  setSearchList,
  setAttributes,
  setSliderList,
  reset,
} = slice.actions;
export default slice.reducer;
