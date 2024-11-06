import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "../redux/reducers/boardsReducer";
import recentViewedBoardsReducer from "../redux/reducers/recentViewedBoardsReducer";
import boardDetailsReducer from "../redux/reducers/boardDetailsReducer";
import activeCardReducer from "../redux/reducers/activeCardReducer";

export const store = configureStore({
  reducer: {
    recentViewedBoards: recentViewedBoardsReducer,
    allBoards: boardsReducer,
    boardDetails: boardDetailsReducer,
    activeCard: activeCardReducer,
  },
});
