import { Box, Card, Flex, Text } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BsCardChecklist } from "react-icons/bs";
import CheckList from "./Checklist";
import { Button } from "../ui/button";
import { IoArchive } from "react-icons/io5";

export default function CardDialog({ card, deleteCard }) {
  const { id, name } = card;

  return (
    <DialogRoot lazyMount preventScroll size={"lg"}>
      <DialogTrigger asChild>
        <Card.Root variant={"subtle"} size={"sm"} cursor={"pointer"}>
          <Card.Body>
            <Text fontSize={"14px"}>{name}</Text>
          </Card.Body>
        </Card.Root>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Flex flexDirection={"row"} alignItems={"center"} gap={4}>
              <BsCardChecklist /> {name}
            </Flex>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <CheckList card={card} />
        </DialogBody>
        <DialogFooter>
          <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
            <Button
              variant="subtle"
              colorPalette="red"
              flex="1"
              onClick={() => deleteCard(id)}
            >
              <IoArchive size={20} />
              Archive card
            </Button>
          </Box>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
