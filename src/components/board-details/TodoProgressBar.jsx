import { useEffect, useState } from "react";
import { ProgressBar, ProgressRoot } from "../ui/progress";
import { Text } from "@chakra-ui/react";

export default function TodoProgressBar({ checkItems }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = checkItems.length;
    const complete = checkItems.filter(
      (item) => item.state === "complete"
    ).length;
    setProgress(Math.round((complete / total) * 100));
  }, [checkItems]);

  return (
    <>
      <Text fontSize={"sm"} fontWeight={"bold"}>
        {progress}%
      </Text>
      <ProgressRoot
        size="xs"
        gap={2}
        value={progress}
        colorPalette={progress == 100 ? "green" : "gray"}
      >
        <ProgressBar />
      </ProgressRoot>
    </>
  );
}
