import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Flex } from "@chakra-ui/layout";
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

function getItemVerticalPosition(i: number) {
  if (i == 0) {
    return 0;
  } else {
    return 50;
  }
}

const range = [-1, 0, 1];

const variants = (project: ProjectInterface) => {
  const width = 600;
  const aspectRatio = project.frontImage.width / project.frontImage.height;
  const height = width / aspectRatio;

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
      width: i == 0 ? 600 : 300,
      // height: i == 0 ? 400 : 200,
      height: i == 0 ? Math.min(height, 500) : 200,
      zIndex: i == 0 ? 100 : 1,
      // transition: {
      //   delay: i * 0.3,
      // },
    }),
  };
};

interface HeroCarouselProps{
  projects: ProjectInterface[];
}

function HeroCarousel({ projects }: HeroCarouselProps) {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const prevIndex = useRef(index);
  const direction = useRef("");

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
                animate={direction.current == "left" ? "left" : "right"}
                variants={variants(projects[projectIndex])}
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
