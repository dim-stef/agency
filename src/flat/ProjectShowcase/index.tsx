import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { ProjectInterface } from "../HeroCarouselItem/interface";
import { RootState } from "../../store";
import styles from './ProjectShowcase.module.css';

function ProjectShowcase() {
  const {theme} = useSelector((state: RootState)=>state.theme);
  return (
    <Flex flexFlow="column" alignItems="center" mt={10}>
      <Heading>showcase</Heading>
      <Flex flexFlow="row wrap" justifyContent="space-evenly" w="100%" mt={10}>
        {theme?.showcase.map((item) => {
          return (
            <Flex
              flexFlow="column"
              m={10}
              className={styles.projectShowcaseItem}
            >
              <img src={item.src} />
              <Text m={5}>{item.description}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ProjectShowcase;
