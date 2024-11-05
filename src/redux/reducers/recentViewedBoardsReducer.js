import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  error: null,
};

const boardsSlice = createSlice({
  name: "recentViewedBoards",
  initialState,
  reducers: {
    loadRecentlyViewedBoards: (state) => {
      try {
        let recentBoards =
          JSON.parse(localStorage.getItem("recentViewedBoards")) || [];

        if (recentBoards.length > 4) {
          recentBoards = recentBoards.slice(0, 4);
        }

        state.boards = recentBoards;
      } catch (_err) {
        toaster.create({
          description: "Failed to loads recent viewed board!",
          type: "error",
        });
      }
    },
    updateRecentlyViewedBoards: (state, action) => {
      try {
        const { id: boardId, name } = action.payload;

        let recentBoards =
          JSON.parse(localStorage.getItem("recentViewedBoards")) || [];

        recentBoards = recentBoards.filter(({ id }) => id !== boardId);
        recentBoards = [{ id: boardId, name }, ...recentBoards];

        if (recentBoards.length > 4) {
          recentBoards = recentBoards.slice(0, 4);
        }
        localStorage.setItem(
          "recentViewedBoards",
          JSON.stringify(recentBoards)
        );
        state.boards = recentBoards;
      } catch (_err) {
        toaster.create({
          description: "Failed to store recent viewed board!",
          type: "error",
        });
      }
    },
  },
});

export default boardsSlice.reducer;
export const { loadRecentlyViewedBoards, updateRecentlyViewedBoards } =
  boardsSlice.actions;
