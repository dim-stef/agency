import { useState, useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "../HeroCarouselItem/interface";
import HeroCarouselItem from "../HeroCarouselItem";
import projects from "../../data/projects.json";

function getItemMoveLeftPosition(i: number) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return -100;
  } else {
    return 100;
  }
}

function getItemMoveRightPosition(i: number) {
  if (i == 0) {
    return 0;
  } else if (i == 1) {
    return 100;
  } else {
    return -100;
  }
}

const range = [-1, 0 ,1];

const variants = {
  left: (i: number) => ({
    opacity: i == 0 ? 1 : 0.4,
    x: getItemMoveLeftPosition(i),
    // transition: {
    //   delay: i * 0.3,
    // },
  }),
  right: (i: number) => ({
    opacity: i == 0 ? 1 : 0.4,
    x: getItemMoveRightPosition(i),
    // transition: {
    //   delay: i * 0.3,
    // },
  }),
};

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const prevIndex = useRef(index);
  const direction = useRef('');

  function onItemClick(i: number, rangeValue: number) {
    if (rangeValue == 0) {
      direction.current = "left";
    } else {
      direction.current = "right";
    }
    console.log("direction.current", direction.current, rangeValue);
    setIndex(i);
  }

  return (
    <Flex w="50%" h="100%" position="relative">
      {range.map((rangeValue, i) => {
        // i = 1,2,3,4,5....
        // custom = -1,0,1
        let project: Project | undefined;
        if (index == 0 && rangeValue == -1) {
          project = projects[projects.length - 1];
        } 
        if(index == projects.length - 1 && rangeValue == 1){
          project = projects[0]
        }

        if(!project){
          project = projects[index + rangeValue];
        }

        let projectIndex = projects.findIndex((_project)=>_project.name == project?.name)

        return (
          <motion.div
            style={{ position: "absolute" }}
            key={projectIndex}
            custom={rangeValue}
            animate={direction.current == "left" ? "left" : "right"}
            variants={variants}
            onClick={() => onItemClick(projectIndex, rangeValue)}
          >
            <HeroCarouselItem project={project} />
          </motion.div>
        );
      })}
    </Flex>
  );
}

export default HeroCarousel;
