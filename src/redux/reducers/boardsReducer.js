import { createSlice } from "@reduxjs/toolkit";

import { fetchAllBoards } from "../actions/boardsAction";

const initialState = {
  loading: false,
  boards: [],
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
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
  },
});

export default boardsSlice.reducer;
