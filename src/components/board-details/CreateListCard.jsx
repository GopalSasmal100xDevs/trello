import { Button, Card, Flex, Input, Stack } from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";

export default function CreateListCard({
  listName,
  activeAddCard,
  setListName,
  setActiveAddCard,
  createListOnBoard,
}) {
  return (
    <Card.Root maxW="sm">
      <Card.Body>
        {activeAddCard ? (
          <Stack gap="4" w="full">
            <Input
              placeholder="Enter a title"
              autoFocus
              value={listName}
              onChange={(e) => setListName(e.target.value)}
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
        ) : (
          <Button
            variant="surface"
            colorPalette={"white"}
            onClick={() => setActiveAddCard(true)}
          >
            + Add another list
          </Button>
        )}
      </Card.Body>
    </Card.Root>
  );
}
