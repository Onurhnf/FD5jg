import { createSlice } from "@reduxjs/toolkit";

export const PrevPageSlice = createSlice({
  name: "prevPage",
  initialState: {
    data: null,
  },
  reducers: {
    setPrev: (state, action) => {
      state.data = action.payload;
    },
    removePrev: (state) => {
      state.data = null;
    },
  },
});

export const { setPrev, removePrev } = PrevPageSlice.actions;

export default PrevPageSlice.reducer;
