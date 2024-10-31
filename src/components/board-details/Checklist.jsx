import {
  Box,
  Card,
  Center,
  Flex,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { Button } from "../ui/button";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Field } from "../ui/field";
import { useCallback, useEffect, useState } from "react";
import { deleteData, getData, postData } from "../../utils";
import { toaster } from "../ui/toaster";
import TodoList from "./TodoList";
import { MdPlaylistRemove } from "react-icons/md";

export default function CheckList({ card }) {
  const { id } = card;
  const [openCheckListInput, setOpenCheckListInput] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [reloadChecklist, setReloadChecklist] = useState(false);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      addChecklist();
    } else if (e.key === "Escape") {
      setOpenCheckListInput(false);
    }
  }

  function addChecklist() {
    if (checklistTitle.trim().length == 0) return;

    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }/${id}/checklists?name=${checklistTitle}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = postData(url).then(() => {
      setChecklistTitle("");
      setOpenCheckListInput(false);
    });

    toaster.promise(promise, {
      success: {
        title: "Your checklist has been created successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to create checklist!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  const fetchCheckList = useCallback(
    async (id) => {
      const url = `${
        import.meta.env.VITE_CARD_DETAILS_BASE_URL
      }/${id}/checklists?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
        import.meta.env.VITE_TRELLO_TOKEN
      }`;

      try {
        const response = await getData(url);
        setCards(response.data);
      } catch (err) {
        toaster.create({
          description: "Failed to load Checklist!",
          type: "error",
        });
      } finally {
        setCardsLoading(false);
      }
    },
    [id, reloadChecklist]
  );

  async function deleteItemOnCheckList(idCheckItem) {
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
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  useEffect(() => {
    fetchCheckList(id);
  }, [id, openCheckListInput, reloadChecklist]);

  return (
    <Box>
      <Button
        colorPalette={"gray"}
        variant="surface"
        onClick={() => setOpenCheckListInput((prev) => !prev)}
      >
        <IoMdCheckboxOutline />
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
            <Button colorPalette="cyan" onClick={addChecklist}>
              Add
            </Button>
          </Card.Footer>
        </Card.Root>
      ) : null}

      {cardsLoading ? (
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
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <TodoList
                card={card}
                key={index}
                setReloadChecklist={setReloadChecklist}
                deleteItemOnCheckList={deleteItemOnCheckList}
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
