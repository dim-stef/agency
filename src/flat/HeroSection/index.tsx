import { useEffect, useState } from "react";
import { Text, Heading, Box, Flex } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import HeroCarousel from "../HeroCarousel";

const loopWords = ["web", "native"];

function HeroSection() {
  const [word, setWord] = useState(loopWords[0]);

  useEffect(() => {
    let wordInterval = setInterval(() => {
      let wordIndex = loopWords.indexOf(word);
      setWord(loopWords[(wordIndex + 1) % 2]);
    }, 2000);

    return () => {
      clearInterval(wordInterval);
    };
  }, [word]);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex height="100%" width="50%" justifyContent="center" alignItems="center">
        <Heading as="h1" display="flex" flexFlow="column">
          <Text
            display="inline-block"
            pt={2}
            pb={2}
            backgroundColor="black"
            color="white"
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
      </Flex>
      <HeroCarousel />
    </Flex>
  );
}

export default HeroSection;
