import { Box, Flex, Heading, Text, Grid } from "@radix-ui/themes";
import Image from "next/image";

export default function YourFavorites() {
  const favorites = [
    {
      title: "Blond",
      artist: "Frank Ocean",
      image: "/albums/blond.jpg",
    },
    {
      title: "Konoyo",
      artist: "Tim Hecker",
      image: "/albums/konoyo.jpg",
    },
    {
      title: "Los Angeles",
      artist: "Flying Lotus",
      image: "/albums/los-angeles.jpg",
    },
    {
      title: "The Fragile",
      artist: "Nine Inch Nails",
      image: "/albums/the-fragile.jpg",
    },
    {
      title: "Sketches of Spain",
      artist: "Miles Davis",
      image: "/albums/sketches-of-spain.jpg",
    },
  ];
  return (
    <Box className="w-full">
      <Flex direction="column">
        <Flex justify="between" className="w-full mb-4">
          <Heading className="text-neutral-100">Your favorites</Heading>
          <Text className="text-red-500 cursor-pointer">Show all</Text>
        </Flex>
        <Grid gap="4" width="100%" columns="5">
          {favorites.map((favorite, index) => {
            return (
              <Box
                key={index}
                position="relative"
                width="100%"
                className="cursor-pointer"
              >
                <Flex direction="column">
                  <Image
                    src={favorite.image}
                    alt={favorite.title}
                    width="300"
                    height="300"
                    className="rounded-lg"
                  />
                  <Flex direction="column" className="mt-2">
                    <Text className="text-neutral-100">{favorite.title}</Text>
                    <Text size="2" weight="light" className="text-neutral-400">
                      {favorite.artist}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
}
