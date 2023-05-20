import { IProduct } from "@/interfaces/Product/IProduct.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrevPageState {
  data: string | null;
  product: IProduct.IProductDetail | null;
}

const initialState: PrevPageState = {
  data: null,
  product: null,
};

export const PrevPageSlice = createSlice({
  name: "prevPage",
  initialState,
  reducers: {
    setPrevName: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    removePrev: (state) => {
      state.data = null;
      state.product = null;
    },
    setPrevProduct: (state, action: PayloadAction<IProduct.IProductDetail>) => {
      state.product = action.payload;
    },
  },
});

export const { setPrevName, removePrev, setPrevProduct } =
  PrevPageSlice.actions;

export default PrevPageSlice.reducer;
