import { motion } from "framer-motion";
import React from "react";

function LogoRepeat() {
  return (
    <motion.svg viewBox="0 0 800 800" key="svg1">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="cccoil-grad">
          <stop stop-color="#FF0080" stop-opacity="1" offset="0%"></stop>
          <stop stop-color="#b742ff" stop-opacity="1" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="url(#cccoil-grad)" fill="none" stroke-linecap="round">
        <motion.circle
          key="circle"
          r="297"
          cx="400"
          cy="400"
          stroke-width="6"
          transform="rotate(20, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.67,
            strokeDasharray: "1287 1970",
            transition: {
              duration: 3,
              delay: 1.2,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle1"
          r="280.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1762"
          transform="rotate(40, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: [0, 0.68, 0.69, 1],
            opacity: [0, 0.97, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle2"
          r="264"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1659"
          transform="rotate(60, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.64, 0.65, 1],
            opacity: [0, 0.97, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle3"
          r="247.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1555"
          transform="rotate(80, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.6, 0.61, 1],
            opacity: [0, 0.97, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle4"
          r="231"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1451"
          transform="rotate(100, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.57, 0.58, 1],
            opacity: [0, 0.97, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle5"
          r="214.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1348"
          transform="rotate(120, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.53, 0.54, 1],
            opacity: [0, 0.87, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle6"
          r="198"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1244"
          transform="rotate(140, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.5, 0.51, 1],
            opacity: [0, 0.8, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle7"
          r="181.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1140"
          transform="rotate(160, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: [0, 0.47, 0.48, 1],
            opacity: [0, 0.7, 1, 0],
          }}
          transition={{
            times: [0, 0.3, 0.9, 1],
            duration: 8,
            ease: "easeOut",
            repeat: "Infinity",
            repeatDelay: 0.5,
          }}
        ></motion.circle>
        <motion.circle
          key="circle8"
          r="165"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1037"
          transform="rotate(180, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.65,
            strokeDasharray: "378 1970",
            transition: {
              duration: 3,
              delay: 1.9,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle9"
          r="148.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 933"
          transform="rotate(200, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.65,
            strokeDasharray: "303 1970",
            transition: {
              duration: 3,
              delay: 1,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle10"
          r="132"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 829"
          transform="rotate(220, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.65,
            strokeDasharray: "235 1970",
            transition: {
              duration: 3,
              delay: 1,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle11"
          r="115.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 726"
          transform="rotate(240, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.65,
            strokeDasharray: "177 1970",
            transition: {
              duration: 3,
              delay: 1,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle12"
          r="99"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 622"
          transform="rotate(260, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.25,
            strokeDasharray: "126 1970",
            transition: {
              duration: 3,
              delay: 1,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle13"
          r="82.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 518"
          transform="rotate(280, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.31,
            strokeDasharray: "84 1970",
            transition: {
              duration: 3,
              delay: 1.2,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle14"
          r="66"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 415"
          transform="rotate(300, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.1,
            strokeDasharray: "50 1970",
            transition: {
              duration: 3,
              delay: 1.2,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle15"
          r="49.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 311"
          transform="rotate(320, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.25,
            strokeDasharray: "25 1970",
            transition: {
              duration: 3,
              delay: 1.2,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          key="circle16"
          r="33"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 207"
          transform="rotate(340, 400, 400)"
          opacity="0"
          exit={{
            pathLength: [1, 0],
            opacity: [1, 0],
            transition: {
              duration: 3,
              delay: 1.7,
              ease: "easeOut",
            },
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 0.35,
            strokeDasharray: "8 1970",
            transition: {
              duration: 3,
              delay: 1.5,
              ease: "easeOut",
            },
          }}
        ></motion.circle>
      </g>
    </motion.svg>
  );
}

export default LogoRepeat;
