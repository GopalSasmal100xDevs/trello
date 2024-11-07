import { createAsyncThunk } from "@reduxjs/toolkit";

import { paths } from "../../utils/pathManager";
import { getData, postData } from "../../utils";

export const fetchAllBoards = createAsyncThunk(
  "boards/fetchAllBoards",
  async () => {
    const { allBoardsPath } = paths;
    try {
      const { data } = await getData(allBoardsPath);
      return data;
    } catch (_err) {
      throw new Error("Failed to load boards!");
    }
  }
);

export const createNewBoard = createAsyncThunk(
  "boards/createNewBoard",
  async ({ title, color }) => {
    const createNewBoardPath = `${
      import.meta.env.VITE_BOARD_BASE_URL
    }/?name=${encodeURIComponent(title)}&prefs_background=${color}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      const { data } = await postData(createNewBoardPath);
      return data;
    } catch (error) {
      throw new Error("Failed to create board!");
    }
  }
);
