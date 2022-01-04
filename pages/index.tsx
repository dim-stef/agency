import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Prismic from "@prismicio/client";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import NavigationBar from "../src/flat/NavigationBar";
import HeroSection from "../src/flat/HeroSection";
import Project from "../src/flat/Project";
import { ProjectInterface } from "../src/flat/HeroCarouselItem/interface";
import ProjectShowcase from "../src/flat/ProjectShowcase";
import { RootState } from "../src/store";
import Client from "../utils/prismicHelpers";
import { extractProjectDataFromPrisma } from "../utils/prismicHelpers";
import { changeTheme } from "../src/features/theme/themeSlice";
import styles from "../styles/Home.module.css";

interface HomeProps {
  projects: ProjectInterface[];
  fullData: any;
}

const Home = ({ projects, fullData }: HomeProps) => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme } = useSelector((state: RootState) => state.theme);

  console.log("projects", projects, fullData);

  useEffect(() => {
    dispatch(changeTheme(projects.find((project) => project.isPrimary) || projects[0]));
  }, []);

  useEffect(() => {
    if (theme?.darkMode) {
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
      <NavigationBar />
      <HeroSection projects={projects} />
      <Project />
      <ProjectShowcase />
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

export async function getStaticProps() {
  const docs = await Client().query(
    Prismic.Predicates.at("document.type", "project")
  );
  console.log("docs", docs);

  return {
    props: {
      projects: extractProjectDataFromPrisma(docs),
      fullData: docs,
    },
  };
}

export default Home;
