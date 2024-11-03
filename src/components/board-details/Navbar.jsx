import { useState } from "react";
import { Box, Editable, Skeleton } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import {
  deleteData,
  putData,
  removeBoardFromRecentViewedBoards,
} from "../../utils";
import { toaster } from "../ui/toaster";
import BoardDrawer from "./BoardDrawer";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  board: { id, name },
  loading,
  setReloadDetailsPage,
}) {
  const navigate = useNavigate();

  const [updatedName, setUpdatedName] = useState(name);

  function updateName() {
    if (updatedName.length === 0) return;
    if (updatedName.trim() === name) return;

    const url = `${import.meta.env.VITE_BOARD_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}&name=${updatedName.trim()}`;

    const promise = putData(url).then(() => {
      setUpdatedName("");
      setReloadDetailsPage((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your board name has been updated successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to update board name!",
        description: "Something wrong with the updatation",
      },
      loading: { title: "Updating board name...", description: "Please wait" },
    });
  }

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateName();
    }
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
              <title>{name} | Trello</title>
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

          <BoardDrawer deleteBoard={deleteBoard} />
        </Box>
      )}
    </Box>
  );
}
