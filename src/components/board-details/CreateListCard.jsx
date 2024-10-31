import { Button, Card, Flex, Input, Stack } from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";

export default function CreateListCard({
  listName,
  activeAddCard,
  setListName,
  setActiveAddCard,
  createListOnBoard,
}) {
  function keyEventHandler(e) {
    if (e.key === "Enter") {
      createListOnBoard();
    } else if (e.key === "Escape") {
      setActiveAddCard(false);
    }
  }

  return activeAddCard ? (
    <Card.Root maxW="sm">
      <Card.Body>
        <Stack gap="4" w="full">
          <Input
            placeholder="Enter a title"
            autoFocus
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onKeyDown={keyEventHandler}
          />
          <Flex alignItems={"center"} justifyContent={"flex-start"} gap={4}>
            <Button
              variant={"solid"}
              colorPalette={"cyan"}
              onClick={createListOnBoard}
            >
              Add list
            </Button>
            <GrFormClose
              size={25}
              onClick={() => setActiveAddCard(false)}
              cursor={"pointer"}
            />
          </Flex>
        </Stack>
      </Card.Body>
    </Card.Root>
  ) : (
    <Button
      width={"285px"}
      variant="surface"
      colorPalette={"white"}
      onClick={() => setActiveAddCard(true)}
    >
      + Add another list
    </Button>
  );
}
