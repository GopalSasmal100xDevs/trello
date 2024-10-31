import { Flex, Text } from "@chakra-ui/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Button } from "../ui/button";
import TodoProgressBar from "./TodoProgressBar";
import Todo from "./Todo";

export default function TodoList({ card, setReloadChecklist }) {
  const { id, name, checkItems } = card;

  return (
    <Flex flexDirection={"column"} gap={2} pt={10}>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <Text fontSize={"md"} fontWeight={"bold"} display={"flex"} gap={2}>
          <IoMdCheckboxOutline size={20} />
          {name}
        </Text>
        <Button colorPalette={"gray"} variant="surface">
          Delete
        </Button>
      </Flex>

      {checkItems?.length > 0 ? (
        <TodoProgressBar checkItems={checkItems} />
      ) : null}

      <Todo
        checkItems={checkItems}
        id={id}
        setReloadChecklist={setReloadChecklist}
      />
    </Flex>
  );
}
