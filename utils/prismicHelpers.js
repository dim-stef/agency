// ~/utils/prismicHelpers.js
import Prismic from "@prismicio/client";
import Link from "next/link";
import {
  apiEndpoint,
  accessToken,
  linkResolver,
  Router,
} from "../prismicConfiguration";

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type, element, content, children, index) => (
  <Link key={index} href={linkResolver(element.data)}>
    <a>{content}</a>
  </Link>
);

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken, Router));

// Options to be passed to the Client
const createClientOptions = (
  req = null,
  prismicAccessToken = null,
  routes = null
) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  const routesOption = routes ? { routes: Router.routes } : {};
  return {
    ...reqOption,
    ...accessTokenOption,
    ...routesOption,
  };
};

export function extractProjectDataFromPrisma(data) {
  let projectData = data;
  projectData = projectData.results.map((_project) => {
    let project = _project.data;
    return {
      name: project.name[0]["text"],
      description: project.description[0]["text"],
      frontImage: {
        src: project.front_image.url,
        width: project.front_image.dimensions.width,
        height: project.front_image.dimensions.height,
      },
      isPrimary: project.is_primary,
      type: project.type[0]["text"],
      primaryColor: project.primary_color,
      secondaryColor: project.secondary_color,
      darkMode: project.dark_mode,
      tags: project.tags.map((tag) => tag.tag[0]["text"]),
      links: project.project_links.map((project_link) => {
        return {
          href: project_link.link.url,
          title: project_link.link_title[0]["text"],
        };
      }),
      showcaseVertical: project.showcase_vertical,
      showcase: project.project_images.map((showcase) => {
        return {
          src: showcase.showcase_image.url,
          title:
            showcase.showcase_image_title.length > 0
              ? showcase.showcase_image_title[0]["text"]
              : "",

          description:
            showcase.showcase_image_description.length > 0
              ? showcase.showcase_image_description[0]["text"]
              : "",
        };
      }),
    };
  });

  // find the primary project and change its position from wherever it is to the 0 index
  // this is so it appears as the initial one in the carousel
  let primary = projectData.find((project)=>project.isPrimary);
  let primaryIndex = projectData.findIndex((project) => project.isPrimary);
  projectData.splice(primaryIndex, 1);
  projectData.splice(0, 0, primary);

  return projectData;
}

export default Client;
