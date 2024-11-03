import { useState } from "react";
import { Box, Editable, Flex, Text } from "@chakra-ui/react";

import TodoItemDeleteConfirm from "./DeleteTodoConfirm";
import { Checkbox } from "../ui/checkbox";
import { toaster } from "../ui/toaster";
import { putData } from "../../utils";

export default function TodoItem({
  item,
  card,
  deleteItemOnCheckList,
  changeTodoStatus,
  setReloadChecklist,
}) {
  const { id, name, state } = item;
  const [todoItemName, setTodoItemName] = useState(name);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateTodoItemName(id);
    }
  }

  function updateTodoItemName(itemId) {
    if (todoItemName.length === 0) return;
    if (todoItemName.trim() === name) return;

    const url = `${import.meta.env.VITE_CARD_DETAILS_BASE_URL}/${
      card.idCard
    }/checkItem/${itemId}?name=${todoItemName.trim()}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = putData(url).then(() => {
      setTodoItemName("");
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your checklist item name has been updated successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to update checklist item name!",
        description: "Something wrong with the updatation",
      },
      loading: {
        title: "Updating checklist item name...",
        description: "Please wait",
      },
    });
  }

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
      position={"relative"}
      w={"100%"}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={3}
        width={"100%"}
      >
        <Checkbox
          variant={"outline"}
          colorPalette={"cyan"}
          cursor={"pointer"}
          checked={state === "complete"}
          onChange={() => changeTodoStatus(state, id)}
        />

        <Editable.Root
          defaultValue={name}
          fontSize={"sm"}
          onChange={(e) => setTodoItemName(e.target.value)}
          onKeyDown={keyEventHandler}
          width={"90%"}
        >
          <Editable.Preview
            textDecoration={state === "complete" ? "line-through" : "none"}
          />
          <Editable.Input />
        </Editable.Root>
      </Box>
      <TodoItemDeleteConfirm
        id={id}
        deleteItemOnCheckList={deleteItemOnCheckList}
      />
    </Flex>
  );
}
