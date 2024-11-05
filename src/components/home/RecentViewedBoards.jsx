import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Board from "./Board";
import { updateRecentlyViewedBoards } from "../../redux/reducers/recentViewedBoardsReducer";

export default function RecentViewedBoards() {
  const { boards } = useSelector((state) => state.recentViewedBoards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBoardClick(id, name) {
    dispatch(updateRecentlyViewedBoards({ id, name }));
    navigate(`/boards/${id}`);
  }

  return boards.length > 0 ? (
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
        {boards.map(({ id, name }) => (
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
