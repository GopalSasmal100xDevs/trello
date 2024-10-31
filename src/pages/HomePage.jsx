import { Box, createListCollection, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import HomeControls from "../components/home/HeroControls";
import HomeBoards from "../components/home/HomeBoards";
import { SORT_BY_OPTIONS } from "../constants";
import { getData, postData } from "../utils";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [sortCriteria, setSortCriteria] = useState("");
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sortBy = createListCollection(SORT_BY_OPTIONS);

  function createBoard(title, color) {
    encodeURIComponent;
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
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  function handleBoardClick(board) {
    // localstorage logic
    navigate(`/boards/${board.id}`);
  }

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
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"8/12"}
      margin={"0 auto"}
    >
      <Heading size="4xl" my={8}>
        Trello Boards
      </Heading>

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

      {/* Recently Viewed Boards */}

      {/* Home Controlls */}

      <HomeControls
        sortBy={sortBy}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />

      <HomeBoards
        createBoard={createBoard}
        boards={boards}
        handleBoardClick={handleBoardClick}
        loading={loading}
      />
    </Box>
  );
}
