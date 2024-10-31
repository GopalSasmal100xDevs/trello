import { useState } from "react";
import { ProgressBar, ProgressRoot } from "../ui/progress";
import { Text } from "@chakra-ui/react";

export default function TodoProgressBar({ checkItems }) {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Text fontSize={"sm"} fontWeight={"bold"}>
        {progress}%
      </Text>
      <ProgressRoot size="xs" gap={2} value={progress}>
        <ProgressBar />
      </ProgressRoot>
    </>
  );
}
