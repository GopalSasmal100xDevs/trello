import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
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
import { useRef, useState } from "react";
import { BOARD_COLORS } from "../../constants";

export default function CreateBoardsDialog() {
  const ref = useRef(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectBoardColor, setSelectBoardColor] = useState(BOARD_COLORS[0]);
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"center"}>
      <DialogTrigger asChild>
        <Box
          border={"2px dashed"}
          width={300}
          height={100}
          bgGradient={"red"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
        >
          <Text> + Create Your Board</Text>
        </Box>
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
              label="First Name"
              invalid={boardTitle === ""}
              errorText="Title is required for board!"
            >
              <Input
                ref={ref}
                placeholder="Board Title"
                required={true}
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value.trim())}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={() => {}}> + Create Board</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
