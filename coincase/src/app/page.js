/** @format */

"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "./dashboard/coins/page";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import CryptoWalletAnimation from "./components/landingAnimation";
import Logo from "./components/logo";

import {
  Center,
  Container,
  HStack,
  Text,
  Flex,
  Box,
  Spacer,
  Button,
} from "@chakra-ui/react";
import Header from "./header";
import Home from "./coins/page";

function Landing() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  return (
    <div>
      <Container centerContent>
        <Header />
        <Flex alignContent="center">
          <Spacer />
          <Box>
            <Box as={motion.div} initial="hidden" animate="visible">
              <Text
                as={motion.text}
                bgGradient="linear(to-r, #FF0080, #b742ff)"
                bgClip="text"
                fontSize="8xl"
                fontWeight="bold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 5, duration: 2.3 },
                }}
              >
                Coincase
              </Text>
              <Flex>
                <Text
                  as={motion.text}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  style={{ color: "#FF0080" }}
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 6, duration: 2.5 },
                  }}
                >
                  Buy.
                </Text>
                <Spacer />
                <Text
                  as={motion.text}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  style={{ color: "#FF0080" }}
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 7, duration: 2.5 },
                  }}
                >
                  Sell.
                </Text>
                <Spacer />

                <Text
                  as={motion.text}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  style={{ color: "#FF0080" }}
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 8, duration: 2.5 },
                  }}
                >
                  Trade.
                </Text>
                <Spacer />

                <Text
                  as={motion.text}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  style={{ color: "#b742ff" }}
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 9.5, duration: 3 },
                  }}
                >
                  Crypto.
                </Text>
              </Flex>
            </Box>
            <Logo />
          </Box>
        </Flex>
        <Link href="/Auth/SignUp">
          <Box
            as={motion.div}
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                delay: 11,
                duration: 1,
              },
            }}
          >
            <Button
              as={motion.button}
              // display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              whileHover={{
                scale: 1.1,
                opacity: 0.8,
                backgroundColor: "#F687B3",
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              Get Started
            </Button>
          </Box>
        </Link>
      </Container>
      {/* <CryptoWalletAnimation /> */}
    </div>
  );
}

export default Landing;
