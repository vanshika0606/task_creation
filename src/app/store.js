import { configureStore } from "@reduxjs/toolkit";
import listsSlice from "../features/list/listsSlice";

export const store = configureStore({
  reducer: {
    lists: listsSlice,
  },
});
