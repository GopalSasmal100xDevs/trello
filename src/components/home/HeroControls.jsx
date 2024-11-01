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
import { InputGroup } from "../ui/input-group";
import { IoSearchSharp } from "react-icons/io5";

export default function HeroControls({
  sortBy,
  setSortCriteria,
  setSearchString,
}) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} mt={8}>
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
          <SelectContent position={"absolute"} top={16} width="300px">
            {sortBy.items.map(({ value, label }) => (
              <SelectItem
                item={value}
                key={value}
                cursor={"pointer"}
                onClick={() => setSortCriteria(value)}
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>

      <Box width={300} display={"inline"} mr={"-8px"}>
        <Field label="Search">
          <InputGroup flex="1" startElement={<IoSearchSharp />}>
            <Input
              placeholder="Search Boards"
              onChange={(e) => setSearchString(e.target.value)}
            />
          </InputGroup>
        </Field>
      </Box>
    </Flex>
  );
}
