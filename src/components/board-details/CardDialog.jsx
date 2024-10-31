import { Card, Flex } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BsCardChecklist } from "react-icons/bs";
import CheckList from "./Checklist";

export default function CardDialog({ card }) {
  const { name } = card;
  return (
    <DialogRoot lazyMount preventScroll size={"lg"}>
      <DialogTrigger asChild>
        <Card.Root variant={"subtle"} size={"sm"} cursor={"pointer"}>
          <Card.Body>{name}</Card.Body>
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
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
