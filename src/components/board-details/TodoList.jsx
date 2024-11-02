import { Editable, Flex, Text } from "@chakra-ui/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Button } from "../ui/button";
import TodoProgressBar from "./TodoProgressBar";
import Todo from "./Todo";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { putData } from "../../utils";

export default function TodoList({
  card,
  setReloadChecklist,
  deleteItemOnCheckList,
  deleteChecklist,
}) {
  const { id, name, checkItems } = card;
  const [checklistName, setChecklistName] = useState(name);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateChecklistName();
    }
  }

  function updateChecklistName() {
    if (checklistName.length === 0) return;
    if (checklistName.trim() === name) return;

    const url = `${import.meta.env.VITE_CHECKLISTS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}&name=${checklistName.trim()}`;

    const promise = putData(url).then(() => {
      setChecklistName("");
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your card name has been updated successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to update card name!",
        description: "Something wrong with the updatation",
      },
      loading: { title: "Updating card name...", description: "Please wait" },
    });
  }

  return (
    <Flex flexDirection={"column"} gap={2} pt={10}>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          <IoMdCheckboxOutline size={20} />
          <Editable.Root
            onValueChange={(e) => setChecklistName(e.value)}
            value={checklistName}
            placeholder={name}
            width={"auto"}
            fontSize={"14px"}
            onKeyDown={keyEventHandler}
            onClick={() => {
              setChecklistName(name);
            }}
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
        </Text>
        <Button
          colorPalette={"gray"}
          variant="surface"
          onClick={() => deleteChecklist(id)}
        >
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
        deleteItemOnCheckList={deleteItemOnCheckList}
        card={card}
      />
    </Flex>
  );
}
