import { Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import TrelloLogo from "../assets/trello-logo-blue.png";
import { ColorModeButton } from "./ui/color-mode";

export default function Navbar() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w="100%"
      h="90px"
      bgGradient="linear(to-b, orange.100, purple.300)"
      px={20}
    >
      <Button as={Link} to={"/"}>
        Boards
      </Button>
      <Flex justifyContent={"center"} alignItems={"center"} as={Link} to="/">
        <Image src={TrelloLogo} height={"40px"} fit="cover" alt="TrelloLogo" />
      </Flex>
      <ColorModeButton />
    </Flex>
  );
}
