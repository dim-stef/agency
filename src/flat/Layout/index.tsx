import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Flex height="100%" width="100%">
      {children}
    </Flex>
  );
}

export default Layout;
