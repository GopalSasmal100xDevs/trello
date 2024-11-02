import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

export default function ErrorPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
      padding={4}
    >
      <VStack spacing={6} textAlign="center" gap={10}>
        <Image
          src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
          alt="404 Image"
          boxSize="400px"
          borderRadius="md"
        />
        <Heading fontSize="6xl">404</Heading>
        <Text fontSize="lg" color="gray.600">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Link to="/">
          <Button colorScheme="blue" size="lg">
            Go to Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}
