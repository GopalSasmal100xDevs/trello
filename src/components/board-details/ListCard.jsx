import {
  Box,
  Card,
  Center,
  Flex,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { deleteData, getData, postData } from "../../utils";
import CardComponent from "./Card";
import { toaster } from "../ui/toaster";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";
import { MdArchive } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import { CgPlayListAdd } from "react-icons/cg";

export default function ListCard({ list }) {
  const { id } = list;
  const [activeAddCard, setActiveAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cards, setCards] = useState([]);

  const fetchCardLists = useCallback(
    async (listId) => {
      const url = `${
        import.meta.env.VITE_LIST_DETAILS_BASE_URL
      }/${listId}/cards?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${
        import.meta.env.VITE_TRELLO_TOKEN
      }`;

      try {
        const response = await getData(url);
        setCards(response.data);
      } catch (_err) {}
    },
    [id, activeAddCard]
  );

  async function addCardInList() {
    if (cardTitle.trim().length == 0) return;

    const url = `${
      import.meta.env.VITE_CARD_DETAILS_BASE_URL
    }?idList=${id}&name=${cardTitle}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    try {
      const promise = postData(url).then(() => {
        setActiveAddCard(false);
        setCardTitle("");
      });
      toaster.promise(promise, {
        success: {
          title: "Your card has been added successfully!",
          description: "Looks great",
        },
        error: {
          title: "Failed to add card!",
          description: "Something wrong with the creation",
        },
        loading: { title: "Adding...", description: "Please wait" },
      });
    } catch (_error) {
      toaster.create({
        description: "Failed to add card!",
        type: "error",
      });
    }
  }
  async function deleteCard(id) {
    const url = `${import.meta.env.VITE_CARD_DETAILS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = deleteData(url).then(() => {
      setActiveAddCard((prev) => !prev);
    });
    toaster.promise(promise, {
      success: {
        title: "Your board has been deleted successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to delete board!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      addCardInList();
    } else if (e.key === "Escape") {
      setActiveAddCard(false);
    }
  }

  useEffect(() => {
    fetchCardLists(id);
  }, [id, fetchCardLists, activeAddCard]);

  return (
    <Card.Root width={"285px"} maxW="sm">
      <ListCardHeader list={list} />
      <Card.Body>
        {/* Cards Mapping */}
        <Flex flexDirection={"column"} gap={5}>
          {cards.map((card, index) => (
            <CardComponent card={card} key={index} deleteCard={deleteCard} />
          ))}
        </Flex>

        {/* Button for Create new Card */}
        {activeAddCard ? (
          <Stack gap="4" w="full" mt={4}>
            <Input
              placeholder="Enter a title"
              autoFocus
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              onKeyDown={keyEventHandler}
            />
            <Flex alignItems={"center"} justifyContent={"flex-start"} gap={4}>
              <Button
                variant={"solid"}
                colorPalette={"cyan"}
                onClick={addCardInList}
              >
                Add card
              </Button>
              <GrFormClose
                size={25}
                onClick={() => setActiveAddCard(false)}
                cursor={"pointer"}
              />
            </Flex>
          </Stack>
        ) : (
          <Button variant="ghost" onClick={() => setActiveAddCard(true)} mt={4}>
            + Add a card
          </Button>
        )}
      </Card.Body>
    </Card.Root>
  );
}

export function ListCardHeader({ list }) {
  const { name } = list;
  const [openCardsDialog, setOpenCardsDialog] = useState(false);
  return (
    <Card.Header>
      <Card.Title position={"relative"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          <Text>{name}</Text>
          <BsThreeDots
            size={20}
            cursor={"pointer"}
            onClick={() => setOpenCardsDialog((prev) => !prev)}
          />
        </Box>
        {openCardsDialog ? (
          <Card.Root
            width="320px"
            position={"absolute"}
            zIndex={10}
            left={"12rem"}
          >
            <Card.Body>
              <Center>List actions</Center>
              <Stack gap="2" pt={4}>
                <Text
                  fontSize={"sm"}
                  cursor={"pointer"}
                  borderRadius={"md"}
                  padding={"5px"}
                  _hover={{ backgroundColor: "gray.200" }}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={2}
                >
                  <CgPlayListAdd size={20} />
                  Add a card
                </Text>
                <Separator />
                <Text
                  fontSize={"sm"}
                  cursor={"pointer"}
                  borderRadius={"md"}
                  padding={"5px"}
                  _hover={{ backgroundColor: "gray.200" }}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={2}
                >
                  <MdArchive size={20} />
                  Archive this list
                </Text>
                <Text
                  fontSize={"sm"}
                  cursor={"pointer"}
                  borderRadius={"md"}
                  padding={"5px"}
                  _hover={{ backgroundColor: "gray.200" }}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={2}
                >
                  <IoArchive size={20} />
                  Archive all cards in this list
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>
        ) : null}
      </Card.Title>
    </Card.Header>
  );
}
