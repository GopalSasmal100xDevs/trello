import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";

import HomeControls from "../components/home/HeroControls";
import HomeBoards from "../components/home/HomeBoards";
import RecentViewedBoards from "../components/home/RecentViewedBoards";
import { fetchAllBoards } from "../redux/actions/boardsAction";
import { loadRecentlyViewedBoards } from "../redux/reducers/recentViewedBoardsReducer";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBoards());
    dispatch(loadRecentlyViewedBoards());
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"8/12"}
      margin={"0 auto"}
    >
      {/* Dyanmic title */}
      <HelmetProvider>
        <Helmet>
          <title>Boards | Trello</title>
        </Helmet>
      </HelmetProvider>

      <Heading size="4xl" my={8}>
        Boards
      </Heading>

      <RecentViewedBoards />
      <HomeControls />
      <HomeBoards />
    </Box>
  );
}
