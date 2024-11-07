import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteData,
  getData,
  putData,
  removeBoardFromRecentViewedBoards,
} from "../../utils";

export const fetchBoardDetails = createAsyncThunk(
  "boardDetails/fetchBoardDetails",
  async ({ id }) => {
    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      const { data } = await getData(url);
      return data;
    } catch (_err) {
      throw new Error("Failed to load board details!");
    }
  }
);

export const updateBoardName = createAsyncThunk(
  "boardDetails/updateBoardName",
  async ({ id, updatedName }) => {
    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}&name=${updatedName.trim()}`;

    try {
      const { data } = await putData(url);
      return data;
    } catch (_err) {
      throw new Error("Error updating board name");
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boardDetails/deleteBoard",
  async ({ id }) => {
    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await deleteData(url);
      removeBoardFromRecentViewedBoards(id);
    } catch (_err) {
      throw new Error("Error deleting board");
    }
  }
);
