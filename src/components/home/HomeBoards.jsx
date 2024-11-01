import { Box, Flex, Skeleton } from "@chakra-ui/react";
import CreateBoardsDialog from "../dialogs/createBoardsDialog";
import Board from "./Board";

export default function HomeBoards({
  boards,
  createBoard,
  handleBoardClick,
  loading,
}) {
  return loading ? (
    <Flex gapX={6} gapY={6} flexWrap={"wrap"} alignItems={"center"} mt={8}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <Skeleton key={index} width="300px" height="100px" />
      ))}
    </Flex>
  ) : (
    <Flex gapX={5} gapY={5} flexWrap={"wrap"} mt={8}>
      {/* Modals for creating new board */}
      <CreateBoardsDialog cursor={"pointer"} createBoard={createBoard} />

      {/* All Boards */}
      {boards.map((board) => (
        <Box
          key={board.id}
          cursor={"pointer"}
          onClick={() => handleBoardClick(board)}
        >
          <Board board={board} />
        </Box>
      ))}
    </Flex>
  );
}
