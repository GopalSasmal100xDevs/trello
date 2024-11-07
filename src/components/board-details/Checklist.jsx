import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  Flex,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdPlaylistRemove } from "react-icons/md";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { deleteData } from "../../utils";
import { toaster } from "../ui/toaster";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCheckList,
  fetchCardCheckLists,
  silentFetchCardCheckLists,
} from "../../redux/actions/cardAction";

export default function CheckList({ card }) {
  const { id } = card;
  const dispatch = useDispatch();
  const [openCheckListInput, setOpenCheckListInput] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [reloadChecklist, setReloadChecklist] = useState(false);
  const { loading, cardCheckLists } = useSelector(
    (state) => state.activeCard.card
  );

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      handleAddNewCheckList();
    } else if (e.key === "Escape") {
      setOpenCheckListInput(false);
    }
  }

  async function handleAddNewCheckList() {
    if (checklistTitle.trim().length == 0) return;
    await dispatch(addNewCheckList({ id, title: checklistTitle }));

    if (addNewCheckList.fulfilled) {
      setChecklistTitle("");
      toaster.success({
        title: "Your checklist has been created successfully!",
        description: "Looks great",
      });
      setOpenCheckListInput(false);
      dispatch(silentFetchCardCheckLists({ id }));
    } else {
      toaster.error({
        title: "Failed to create checklist!",
        description: "Something wrong with the creation",
      });
    }
  }

  function deleteItemOnCheckList(idCheckItem) {
    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${id}/checkItem/${idCheckItem}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = deleteData(url).then(() => {
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your item on checklist has been deleted successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to delete item on checklist!",
        description: "Something wrong with the creation",
      },
      loading: {
        title: "Deleting item form checklist...",
        description: "Please wait",
      },
    });
  }

  function deleteChecklist(id) {
    const url = `${import.meta.env.VITE_CHECKLISTS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = deleteData(url).then(() => {
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your checklist has been deleted successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to delete checklist!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Deleting checklist...", description: "Please wait" },
    });
  }

  useEffect(() => {
    dispatch(fetchCardCheckLists({ id }));
  }, [id]);

  return (
    <Box>
      <Button
        colorPalette={"gray"}
        variant="surface"
        onClick={() => setOpenCheckListInput((prev) => !prev)}
      >
        <IoMdCheckboxOutline size={20} />
        Checklist
      </Button>
      {openCheckListInput ? (
        <Card.Root position={"absolute"} zIndex={10} maxW="sm">
          <Card.Header>
            <Card.Title>
              <Center>Add checklist</Center>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field label="Title">
                <Input
                  autoFocus
                  placeholder="Checklist Title..."
                  value={checklistTitle}
                  onKeyDown={keyEventHandler}
                  onChange={(e) => setChecklistTitle(e.target.value)}
                />
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-start">
            <Button colorPalette="cyan" onClick={handleAddNewCheckList}>
              Add
            </Button>
          </Card.Footer>
        </Card.Root>
      ) : null}

      {loading ? (
        <Flex flexDirection={"column"} gap={10} pt={10}>
          {[1, 2].map((_, index) => (
            <Stack flex="1" key={index}>
              <Skeleton height="5" />
              <Skeleton height="5" width="80%" />
            </Stack>
          ))}
        </Flex>
      ) : (
        <Flex flexDirection={"column"} gap={10}>
          {cardCheckLists.length > 0 ? (
            cardCheckLists.map((checklist, index) => (
              <TodoList
                checklist={checklist}
                key={index}
                setReloadChecklist={setReloadChecklist}
                deleteItemOnCheckList={deleteItemOnCheckList}
                deleteChecklist={deleteChecklist}
              />
            ))
          ) : (
            <Center pt={10} display={"flex"} alignItems={"center"} gap={2}>
              <MdPlaylistRemove size={25} /> No checklists found
            </Center>
          )}
        </Flex>
      )}
    </Box>
  );
}
