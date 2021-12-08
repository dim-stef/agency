import { Box, Flex } from "@chakra-ui/layout";
import styles from "./PortfolioBox.module.css";

function PortfolioBox() {
  return (
    <Flex width="60%" justifyContent="center">
      <Flex
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        className={styles.portfolioBoxContainer}
      >
        <Box className={styles.portfolioBox}></Box>
      </Flex>
    </Flex>
  );
}

export default PortfolioBox;
