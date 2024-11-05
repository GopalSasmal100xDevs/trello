import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "../redux/reducers/boardsReducer";
import recentViewedBoardsReducer from "../redux/reducers/recentViewedBoardsReducer";
import { redirectMiddleware } from "../middlewares/redirect";

export const store = configureStore({
  reducer: {
    recentViewedBoards: recentViewedBoardsReducer,
    allBoards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redirectMiddleware),
});
