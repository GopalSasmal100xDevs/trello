import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, HStack, Skeleton } from "@chakra-ui/react";

import {
  getData,
  postData,
  putData,
  removeBoardFromRecentViewedBoards,
} from "../utils";
import { toaster } from "../components/ui/toaster";
import Navbar from "../components/board-details/Navbar";
import ListCard from "../components/board-details/ListCard";
import CreateListCard from "../components/board-details/CreateListCard";

export default function BoardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listsLoading, setListLoading] = useState(true);
  const [boardLists, setBoardLists] = useState([]);
  const [board, setBoard] = useState({});
  const [activeAddCard, setActiveAddCard] = useState(false);
  const [listName, setListName] = useState("");
  const [reloadDetailsPage, setReloadDetailsPage] = useState(false);

  function createListOnBoard() {
    if (listName.trim().length == 0) return;

    const url = `${
      import.meta.env.VITE_BOARD_BASE_URL
    }/${id}/lists?name=${listName}&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = postData(url).then(() => {
      setListName("");
      setReloadDetailsPage((prev) => !prev);
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
      loading: {
        title: "Creating list on board...",
        description: "Please wait",
      },
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
        removeBoardFromRecentViewedBoards(id);
        navigate("/error");
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
    [id, reloadDetailsPage]
  );

  function archiveList(id) {
    const url = `${
      import.meta.env.VITE_LIST_DETAILS_BASE_URL
    }/${id}/closed?value=true&key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = putData(url).then(() => {
      setReloadDetailsPage((prev) => !prev);
      setActiveAddCard(true);
    });

    toaster.promise(promise, {
      success: {
        title: "Your list has been archived successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to archive list!",
        description: "Something wrong with the archive",
      },
      loading: { title: "Archiving list...", description: "Please wait" },
    });
  }

  useEffect(() => {
    fetchBoardDetails(id);
  }, [id, fetchBoardDetails]);

  useEffect(() => {
    fetchBoardLists(id);
  }, [id, fetchBoardLists, reloadDetailsPage]);

  return (
    <Box position={"absolute"} width={"full"}>
      <Navbar
        board={board}
        loading={loading}
        setReloadDetailsPage={setReloadDetailsPage}
      />
      {listsLoading ? (
        <Box display={"flex"} flexDirection={"row"} gap={10} mt={8} ml={20}>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton height="200px" width="300px" key={index} />
          ))}
        </Box>
      ) : (
        <Grid
          h={"calc(100vh - 150px)"}
          alignItems={"flex-start"}
          overflow={"auto"}
          pl={20}
          pt={10}
          pr={10}
        >
          <HStack alignItems={"flex-start"} gap={4}>
            {boardLists.map((list, index) => (
              <ListCard key={index} list={list} archiveList={archiveList} />
            ))}

            <CreateListCard
              listName={listName}
              setListName={setListName}
              setActiveAddCard={setActiveAddCard}
              activeAddCard={activeAddCard}
              createListOnBoard={createListOnBoard}
            />
          </HStack>
        </Grid>
      )}
    </Box>
  );
}
