/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "./coins/page";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
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
} from "@chakra-ui/react";

function Landing() {
  return (
    <div>
      <Container centerContent>
        <Flex alignContent="center">
          <Box></Box>
          <Spacer />
          <Box>
            <Text
              bgGradient="linear(to-r, #FF0080, #b742ff)"
              bgClip="text"
              fontSize="8xl"
              fontWeight="bold"
            >
              Coincase
            </Text>
            <Flex>
              <Text
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
                style={{ color: "#FF0080" }}
              >
                Buy.
              </Text>
              <Spacer />
              <Text
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
                style={{ color: "#FF0080" }}
              >
                Sell.
              </Text>
              <Spacer />

              <Text
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
                style={{ color: "#FF0080" }}
              >
                Trade.
              </Text>
              <Spacer />

              <Text
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
                style={{ color: "#b742ff" }}
              >
                Crypto.
              </Text>
            </Flex>
          </Box>
          <Spacer />
          <Box flex={1}></Box>
        </Flex>
        <Logo />
      </Container>
      <Link href="/Auth/SignUp">Sign Up</Link>
      <br></br>
      <Link href="/Auth/SignIn">Sign In</Link>
      <br></br>

      <Link href="/dashboard/Home">Home</Link>

      <CryptoWalletAnimation />
    </div>
  );
}

export default Landing;
