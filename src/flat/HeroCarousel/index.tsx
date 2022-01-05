import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Flex } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectInterface } from "../HeroCarouselItem/interface";
import HeroCarouselItem from "../HeroCarouselItem";
import { changeTheme } from "../../features/theme/themeSlice";
import styles from "../HeroCarouselItem/HeroCarouselItem.module.css";

function getItemMoveLeftPosition(i: number) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return -100;
  } else {
    return 200;
  }
}

function getItemMoveRightPosition(i: number) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return 200;
  } else {
    return -200;
  }
}

function getItemMoveTopPosition(
  i: number,
  isSmallerThan600: boolean,
  deviceWidth: number
) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return deviceWidth * 0.1;
  } else {
    return deviceWidth * (-0.1);
  }
}

function getItemVerticalPosition(i: number) {
  if (i == 0) {
    return 0;
  } else {
    return 50;
  }
}

const range = [-1, 0, 1];

const variants = (
  project: ProjectInterface,
  isSmallerThan600: boolean,
  deviceWidth: number
) => {
  // const bigWidth = isSmallerThan600 ? 300 : 600;
  // const smallWidth = isSmallerThan600 ? 250 : 300;

  const bigWidth = Math.min(600, deviceWidth * 0.8);
  const smallWidth = Math.min(400, deviceWidth * 0.6);

  const aspectRatio = project.frontImage.width / project.frontImage.height;
  const bigHeight = bigWidth / aspectRatio;
  const smallHeight = smallWidth / aspectRatio;

  return {
    left: (i: number) => ({
      opacity: i == 0 ? 1 : 0.4,
      x: getItemMoveLeftPosition(i),
      y: getItemVerticalPosition(i),
      // transition: {
      //   delay: i * 0.3,
      // },
    }),
    right: (i: number) => ({
      x: getItemMoveRightPosition(i),
      width: i == 0 ? bigWidth : smallWidth,
      // height: i == 0 ? 400 : 200,
      height: i == 0 ? Math.min(bigHeight, 500) : smallHeight,
      zIndex: i == 0 ? 100 : 1,
      // transition: {
      //   delay: i * 0.3,
      // },
    }),
    top: (i: number) => ({
      y: getItemMoveTopPosition(i, isSmallerThan600, deviceWidth),
      width: i == 0 ? bigWidth : smallWidth,
      // height: i == 0 ? 400 : 200,
      height: i == 0 ? Math.min(bigHeight, 500) : 200,
      zIndex: i == 0 ? 100 : 1,
      // transition: {
      //   delay: i * 0.3,
      // },
    }),
  };
};

interface HeroCarouselProps {
  projects: ProjectInterface[];
}

function HeroCarousel({ projects }: HeroCarouselProps) {
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [isLargerThan1260] = useMediaQuery("(min-width: 1260px)");
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isSmallerThan400] = useMediaQuery("(max-width: 400px)");
  const dispatch = useDispatch();

  console.log("width", deviceWidth);
  const [index, setIndex] = useState(0);
  const prevIndex = useRef(index);
  const direction = useRef("");

  function onWindowWidthChange() {
    setDeviceWidth(window.innerWidth);
  }

  useEffect(() => {
    onWindowWidthChange();
    window.addEventListener("resize", onWindowWidthChange);

    return () => {
      window.removeEventListener("resize", onWindowWidthChange);
    };
  }, []);

  function onItemClick(i: number, rangeValue: number) {
    if (rangeValue == 0) {
      return;
    }
    const project = projects[i];
    dispatch(changeTheme(project));

    if (rangeValue == 0) {
      direction.current = "left";
    } else {
      direction.current = "right";
    }
    console.log("direction.current", direction.current, rangeValue);
    setIndex(i);
  }

  return (
    <Flex w="70%">
      <Flex
        h="100%"
        w="100%"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Flex w="100%" h="500px" justifyContent="center" alignItems="center">
          {range.map((rangeValue, i) => {
            // i = 1,2,3,4,5....
            // custom = -1,0,1
            let project: ProjectInterface | undefined;
            if (index == 0 && rangeValue == -1) {
              project = projects[projects.length - 1];
            }
            if (index == projects.length - 1 && rangeValue == 1) {
              project = projects[0];
            }

            if (!project) {
              project = projects[index + rangeValue];
            }

            let projectIndex = projects.findIndex(
              (_project) => _project.name == project?.name
            );

            return (
              <motion.div
                // initial={false}
                className={styles.heroCarouselItemContainer}
                style={{ position: "absolute" }}
                // transition={{ duration: 0.5 }}
                key={projectIndex}
                custom={rangeValue}
                animate={isLargerThan1260 ? "right" : "top"}
                variants={variants(
                  projects[projectIndex],
                  isSmallerThan600,
                  deviceWidth
                )}
                onClick={() => onItemClick(projectIndex, rangeValue)}
              >
                <HeroCarouselItem
                  isPrimary={rangeValue === 0}
                  project={project}
                />
              </motion.div>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HeroCarousel;
