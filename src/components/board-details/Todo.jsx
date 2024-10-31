import { Box, Card, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "../ui/button";
import { AiTwotoneDelete } from "react-icons/ai";
import { postData } from "../../utils";
import { toaster } from "../ui/toaster";

export default function Todo({ checkItems, id, setReloadChecklist }) {
  const [openItemInput, setOpenItemInput] = useState(true);
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
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  return (
    <>
      <Flex flexDirection={"column"} gap={4} pt={6}>
        {checkItems?.map((item, index) => (
          <TodoItem key={index} item={item} />
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

export function TodoItem({ item }) {
  const { name } = item;

  const [checked, setChecked] = useState(false);
  const [openItemDel, setOpenItemDel] = useState(false);
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
        value={checked}
        onChange={(e) => setChecked(e.target.checked)}
        width={"full"}
      >
        <Text
          textDecoration={checked ? "line-through" : "none"}
          fontSize={"sm"}
        >
          {name}
        </Text>
      </Checkbox>
      <HiOutlineDotsHorizontal
        size={20}
        cursor={"pointer"}
        onClick={() => setOpenItemDel((prev) => !prev)}
      />
      {openItemDel ? (
        <Card.Root
          position={"absolute"}
          zIndex={10}
          maxW="sm"
          right={0}
          top={8}
        >
          <Card.Body>
            <Button variant={"surface"} colorPalette={"red"}>
              <AiTwotoneDelete size={20} />
              Delete
            </Button>
          </Card.Body>
        </Card.Root>
      ) : null}
    </Flex>
  );
}
