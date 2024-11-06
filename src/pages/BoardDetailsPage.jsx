import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, HStack, Skeleton } from "@chakra-ui/react";

import { putData } from "../utils";
import { toaster } from "../components/ui/toaster";
import Navbar from "../components/board-details/Navbar";
import ListCard from "../components/board-details/ListCard";
import CreateListCard from "../components/board-details/CreateListCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardDetails } from "../redux/actions/boardDetailsAction";
import { featchAllLists } from "../redux/actions/listAction";

export default function BoardDetailsPage() {
  const { id } = useParams();
  const [reloadDetailsPage, setReloadDetailsPage] = useState(false);
  const dispatch = useDispatch();
  const { loading, lists } = useSelector(
    (state) => state.boardDetails.board.boardLists
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
    dispatch(fetchBoardDetails({ id }));
    dispatch(featchAllLists({ id }));
  }, [id]);

  return (
    <Box position={"absolute"} width={"full"}>
      <Navbar setReloadDetailsPage={setReloadDetailsPage} />
      {loading ? (
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
            {lists.map((list, index) => (
              <ListCard key={index} list={list} archiveList={archiveList} />
            ))}

            <CreateListCard />
          </HStack>
        </Grid>
      )}
    </Box>
  );
}
