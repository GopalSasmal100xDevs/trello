import { Button, Card, Flex, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { createNewList, featchAllLists } from "../../redux/actions/listAction";

export default function CreateListCard() {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [activeAddCard, setActiveAddCard] = useState(false);
  const { id } = useSelector(
    (state) => state.boardDetails.board.boardInfo.details
  );

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      handleCreateList();
    } else if (e.key === "Escape") {
      setActiveAddCard(false);
    }
  }

  async function handleCreateList() {
    if (listName.trim().length == 0) return;
    await dispatch(createNewList({ id, name: listName.trim() })).unwrap();
    dispatch(featchAllLists({ id }));
    setListName("");
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
              onClick={handleCreateList}
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
