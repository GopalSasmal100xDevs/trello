import { useState } from "react";
import { Box, Editable, Flex } from "@chakra-ui/react";

import TodoItemDeleteConfirm from "./DeleteTodoConfirm";
import { Checkbox } from "../ui/checkbox";
import { toaster } from "../ui/toaster";
import { useDispatch } from "react-redux";
import {
  changeTodoStatus,
  silentFetchCardCheckLists,
  updateTodoItemName,
} from "../../redux/actions/cardAction";
import { LuClock2 } from "react-icons/lu";

export default function TodoItem({ item, checklist }) {
  const { id, name, state } = item;
  const { idCard } = checklist;
  const dispatch = useDispatch();
  const [todoItemName, setTodoItemName] = useState(name);
  const [updating, setUpdating] = useState(false);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateTodoItemName(id);
    }
  }

  async function handleUpdateTodoItemName(itemId) {
    if (todoItemName.length === 0) return;
    if (todoItemName.trim() === name) return;

    await dispatch(
      updateTodoItemName({ idCard, idItem: itemId, name: todoItemName.trim() })
    );

    if (updateTodoItemName.fulfilled) {
      toaster.success({
        title: "Your checklist item name has been updated successfully!",
        description: "Looks great",
      });
      setTodoItemName("");

      dispatch(silentFetchCardCheckLists({ id: idCard }));
    } else if (updateTodoItemName.rejected) {
      toaster.error({
        title: "Failed to update checklist item name!",
        description: "Something wrong with the updatation",
      });
    }
  }

  async function handleChangeTodoStatus(isComplete, itemId) {
    setUpdating(true);
    await dispatch(changeTodoStatus({ isComplete, itemId, idCard }));

    if (changeTodoStatus.fulfilled) {
      dispatch(silentFetchCardCheckLists({ id: idCard }));
      toaster.success({
        title: "Your todo status has been changed successfully!",
        description: "Looks great",
      });
      setUpdating(false);
    } else if (changeTodoStatus.rejected) {
      toaster.error({
        title: "Failed to change todo status!",
        description: "Something wrong with the change",
      });
    }
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
          onChange={() => handleChangeTodoStatus(state, id)}
        />
        {updating ? <LuClock2 size={20} /> : null}

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
      <TodoItemDeleteConfirm id={id} checklist={checklist} />
    </Flex>
  );
}
