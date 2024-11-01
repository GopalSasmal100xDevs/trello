import { Box, Card, Editable, Flex, Input, Text } from "@chakra-ui/react";
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
import { useState } from "react";
import { putData } from "../../utils";
import { toaster } from "../ui/toaster";

export default function CardDialog({ card, deleteCard, setReloadListCards }) {
  const { id, name } = card;
  const [cardName, setCardName] = useState(name);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateCardName();
    }
  }

  function updateCardName() {
    if (cardName.length === 0) return;

    const url = `${import.meta.env.VITE_CARD_DETAILS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}&name=${cardName}`;

    const promise = putData(url).then(() => {
      setCardName("");
      setReloadListCards((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your card name has been updated successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to update card name!",
        description: "Something wrong with the updatation",
      },
      loading: { title: "Updating card name...", description: "Please wait" },
    });
  }
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
              <BsCardChecklist size={20} />
              <Editable.Root
                onValueChange={(e) => setCardName(e.value)}
                value={cardName}
                placeholder={name}
                width={"auto"}
                fontSize={"14px"}
                onKeyDown={keyEventHandler}
                border={"none"}
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>
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
