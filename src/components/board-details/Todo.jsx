import { Flex, Text } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

export default function Todo({ checkItems }) {
  return (
    <Flex flexDirection={"column"} gap={4} pt={6}>
      {checkItems?.map((item, index) => (
        <TodoItem key={index} item={item} />
      ))}
    </Flex>
  );
}

export function TodoItem({ item }) {
  const { name } = item;

  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      variant={"outline"}
      colorPalette={"cyan"}
      cursor={"pointer"}
      value={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      <Text textDecoration={checked ? "line-through" : "none"} fontSize={"sm"}>
        {name}
      </Text>
    </Checkbox>
  );
}
