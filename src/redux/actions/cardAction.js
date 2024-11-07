import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, postData, putData } from "../../utils";

export const silentFetchCardCheckLists = createAsyncThunk(
  "activeCard/silentFetchCardCheckLists",
  async ({ id }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${id}/checklists?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
      import.meta.env.VITE_TRELLO_TOKEN
    }`;

    try {
      const response = await getData(url);
      return response.data;
    } catch (err) {
      throw new Error("Failed to load card lists!");
    }
  }
);

export const fetchCardCheckLists = createAsyncThunk(
  "activeCard/fetchCardCheckLists",
  async ({ id }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${id}/checklists?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
      import.meta.env.VITE_TRELLO_TOKEN
    }`;

    try {
      const response = await getData(url);
      return response.data;
    } catch (err) {
      throw new Error("Failed to load card lists!");
    }
  }
);

export const addNewCheckList = createAsyncThunk(
  "activeCard/addNewCheckList",
  async ({ id, title }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${id}/checklists?name=${title}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await postData(url);
    } catch (_error) {
      throw new Error("Failed to add item on checklist!");
    }
  }
);

export const addItemsOnCheckList = createAsyncThunk(
  "activeCard/addItemOnCheckList",
  async ({ id, item }) => {
    const url = `${
      import.meta.env.VITE_CHECKLISTS_BASE_URL
    }/${id}/checkItems?name=${item}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await postData(url);
    } catch (_error) {
      throw new Error("Failed to add item on checklist!");
    }
  }
);

export const deleteItemOnCheckList = createAsyncThunk(
  "activeCard/deleteItemOnCheckList",
  async ({ cardId, itemId }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${cardId}/checkItem/${itemId}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await deleteData(url);
    } catch (_err) {
      throw new Error("Failed to delete item on checklist!");
    }
  }
);

export const deleteChecklist = createAsyncThunk(
  "activeCard/deleteChecklist",
  async ({ id }) => {
    const url = `${import.meta.env.VITE_CHECKLISTS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await deleteData(url);
    } catch (error) {
      throw new Error("Failed to delete checklist!");
    }
  }
);

export const updateTodoItemName = createAsyncThunk(
  "activeCard/updateTodoItemName",
  async ({ idCard, idItem, name }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${idCard}/checkItem/${idItem}?name=${name}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      await putData(url);
    } catch (_error) {
      throw new Error("Failed to update checklist item name!");
    }
  }
);

export const changeTodoStatus = createAsyncThunk(
  "activeCard/changeTodoStatus",
  async ({ isComplete, itemId, idCard }) => {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${idCard}/checkItem/${itemId}?state=${
      isComplete === "incomplete" ? "complete" : "incomplete"
    }&key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
      import.meta.env.VITE_TRELLO_TOKEN
    }`;

    try {
      await putData(url);
    } catch (_error) {
      throw new Error("Failed to change todo status!");
    }
  }
);
