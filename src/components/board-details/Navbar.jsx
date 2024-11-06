import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Editable, Skeleton } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { deleteData, removeBoardFromRecentViewedBoards } from "../../utils";
import { toaster } from "../ui/toaster";
import BoardDrawer from "./BoardDrawer";
import { updateBoardName } from "../../redux/actions/boardDetailsAction";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state) => state.boardDetails.board.boardInfo
  );
  const { id, name } = useSelector(
    (state) => state.boardDetails.board.boardInfo.details
  );
  const [updatedName, setUpdatedName] = useState(name);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateBoardName();
    }
  }

  function handleUpdateBoardName() {
    if (updatedName.length === 0) return;
    if (updatedName.trim() === name) return;

    dispatch(updateBoardName({ id, updatedName }));
  }

  function deleteBoard() {
    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}`;

    const promise = deleteData(url).then(() => {
      removeBoardFromRecentViewedBoards(id);
      navigate("/");
    });

    toaster.promise(promise, {
      success: {
        title: "Your board has been deleted successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to delete board name!",
        description: "Something wrong with the deletion",
      },
      loading: { title: "Deleting board name...", description: "Please wait" },
    });
  }

  return (
    <Box bgColor="#0000003d" px={20}>
      {loading ? (
        <Skeleton flex="1" height="10" variant="pulse" />
      ) : (
        <Box
          display={"flex"}
          position={"relative"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"12px 0px"}
          flexGrow={1}
          flexWrap={"wrap"}
          width={"calc(100% - 23px)"}
          height={"auto"}
          gap={4}
        >
          {/* Dyanmic title */}
          <HelmetProvider>
            <Helmet>
              <title>{name || ""} | Trello</title>
            </Helmet>
          </HelmetProvider>

          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={4}
          >
            <Editable.Root
              defaultValue={name}
              onKeyDown={keyEventHandler}
              onChange={(e) => setUpdatedName(e.target.value)}
              width={"auto"}
              fontWeight={"bold"}
              fontSize={"18px"}
            >
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>

            {/* <BiStar size={20} cursor={"pointer"} /> */}
          </Box>

          <BoardDrawer />
        </Box>
      )}
    </Box>
  );
}
