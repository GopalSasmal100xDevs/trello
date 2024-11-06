import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBoard,
  fetchBoardDetails,
  updateBoardName,
} from "../actions/boardDetailsAction";
import { createNewList, featchAllLists } from "../actions/listAction";

const initialState = {
  board: {
    boardInfo: {
      loading: false,
      details: {},
    },
    boardLists: {
      loading: false,
      lists: [],
    },
  },
  error: {
    detailsError: null,
    listsError: null,
  },
};

const boardDetailsSlice = createSlice({
  name: "boardDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Fetching board details */
    builder
      .addCase(fetchBoardDetails.pending, (state) => {
        state.board.boardInfo.loading = true;
        state.error.detailsError = null;
      })
      .addCase(fetchBoardDetails.fulfilled, (state, action) => {
        state.board.boardInfo.loading = false;
        state.board.boardInfo.details = action.payload;
      })
      .addCase(fetchBoardDetails.rejected, (state, action) => {
        state.board.boardInfo.loading = false;
        state.error.detailsError = action.error.message;
      });

    /** Fetching all lists on a board */
    builder
      .addCase(featchAllLists.pending, (state) => {
        state.board.boardLists.loading = true;
        state.error.listsError = null;
      })
      .addCase(featchAllLists.fulfilled, (state, action) => {
        state.board.boardLists.loading = false;
        state.board.boardLists.lists = action.payload;
      })
      .addCase(featchAllLists.rejected, (state, action) => {
        state.board.boardLists.loading = false;
        state.error.listsError = action.error.message;
      });

    /** Creating New List on a board */
    builder.addCase(createNewList.fulfilled, () => {});

    /** Updating Board name */
    builder.addCase(updateBoardName.fulfilled, (state, action) => {
      state.board.boardInfo.details = action.payload;
    });

    /** Deleting Board */
    builder.addCase(deleteBoard.fulfilled, (state, action) => {});
  },
});

export default boardDetailsSlice.reducer;
export const {} = boardDetailsSlice.actions;
