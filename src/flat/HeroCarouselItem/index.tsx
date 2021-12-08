import { Box, Flex, Text } from "@chakra-ui/layout";
import { HeroCarouselItemProps } from "./interface";
import styles from "./HeroCarouselItem.module.css";

function HeroCarouselItem({ isPrimary, project }: HeroCarouselItemProps) {
  return (
    <Box
      className={styles.heroCarouselItemContainer}
      w={isPrimary ? "500px" : "200px"}
      h={isPrimary ? "500px" : "200px"}
    ><Text>{project.name}</Text></Box>
  );
}

export default HeroCarouselItem;
