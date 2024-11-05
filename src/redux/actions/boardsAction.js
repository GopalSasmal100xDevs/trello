import { createAsyncThunk } from "@reduxjs/toolkit";

import { paths } from "../../utils/pathManager";
import { getData } from "../../utils";
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
