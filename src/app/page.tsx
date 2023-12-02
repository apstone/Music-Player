import Image from "next/image";
import { Container, Flex, Heading, Text, Box } from "@radix-ui/themes";
import SearchBar from "./components/search_bar";
import WindowButtons from "./components/window_buttons";
import AccountHeaderNavigation from "./components/account_header_navigation";
import YourFavorites from "./components/your_favorites";
import PlayerControls from "./components/player_controls";
import MadeForYou from "./components/made_for_you";
import YourFriendsPlaylist from "./components/your_friends_playlist";

export default function Home() {
  return (
    <Box
      style={{
        backgroundColor: "#2c2c2c",
      }}
      className="h-screen w-screen p-6"
    >
      <Container size="4">
        <Flex direction="column" width="100%">
          <Flex direction="row" justify="between" align="center">
            <WindowButtons />
            <SearchBar />
            <AccountHeaderNavigation />
          </Flex>
          <Flex className="my-8">
            <YourFavorites />
          </Flex>
          <Flex className="my-8">
            <MadeForYou />
          </Flex>
          <Flex className="my-8">
            <YourFriendsPlaylist />
          </Flex>
        </Flex>
        <Flex justify="center">
          <PlayerControls />
        </Flex>
      </Container>
    </Box>
  );
}
