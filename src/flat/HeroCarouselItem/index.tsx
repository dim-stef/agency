import { Box, Flex, Text } from "@chakra-ui/layout";
import { HeroCarouselItemProps } from "./interface";

function HeroCarouselItem({ isPrimary, project }: HeroCarouselItemProps) {
  return (
    <Box w={"100%"} h={"100%"}>
      <img
        src={project.frontImage.src}
        style={{ height: "100%", objectFit: isPrimary ? 'contain' : 'cover', userSelect: 'none'}}
      />
    </Box>
  );
}

export default HeroCarouselItem;
