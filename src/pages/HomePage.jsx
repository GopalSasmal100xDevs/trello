import { Box, createListCollection, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import HomeControls from "../components/home/HeroControls";
import HomeBoards from "../components/home/HomeBoards";

export default function HomePage() {
  const [sortCriteria, setSortCriteria] = useState("");

  const sortBy = createListCollection({
    items: [
      { label: "Mostly Recently Active", value: "MOST_RECENTLY_ACTIVE" },
      { label: "Last Recently Active", value: "LAST_RECENTLY_ACTIVE" },
      { label: "Alphabetically A-Z", value: "ALPHABETICALLY_A_Z" },
      { label: "Alphabetically Z-A", value: "ALPHABETICALLY_Z_A" },
    ],
  });

  return (
    <Box ml={12}>
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

      <HomeBoards />
    </Box>
  );
}
