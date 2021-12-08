import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import HeroSection from "../src/flat/HeroSection";
import PortfolioBox from "../src/flat/PortfolioBox";
import ProjectDescription from "../src/flat/ProjectDescription";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Box width="100%">
      <HeroSection/>
      <Flex height="2000px" flexDirection="row">
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
      <Box width="100%" height="500px" backgroundColor="green"></Box>
    </Box>
  );
};

export default Home;
