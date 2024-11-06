import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Flex, HStack, Input, Stack, Text } from "@chakra-ui/react";

import { Button } from "../ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import { BOARD_COLORS } from "../../constants";
import { createNewBoard } from "../../redux/actions/boardsAction";
import { useNavigate } from "react-router-dom";

export default function CreateBoardsDialog() {
  const ref = useRef(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectBoardColor, setSelectBoardColor] = useState(BOARD_COLORS[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleKeyEvent(e) {
    if (e.key === "Enter") {
      createBoard(boardTitle.trim(), selectBoardColor);
    }
  }

  async function createBoard(title, color) {
    const resultAction = await dispatch(createNewBoard({ title, color }));
    if (createNewBoard.fulfilled.match(resultAction)) {
      const { id } = resultAction.payload.data;
      navigate(`/boards/${id}`);
    }
  }

  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"center"}>
      <DialogTrigger asChild>
        <Card.Root width="300px" cursor={"pointer"} variant={"subtle"}>
          <Card.Body>
            <HStack mb="6" gap="3">
              <Stack gap="0">
                <Text fontWeight="semibold" textStyle="sm">
                  + Create Your Board
                </Text>
              </Stack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader placeItems={"center"}>
          <DialogTitle>Create Board</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Select Board Color">
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                gap={4}
                flexWrap={"wrap"}
              >
                {BOARD_COLORS.map((color, index) => (
                  <Button
                    key={index}
                    width={8}
                    height={8}
                    background={color}
                    onClick={() => setSelectBoardColor(color)}
                    border={color === selectBoardColor ? `3px solid cyan` : ""}
                  />
                ))}
              </Flex>
            </Field>
            <Field
              label="Board Name"
              invalid={boardTitle === ""}
              errorText="Title is required for board!"
            >
              <Input
                ref={ref}
                placeholder="Board Title"
                required={true}
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                onKeyDown={handleKeyEvent}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            onClick={() => createBoard(boardTitle.trim(), selectBoardColor)}
          >
            + Create Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
