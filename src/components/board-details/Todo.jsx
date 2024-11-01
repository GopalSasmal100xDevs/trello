import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { postData, putData } from "../../utils";
import { toaster } from "../ui/toaster";
import TodoItem from "./TodoItem";

export default function Todo({
  checkItems,
  id,
  setReloadChecklist,
  deleteItemOnCheckList,
  card,
}) {
  const [openItemInput, setOpenItemInput] = useState(false);
  const [item, setItem] = useState("");

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      addItemsOnCheckList();
    } else if (e.key === "Escape") {
      setOpenItemInput(false);
    }
  }

  function addItemsOnCheckList() {
    if (item.trim().length == 0) return;

    const url = `${
      import.meta.env.VITE_CHECKLISTS_BASE_URL
    }/${id}/checkItems?name=${item}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = postData(url).then(() => {
      setOpenItemInput(false);
      setItem("");
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your checklist item has been successfully added!",
        description: "Looks great",
      },
      error: {
        title: "Failed to add items on checklist!",
        description: "Something wrong with the addition",
      },
      loading: {
        title: "Adding item on checklist...",
        description: "Please wait",
      },
    });
  }

  function changeTodoStatus(isComplete, itemId) {
    const url = `${import.meta.env.VITE_CARD_DETAILS_BASE_URL}/${
      card.idCard
    }/checkItem/${itemId}?state=${
      isComplete === "incomplete" ? "complete" : "incomplete"
    }&key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
      import.meta.env.VITE_TRELLO_TOKEN
    }`;

    const promise = putData(url).then(() => {
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your todo status has been changed successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to change todo status!",
        description: "Something wrong with the addition",
      },
      loading: {
        title: "Change todo status...",
        description: "Please wait",
      },
    });
  }

  return (
    <>
      <Flex flexDirection={"column"} gap={4} pt={6}>
        {checkItems?.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            deleteItemOnCheckList={deleteItemOnCheckList}
            changeTodoStatus={changeTodoStatus}
          />
        ))}
      </Flex>
      <Box pt={2}>
        {openItemInput ? (
          <Stack>
            <Input
              placeholder="Add an item"
              size="md"
              autoFocus
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={keyEventHandler}
            />
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Button
                colorPalette={"cyan"}
                variant="surface"
                onClick={addItemsOnCheckList}
              >
                Add
              </Button>
              <Button
                colorPalette={"gray"}
                variant="ghost"
                onClick={() => setOpenItemInput(false)}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        ) : (
          <Button
            colorPalette={"gray"}
            variant="surface"
            onClick={() => setOpenItemInput(true)}
          >
            Add an item
          </Button>
        )}
      </Box>
    </>
  );
}
