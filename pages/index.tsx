import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import HeroSection from "../src/flat/HeroSection";
import Project from "../src/flat/Project";
import PortfolioBox from "../src/flat/PortfolioBox";
import ProjectDescription from "../src/flat/ProjectDescription";
import { RootState } from "../src/store";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (theme.darkMode) {
      if (colorMode == "light") {
        toggleColorMode();
      }
    } else {
      if (colorMode == "dark") {
        toggleColorMode();
      }
    }
  }, [theme]);

  return (
    <Box width="100%">
      <HeroSection />
      <Project />
      {/* <Flex height="2000px" flexDirection="row">
        <PortfolioBox />
        <Flex width="40%" flexDirection="column" justifyContent="center">
          <Flex className={styles.projectDescriptionContainer}>
            <ProjectDescription/>
          </Flex>
          <Flex className={styles.projectDescriptionContainer}>
            <ProjectDescription/>
          </Flex>
          <Flex className={styles.projectDescriptionContainer}>
            <ProjectDescription/>
          </Flex>
        </Flex>
      </Flex>
      <Box width="100%" height="500px" backgroundColor="green"></Box> */}
    </Box>
  );
};

export default Home;
