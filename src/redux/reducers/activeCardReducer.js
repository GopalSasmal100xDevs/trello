import { createSlice } from "@reduxjs/toolkit";
import {
  addItemsOnCheckList,
  addNewCheckList,
  changeTodoStatus,
  deleteChecklist,
  deleteItemOnCheckList,
  fetchCardCheckLists,
  silentFetchCardCheckLists,
  updateTodoItemName,
} from "../actions/cardAction";

const initialState = {
  loading: false,
  card: { cardId: "", name: "", loading: false, cardCheckLists: [] },
  error: null,
};

const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveCard: (state, action) => {
      const { cardId, name } = action.payload;
      state.card.cardId = cardId;
      state.card.name = name;
    },
  },
  extraReducers: (builder) => {
    /** Fetching card checklists */
    builder
      .addCase(fetchCardCheckLists.pending, (state) => {
        state.card.loading = true;
        state.error = null;
      })
      .addCase(fetchCardCheckLists.fulfilled, (state, action) => {
        state.card.loading = false;
        state.card.cardCheckLists = action.payload;
      })
      .addCase(fetchCardCheckLists.rejected, (state, action) => {
        state.card.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(silentFetchCardCheckLists.fulfilled, (state, action) => {
      state.card.cardCheckLists = action.payload;
    });

    /** Add new checklist */
    builder
      .addCase(addNewCheckList.fulfilled)
      .addCase(addNewCheckList.rejected);

    /** Add items on checklist */
    builder
      .addCase(addItemsOnCheckList.fulfilled)
      .addCase(addItemsOnCheckList.rejected);

    /** Delete item on checklist */
    builder
      .addCase(deleteItemOnCheckList.fulfilled)
      .addCase(deleteItemOnCheckList.rejected);

    /** Delete checklist */
    builder
      .addCase(deleteChecklist.fulfilled)
      .addCase(deleteChecklist.rejected);

    /** Update todo item name */
    builder
      .addCase(updateTodoItemName.fulfilled)
      .addCase(updateTodoItemName.rejected);

    /** Change todo status */
    builder
      .addCase(changeTodoStatus.fulfilled)
      .addCase(changeTodoStatus.rejected);
  },
});

export default activeCardSlice.reducer;
export const { setActiveCard } = activeCardSlice.actions;
