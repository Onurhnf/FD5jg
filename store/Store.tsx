import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import PrevPage from "./PrevPageSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    prevPage: PrevPage,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
