import {
  Box,
  Flex,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Field } from "../ui/field";

export default function HeroControls({
  sortBy,
  sortCriteria,
  setSortCriteria,
}) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Box>
        <SelectRoot
          collection={sortBy}
          size="sm"
          width="300px"
          position={"relative"}
        >
          <SelectLabel>Sort By</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder={sortBy.items[0].label} />
          </SelectTrigger>
          <SelectContent position={"absolute"} top={16}>
            {sortBy.items.map(({ value, label }) => (
              <SelectItem item={value} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>

      <Box width={300} display={"inline"}>
        <Field label="Search">
          {/* <InputLeftElement pointerEvents="none">
            <BiSearch color="gray.300" />
          </InputLeftElement> */}
          <Input placeholder="Search Boards" />
        </Field>
      </Box>
    </Flex>
  );
}
