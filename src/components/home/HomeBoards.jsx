import { Flex } from "@chakra-ui/react";
import CreateBoardsDialog from "../dialogs/createBoardsDialog";

export default function HomeBoards() {
  return (
    <Flex justifyContent={"space-evenly"} alignItems={"center"} mt={8}>
      {/* Modals for creating new board */}
      <CreateBoardsDialog />

      {/* All Boards */}
    </Flex>
  );
}
