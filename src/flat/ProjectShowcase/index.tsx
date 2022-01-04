import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { ProjectInterface } from "../HeroCarouselItem/interface";
import { RootState } from "../../store";
import styles from "./ProjectShowcase.module.css";

function ProjectShowcase() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Flex flexFlow="column" alignItems="center" mt={10}>
      <Heading>showcase</Heading>
      <Flex
        flexFlow="row wrap"
        justifyContent="space-evenly"
        w="100%"
        mt={10}
        className={styles.projectShowcase}
      >
        {theme?.showcase.map((item) => {
          return (
            <Flex
              flexFlow="column"
              p={5}
              m={5}
              className={styles.projectShowcaseItem}
            >
              <img
                src={item.src}
                className={styles.projectShowcaseItemImage}
                style={{
                  height: theme?.showcaseVertical ? 500 : 300,
                }}
              />
              <Text m={5}>{item.title}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ProjectShowcase;
