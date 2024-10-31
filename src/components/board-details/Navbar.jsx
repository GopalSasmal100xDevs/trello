import { Box, Skeleton, Text } from "@chakra-ui/react";
import { BiStar } from "react-icons/bi";

export default function Navbar({ board: { name }, loading }) {
  return (
    <Box bgColor="#0000003d">
      {loading ? (
        <Skeleton flex="1" height="10" variant="pulse" />
      ) : (
        <Box
          display={"inline-block"}
          position={"relative"}
          flexDirection={"row"}
          padding={"12px 10px 12px 16px"}
          flexGrow={1}
          flexWrap={"wrap"}
          alignItems={"center"}
          width={"calc(100% - 23px)"}
          height={"auto"}
          gap={4}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={4}
          >
            <Text fontSize="18px" fontWeight={"bold"}>
              {name}
            </Text>

            <BiStar size={20} cursor={"pointer"} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
