import React from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./Layout.module.css";
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { theme } = useSelector((state: RootState) => state.theme);

  console.log("theme", theme);
  return (
    <Flex
      minHeight="100%"
      width="100%"
      bgColor={theme.primaryColor}
      className={styles.layout}
    >
      {children}
    </Flex>
  );
}

export default Layout;
