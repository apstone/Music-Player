"use client";
import { Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type Props = {};

export default function SearchBar(props: Props) {
  return (
    <Box className="px-4 rounded-3xl w-full max-w-md bg-zinc-700">
      <TextField.Root>
        <TextField.Slot className="text-zinc-500 bg-zinc-700">
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          autoFocus
          placeholder="Search"
          className="bg-zinc-700 placeholder:text-zinc-500 text-neutral-200"
        />
      </TextField.Root>
    </Box>
  );
}
