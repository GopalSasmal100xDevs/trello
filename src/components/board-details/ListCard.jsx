import { Button, Card, Flex, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";

export default function ListCard({ list }) {
  const { id, name, color } = list;
  const [activeAddCard, setActiveAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {activeAddCard ? (
          <Stack gap="4" w="full">
            <Input
              placeholder="Enter a title"
              autoFocus
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <Flex alignItems={"center"} justifyContent={"flex-start"} gap={4}>
              <Button
                variant={"solid"}
                colorPalette={"cyan"}
                onClick={() => {}}
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
          <Button variant="outline" onClick={() => setActiveAddCard(true)}>
            + Add a card
          </Button>
        )}
      </Card.Body>
    </Card.Root>
  );
}
