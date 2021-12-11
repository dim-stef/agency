import { useSelector } from "react-redux";
import { DarkMode } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { RootState } from "../../store";

function Project() {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Flex flexFlow="column" justifyContent="center" alignItems="center">
      <Heading>Introducing {theme.name}</Heading>
    </Flex>
  );
}

export default Project;
