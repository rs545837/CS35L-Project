import { motion } from "framer-motion";

import React from "react";

function Logo() {
  return (
    <svg
      viewBox="0 0 800 800"
      //   style={{ width: "200px", height: "200px", marginRight: "10px" }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="cccoil-grad">
          <stop stop-color="#FF0080" stop-opacity="1" offset="0%"></stop>
          <stop stop-color="#b742ff" stop-opacity="1" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="url(#cccoil-grad)" fill="none" stroke-linecap="round">
        <motion.circle
          r="297"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1866"
          transform="rotate(20, 400, 400)"
          opacity="0"
          animate={{
            strokeDasharray: "1287 1970",
            transition: {
              duration: 3.5,
              delay: 1.2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="280.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1762"
          transform="rotate(40, 400, 400)"
          opacity="0"
          animate={{
            strokeDasharray: "1144 1970",
            opacity: 0.97,
            transition: {
              duration: 3.5,
              delay: 1.4,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="264"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1659"
          transform="rotate(60, 400, 400)"
          opacity="0"
          animate={{
            strokeDasharray: "1009 1970",
            opacity: 0.87,
            transition: {
              duration: 3.5,
              delay: 1.6,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="247.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1555"
          transform="rotate(80, 400, 400)"
          opacity="0"
          animate={{
            strokeDasharray: "883 1970",
            opacity: 0.87,
            transition: {
              duration: 3.5,
              delay: 1.7,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="231"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1451"
          transform="rotate(100, 400, 400)"
          opacity="0"
          animate={{
            opacity: 0.87,
            strokeDasharray: "765 1970",
            transition: {
              duration: 3.5,
              delay: 1.7,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="214.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1348"
          transform="rotate(120, 400, 400)"
          opacity="0"
          animate={{
            opacity: 0.87,

            strokeDasharray: "656 1970",
            transition: {
              duration: 3.5,
              delay: 1.8,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="198"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1244"
          transform="rotate(140, 400, 400)"
          opacity="0"
          animate={{
            opacity: 0.87,

            strokeDasharray: "555 1970",
            transition: {
              duration: 3.5,
              delay: 1.9,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="181.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1140"
          transform="rotate(160, 400, 400)"
          opacity="0"
          animate={{
            opacity: 0.87,

            strokeDasharray: "462 1970",
            transition: {
              duration: 3.5,
              delay: 1.9,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="165"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 1037"
          transform="rotate(180, 400, 400)"
          opacity="0.38"
          animate={{
            strokeDasharray: "378 1970",
            transition: {
              duration: 3.5,
              delay: 1.9,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="148.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 933"
          transform="rotate(200, 400, 400)"
          opacity="0.46"
          animate={{
            strokeDasharray: "303 1970",
            transition: {
              duration: 3.5,
              delay: 2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="132"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 829"
          transform="rotate(220, 400, 400)"
          opacity="0.42"
          animate={{
            strokeDasharray: "235 1970",
            transition: {
              duration: 3.5,
              delay: 2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="115.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 726"
          transform="rotate(240, 400, 400)"
          opacity="0.44"
          animate={{
            strokeDasharray: "177 1970",
            transition: {
              duration: 3.5,
              delay: 2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="99"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 622"
          transform="rotate(260, 400, 400)"
          opacity="0.54"
          animate={{
            strokeDasharray: "126 1970",
            transition: {
              duration: 3.5,
              delay: 2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="82.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 518"
          transform="rotate(280, 400, 400)"
          opacity="0.28"
          animate={{
            strokeDasharray: "84 1970",
            transition: {
              duration: 3.5,
              delay: 2.2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="66"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 415"
          transform="rotate(300, 400, 400)"
          opacity="0.32"
          animate={{
            strokeDasharray: "50 1970",
            transition: {
              duration: 3.5,
              delay: 2.2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="49.5"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 311"
          transform="rotate(320, 400, 400)"
          opacity="0.3"
          animate={{
            strokeDasharray: "25 1970",
            transition: {
              duration: 3.5,
              delay: 2.2,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
        <motion.circle
          r="33"
          cx="400"
          cy="400"
          stroke-width="6"
          stroke-dasharray="0 207"
          transform="rotate(340, 400, 400)"
          opacity="0.23"
          animate={{
            strokeDasharray: "8 1970",
            transition: {
              duration: 3.5,
              delay: 2.5,
              ease: "easeInOut",
            },
          }}
        ></motion.circle>
      </g>
    </svg>
  );
}

export default Logo;
