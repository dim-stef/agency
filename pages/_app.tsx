import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Prismic from "@prismicio/client";

// import type { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { ProjectInterface } from "../src/flat/HeroCarouselItem/interface";
import Layout from "../src/flat/Layout";
import Wrapper from "../src/features/AppWrapper";
import { extractProjectDataFromPrisma } from "../utils/prismicHelpers";
import Client from "../utils/prismicHelpers";
import { store } from "../src/store";

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any };
  fullData: any;
  children: JSX.Element;
  data: ProjectInterface[];
};

function MyApp({ Component, pageProps, data }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
