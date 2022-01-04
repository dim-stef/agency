import Link from "next/link";
import { useSelector } from "react-redux";
import { DarkMode } from "@chakra-ui/color-mode";
import { useColorMode } from "@chakra-ui/color-mode";
import { Tag } from "@chakra-ui/tag";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { ProjectInterface } from "../HeroCarouselItem/interface";
import { RootState } from "../../store";

type PressInterface = {
  project: ProjectInterface | null;
};

function Project() {
  const { colorMode } = useColorMode();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Flex flexFlow="column" justifyContent="center" alignItems="center">
      <Heading>introducing {theme?.name.toLowerCase()}</Heading>
      <Flex
        w="100%"
        p={10}
        justifyContent="space-evenly"
        alignItems="flex-start"
        mt={20}
      >
        <img
          src={theme?.frontImage.src}
          style={{
            width: "45%",
            borderRadius: 10,
            border: `3px solid ${colorMode == "dark" ? "#2c2c2c" : "#2c2c2c"}`,
          }}
        />
        <Flex flexFlow="column" w="45%">
          <Text fontSize="sm">{theme?.type}</Text>
          <Text mt={4} fontSize="xl">
            {theme?.description}
          </Text>
          <Press project={theme} />
          <Flex flexFlow="row wrap" mt={10}>
            {theme?.tags.map((tag) => {
              return <Tag mr={2}>{tag}</Tag>;
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Press({ project }: PressInterface) {
  return (
    <Flex flexFlow="column">
      <Heading as="h3" fontSize="2xl" mt={8}>press</Heading>
      <Flex flexFlow="column" mt={2}>
        {project?.links.map((link)=>{
          return (
            <Link href={link.href}>
              <a style={{ textDecoration: "underline" }} target="_blank">{link.title}</a>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}


export default Project;
