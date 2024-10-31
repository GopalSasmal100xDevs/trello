import { Card, Flex, Input, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { getData, postData } from "../../utils";
import CardComponent from "./Card";
import { toaster } from "../ui/toaster";
import { Button } from "../ui/button";

export default function ListCard({ list }) {
  const { id, name, color } = list;
  const [activeAddCard, setActiveAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cards, setCards] = useState([]);

  const fetchCardLists = useCallback(
    async (listId) => {
      console.count("fetchCardLists function call");
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
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {/* Cards Mapping */}
        <Flex flexDirection={"column"} gap={5}>
          {cards.map((card, index) => (
            <CardComponent card={card} key={index} />
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
