import { Box, createListCollection, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HomeControls from "../components/home/HeroControls";
import HomeBoards from "../components/home/HomeBoards";
import { SORT_BY_OPTIONS } from "../constants";
import {
  getData,
  getSearchedBoards,
  getSortedBoards,
  postData,
} from "../utils";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import RecentViewed from "../components/home/RecentViewed";

export default function HomePage() {
  const [sortCriteria, setSortCriteria] = useState("");
  const [recentViewedBoards, setRecentViewedBoards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  const sortBy = createListCollection(SORT_BY_OPTIONS);

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

  function handleBoardClick(board) {
    let recentBoards =
      JSON.parse(localStorage.getItem("recentViewedBoards")) || [];

    recentBoards = recentBoards.filter(({ id }) => id !== board.id);

    recentBoards = [{ id: board.id, name: board.name }, ...recentBoards];

    if (recentBoards.length > 4) {
      recentBoards = recentBoards.slice(0, 4);
    }
    localStorage.setItem("recentViewedBoards", JSON.stringify(recentBoards));
    setRecentViewedBoards(recentBoards);

    navigate(`/boards/${board.id}`);
  }

  function getRecentViewedBoards() {
    const recentBoards =
      JSON.parse(localStorage.getItem("recentViewedBoards")) || [];
    setRecentViewedBoards(recentBoards);
  }

  const sortedBoards = getSortedBoards([...boards], sortCriteria);
  const searchedBoards = getSearchedBoards([...sortedBoards], searchString);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_ALL_BOARDS_BASE_URL}/?key=${
        import.meta.env.VITE_TRELLO_API_KEY
      }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

      try {
        const response = await getData(url);
        setBoards(response.data);
      } catch (_error) {
        toaster.create({
          description: "Failed to load boards!",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    getRecentViewedBoards();
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
      <RecentViewed
        recentViewedBoards={recentViewedBoards}
        setRecentViewedBoards={setRecentViewedBoards}
      />

      {/* Home Controlls */}

      <HomeControls
        sortBy={sortBy}
        setSortCriteria={setSortCriteria}
        setSearchString={setSearchString}
      />

      <HomeBoards
        createBoard={createBoard}
        boards={searchedBoards}
        handleBoardClick={handleBoardClick}
        loading={loading}
      />
    </Box>
  );
}
