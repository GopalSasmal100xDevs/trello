import { createAsyncThunk } from "@reduxjs/toolkit";

import { paths } from "../../utils/pathManager";
import { getData, postData } from "../../utils";
import { toaster } from "../../components/ui/toaster";

export const fetchAllBoards = createAsyncThunk(
  "boards/fetchAllBoards",
  async () => {
    const { allBoardsPath } = paths;
    try {
      const { data } = await getData(allBoardsPath);
      return data;
    } catch (_err) {
      toaster.create({
        description: "Failed to load boards!",
        type: "error",
      });

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

    const promise = postData(createNewBoardPath);

    toaster.promise(promise, {
      success: {
        title: "Your board has been created successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to create board!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Creating board...", description: "Please wait" },
    });

    return promise;
  }
);
