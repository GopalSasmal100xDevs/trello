import { createSlice } from "@reduxjs/toolkit";
import { fetchCardLists } from "../actions/cardAction";

const initialState = {
  loading: false,
  card: { cardId: "", name: "", cardCheckLists: [] },
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
    builder
      .addCase(fetchCardLists.pending, (state) => {})
      .addCase(fetchCardLists.fulfilled, (state, action) => {})
      .addCase(fetchCardLists.rejected, (state, action) => {});
  },
});

export default activeCardSlice.reducer;
export const {} = activeCardSlice.actions;
