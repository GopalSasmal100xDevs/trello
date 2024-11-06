import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../utils";

export const createNewList = createAsyncThunk(
  "boardDetails/createNewList",
  async ({ id, name }) => {
    const url = `${
      import.meta.env.VITE_BOARD_BASE_URL
    }/${id}/lists?name=${name}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      const response = await postData(url);
      return response.data;
    } catch (_err) {
      throw new Error("Failed to create list!");
    }
  }
);

export const featchAllLists = createAsyncThunk(
  "boardDetails/fetchAllLists",
  async ({ id }) => {
    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}/lists?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      const response = await getData(url);
      return response.data;
    } catch (_err) {
      throw new Error("Failed to load board lists!");
    }
  }
);
