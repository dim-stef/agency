import Link from "next/link";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";

type NavigationBarLinkInterface = {
  href: string;
  title: string;
};

function NavigationBar() {
  return (
    <Flex
      w="100%"
      h="60px"
      alignItems="center"
      position="absolute"
      pl={10}
      pr={10}
    >
      <Flex flex={1} h="100%" alignItems="center">
        <NavigationBarLink href="/" title="project69" />
      </Flex>
      <NavigationBarLink href="/" title="about" />
      <NavigationBarLink href="/" title="work with us" />
    </Flex>
  );
}

function NavigationBarLink({ href, title }: NavigationBarLinkInterface) {
  return (
    <Flex mr={10} h="100%" alignItems="center">
      <Link href={href}>
        <a style={{height: '100%', display: 'flex', alignItems: 'center'}}>{title}</a>
      </Link>
    </Flex>
  );
}

export default NavigationBar;
