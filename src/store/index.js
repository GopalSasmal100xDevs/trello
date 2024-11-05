import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "../redux/reducers/boardsReducer";

export const store = configureStore({
  reducer: {
    allBoards: boardsReducer,
  },
});
