import { Box, Flex } from "@radix-ui/themes";

export default function WindowButtons() {
  return (
    <Box>
      <Flex gap="1">
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#ff5f57",
            borderRadius: "50%",
          }}
          className="cursor-pointer"
        />
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#fdbb2e",
            borderRadius: "50%",
          }}
          className="cursor-pointer"
        />
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#27c840",
            borderRadius: "50%",
          }}
          className="cursor-pointer"
        />
      </Flex>
    </Box>
  );
}
