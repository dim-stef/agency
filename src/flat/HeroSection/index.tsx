import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, Heading, Box, Flex } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../store";
import { ProjectInterface } from "../HeroCarouselItem/interface";
import HeroCarousel from "../HeroCarousel";
import styles from './HeroSection.module.css';

const loopWords = ["web", "native", "saas", "e-commerce"];

interface HeroSectionProps{
  projects: ProjectInterface[]
}

function HeroSection({ projects }: HeroSectionProps) {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [word, setWord] = useState(loopWords[0]);

  useEffect(() => {
    let wordInterval = setInterval(() => {
      let wordIndex = loopWords.indexOf(word);
      setWord(loopWords[(wordIndex + 1) % 4]);
    }, 2000);

    return () => {
      clearInterval(wordInterval);
    };
  }, [word]);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        height="100%"
        width="50%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex flexFlow="column">
          <Heading
            className={styles.heroSectionLoopText}
            as="h1"
            display="flex"
            flexFlow="column"
            color={theme?.darkMode ? "white" : "black"}
          >
            <Text
              className={styles.heroSectionLoopText}
              display="inline-block"
              pt={2}
              pb={2}
              backgroundColor={theme?.darkMode ? "white" : "black"}
              color={theme?.darkMode ? "black" : "white"}
            >
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={word}
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {word}
                </motion.div>
              </AnimatePresence>
            </Text>{" "}
            development
          </Heading>
          <Heading mt={10} maxW="300px" fontSize="xl">
            for startups by startuppers
          </Heading>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
        flexFlow="column"
      >
        <Heading position="absolute" top="10px">
          our work
        </Heading>
        <HeroCarousel projects={projects}/>
      </Flex>
    </Flex>
  );
}

export default HeroSection;
