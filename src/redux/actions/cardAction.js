import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../utils";

export const fetchCardLists = createAsyncThunk(
  "activeCard/fetchCardLists",
  async ({ id }) => {
    const url = ``;

    try {
      const response = await getData(url);
      return response.data;
    } catch (_err) {
      throw new Error("Failed to load card lists!");
    }
  }
);
