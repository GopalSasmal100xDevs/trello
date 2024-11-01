import { Card, HStack, Stack, Text } from "@chakra-ui/react";

export default function Board({ name }) {
  return (
    <Card.Root width="300px">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
