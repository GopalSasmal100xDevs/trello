import { useState } from "react";
import { Box, Flex, Input, Stack } from "@chakra-ui/react";

import { Button } from "../ui/button";
import { toaster } from "../ui/toaster";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import {
  addItemsOnCheckList,
  silentFetchCardCheckLists,
} from "../../redux/actions/cardAction";

export default function Todo({
  checkItems,
  id,
  setReloadChecklist,
  deleteItemOnCheckList,
  checklist,
}) {
  const [openItemInput, setOpenItemInput] = useState(false);
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  const { idCard } = checklist;

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      handleAddItemsOnCheckList();
    } else if (e.key === "Escape") {
      setOpenItemInput(false);
    }
  }

  async function handleAddItemsOnCheckList() {
    if (item.trim().length == 0) return;

    await dispatch(addItemsOnCheckList({ id, item }));

    if (addItemsOnCheckList.fulfilled) {
      toaster.success({
        title: "Your checklist item has been successfully added!",
        description: "Looks great",
      });
      setItem("");
      dispatch(silentFetchCardCheckLists({ id: idCard }));
    } else if (addItemsOnCheckList.rejected) {
      toaster.error({
        title: "Failed to add items on checklist!",
        description: "Something wrong with the addition",
      });
    }
  }

  return (
    <>
      <Flex flexDirection={"column"} gap={4} pt={6}>
        {checkItems?.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            checklist={checklist}
            deleteItemOnCheckList={deleteItemOnCheckList}
            setReloadChecklist={setReloadChecklist}
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
              value={item}
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={keyEventHandler}
            />
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Button
                colorPalette={"cyan"}
                variant="surface"
                onClick={handleAddItemsOnCheckList}
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
