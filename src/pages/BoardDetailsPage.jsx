import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../utils";
import { toaster } from "../components/ui/toaster";
import { Box, Skeleton } from "@chakra-ui/react";
import Navbar from "../components/board-details/Navbar";
import ListCard from "../components/board-details/ListCard";
import CreateListCard from "../components/board-details/CreateListCard";

export default function BoardDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [listsLoading, setListLoading] = useState(true);
  const [boardLists, setBoardLists] = useState([]);
  const [board, setBoard] = useState({});
  const [activeAddCard, setActiveAddCard] = useState(false);
  const [listName, setListName] = useState("");

  function createListOnBoard() {
    if (listName.trim().length == 0) return;

    const url = `${
      import.meta.env.VITE_BOARD_BASE_URL
    }/${id}/lists?name=${listName}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = postData(url).then(() => {
      setListName("");
      setActiveAddCard(false);
    });

    toaster.promise(promise, {
      success: {
        title: "Your list has been created!",
        description: "Looks great",
      },
      error: {
        title: "Failed to create list!",
        description: "Something wrong with the creation",
      },
      loading: { title: "Creating...", description: "Please wait" },
    });
  }

  const fetchBoardDetails = useCallback(
    async (id) => {
      const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
        import.meta.env.VITE_TRELLO_API_KEY
      }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

      try {
        const response = await getData(url);
        setBoard(response.data);
      } catch (_err) {
        toaster.create({
          description: "Failed to load board details!",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const fetchBoardLists = useCallback(
    async (id) => {
      const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}/lists?key=${
        import.meta.env.VITE_TRELLO_API_KEY
      }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

      try {
        const response = await getData(url);
        setBoardLists(response.data);
      } catch (_err) {
        toaster.create({
          description: "Failed to load board lists!",
          type: "error",
        });
      } finally {
        setListLoading(false);
      }
    },
    [id, activeAddCard]
  );

  useEffect(() => {
    fetchBoardDetails(id);
    fetchBoardLists(id);
  }, [id, fetchBoardDetails, fetchBoardLists]);

  return (
    <Box position={"absolute"} width={"auto"} overflow={"auto"}>
      <Navbar board={board} loading={loading} />
      {listsLoading ? (
        <Box display={"flex"} flexDirection={"row"} gap={10} mt={8} ml={20}>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton height="200px" width="300px" key={index} />
          ))}
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"row"}
          height={"full"}
          width={"100%"}
          gap={4}
          pt={8}
          pl={20}
          position={"relative"}
          mt={"12px"}
          flexGrow={1}
        >
          {boardLists.map((list, index) => (
            <ListCard key={index} list={list} />
          ))}

          <CreateListCard
            listName={listName}
            setListName={setListName}
            setActiveAddCard={setActiveAddCard}
            activeAddCard={activeAddCard}
            createListOnBoard={createListOnBoard}
          />
        </Box>
      )}
    </Box>
  );
}
