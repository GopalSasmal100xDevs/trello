import { createSlice } from "@reduxjs/toolkit";

import { fetchAllBoards, createNewBoard } from "../actions/boardsAction";

const initialState = {
  loading: false,
  boards: [],
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    sortBoards: (state, action) => {
      const { value = "ALPHABETICALLY_A_Z" } = action.payload;

      state.boards = state.boards.sort((a, b) => {
        if (value === "ALPHABETICALLY_A_Z") {
          return a.name.localeCompare(b.name);
        } else if (value === "ALPHABETICALLY_Z_A") {
          return b.name.localeCompare(a.name);
        } else return 0;
      });
    },
    searchBoards: (state, action) => {
      const { searchString = "" } = action.payload;
      state.boards = state.boards.filter(({ name }) =>
        name.toLowerCase().includes(searchString.trim().toLowerCase())
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchAllBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createNewBoard.pending, (state) => {})
      .addCase(createNewBoard.fulfilled, (state, action) => {})
      .addCase(createNewBoard.rejected, (state, action) => {});
  },
});

export default boardsSlice.reducer;
export const { sortBoards, searchBoards } = boardsSlice.actions;
