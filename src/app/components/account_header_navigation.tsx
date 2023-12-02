"use client";
import { Box, Flex, Avatar, DropdownMenu } from "@radix-ui/themes";

export default function AccountHeaderNavigation() {
  return (
    <Box>
      <Flex gap="2" align="center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              className="cursor-pointer"
              size="2"
              radius="full"
              src="/pfp-headshot.jpg"
              fallback="A"
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="bg-zinc-900/30 shadow-none backdrop-blur-lg border border-neutral-600 p-2 ">
            {/* Dropdown menu items here */}
            <DropdownMenu.Item className="text-neutral-200 cursor-pointer hover:bg-transparent">
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item className="text-neutral-200 cursor-pointer hover:bg-transparent">
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="text-neutral-200 cursor-pointer hover:bg-transparent">
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>
  );
}
