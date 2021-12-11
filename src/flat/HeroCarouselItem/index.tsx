import { Box, Flex, Text } from "@chakra-ui/layout";
import { HeroCarouselItemProps } from "./interface";

function HeroCarouselItem({ isPrimary, project }: HeroCarouselItemProps) {
  return (
    <Box w={"100%"} h={"100%"}>
      <img
        src={project.images[0]}
        style={{ height: "100%", objectFit: isPrimary ? 'contain' : 'cover', userSelect: 'none'}}
      />
    </Box>
  );
}

export default HeroCarouselItem;
