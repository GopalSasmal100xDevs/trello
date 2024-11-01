import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Board from "./Board";

export default function RecentViewed({
  recentViewedBoards,
  setRecentViewedBoards,
}) {
  const navigate = useNavigate();

  function handleBoardClick(id, name) {
    let recentBoards =
      JSON.parse(localStorage.getItem("recentViewedBoards")) || [];

    recentBoards = recentBoards.filter((board) => id !== board.id);

    recentBoards = [{ id, name }, ...recentBoards];

    if (recentBoards.length > 4) {
      recentBoards = recentBoards.slice(0, 4);
    }
    localStorage.setItem("recentViewedBoards", JSON.stringify(recentBoards));
    setRecentViewedBoards(recentBoards);

    navigate(`/boards/${id}`);
  }

  return recentViewedBoards.length > 0 ? (
    <Grid>
      <Heading
        size="md"
        mt={8}
        mb={4}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <BsClockHistory width={12} />
        <Text textTransform={"uppercase"}>Recently Viewed</Text>
      </Heading>

      <Flex gapX={5} gapY={5} flexWrap={"wrap"} mt={8}>
        {recentViewedBoards.map(({ id, name }) => (
          <Box
            key={id}
            cursor={"pointer"}
            onClick={() => handleBoardClick(id, name)}
          >
            <Board name={name} />
          </Box>
        ))}
      </Flex>
    </Grid>
  ) : null;
}
