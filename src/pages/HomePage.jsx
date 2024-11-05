import { useEffect, useState } from "react";
import { Box, createListCollection, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";

import HomeControls from "../components/home/HeroControls";
import HomeBoards from "../components/home/HomeBoards";
import { SORT_BY_OPTIONS } from "../constants";
import { getSearchedBoards, getSortedBoards, postData } from "../utils";
import { toaster } from "../components/ui/toaster";
import RecentViewedBoards from "../components/home/RecentViewedBoards";
import { fetchAllBoards } from "../redux/actions/boardsAction";
import { loadRecentlyViewedBoards } from "../redux/reducers/recentViewedBoardsReducer";

export default function HomePage() {
  const [recentViewedBoards, setRecentViewedBoards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function createBoard(title, color) {
    const url = `${
      import.meta.env.VITE_BOARD_BASE_URL
    }/?name=${encodeURIComponent(title)}&prefs_background=${color}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = postData(url).then((response) => {
      navigate(`/boards/${response.data.id}`);
    });

    toaster.promise(promise, {
      success: {
        title: "Your board has been created successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to create board!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Creating board...", description: "Please wait" },
    });
  }

  function getRecentViewedBoards() {
    const recentBoards =
      JSON.parse(localStorage.getItem("recentViewedBoards")) || [];
    setRecentViewedBoards(recentBoards);
  }

  // const sortedBoards = getSortedBoards([...boards], sortCriteria);
  // const searchedBoards = getSearchedBoards([...sortedBoards], searchString);

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

      {/* Recently Viewed Boards */}
      <RecentViewedBoards />

      {/* Home Controlls */}

      <HomeControls />

      <HomeBoards />
    </Box>
  );
}
