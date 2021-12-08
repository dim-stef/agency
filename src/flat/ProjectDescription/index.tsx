import { Text, Heading, Flex } from "@chakra-ui/layout";

function ProjectDescription() {
  return (
    <Flex flexDirection="column" mt={20}>
      <Heading>Test</Heading>
      <Text maxW="420px">
        Nullam faucibus ante a lacus scelerisque, ac ultrices magna sodales. Sed
        in mi ac quam mattis imperdiet. Pellentesque tempor mollis ullamcorper.
      </Text>
    </Flex>
  );
}

export default ProjectDescription;
