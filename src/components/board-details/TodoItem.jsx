import { Flex, Text } from "@chakra-ui/react";

import TodoItemDeleteConfirm from "./DeleteTodoConfirm";
import { Checkbox } from "../ui/checkbox";

export default function TodoItem({
  item,
  deleteItemOnCheckList,
  changeTodoStatus,
}) {
  const { id, name, state } = item;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
      position={"relative"}
    >
      <Checkbox
        variant={"outline"}
        colorPalette={"cyan"}
        cursor={"pointer"}
        checked={state === "complete"}
        onChange={(e) => changeTodoStatus(state, id)}
        width={"full"}
      >
        <Text
          textDecoration={state === "complete" ? "line-through" : "none"}
          fontSize={"sm"}
        >
          {name}
        </Text>
      </Checkbox>
      <TodoItemDeleteConfirm
        id={id}
        deleteItemOnCheckList={deleteItemOnCheckList}
      />
    </Flex>
  );
}
