/** @format */

"use client";

import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { getData } from "@/app/api";
import styled from "styled-components";

const colors = [
  "#f9058b",
  "#f30b95",
  "#ed11a0",
  "#e716aa",
  "#e11bb5",
  "#db21c0",
  "#d527ca",
  "#cf2cd5",
  "#c931df",
  "#c337ea",
];

const CoinImg = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 8px;
  transition: 300ms all;
`;

const Wallet = ({ type }) => {
  const [wallet, setWallet] = useState({});
  const [uid, setUID] = useState("");
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState(0);

  // Checks if user is authenticated
  useEffect(() => {
    let temp_prices = {};

    const getCoinPrices = async () => {
      try {
        const coin_data = await getData();

        coin_data.map((item) => {
          temp_prices[item?.symbol?.toString()] = item?.quotes?.USD?.price;
        });

        setPrices(temp_prices);
      } catch (error) {
        console.log(error);
      }
    };

    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated");
        setUID(user.uid);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => {
      listen();
      getCoinPrices();
    };
  }, []);

  // Gets wallet info based on UID
  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const ordered_wallet = Object.keys(data.wallet)
          .sort()
          .reduce((obj, key) => {
            obj[key] = data.wallet[key];
            return obj;
          }, {});

        setWallet(ordered_wallet);
      } else {
        console.log(uid + ": Cant find doc");
      }
    };

    if (uid !== "") {
      getUser();
    }
  }, [uid]);

  useEffect(() => {
    let temp_value = 0;

    const getValue = () => {
      for (const [key, amount] of Object.entries(wallet)) {
        temp_value += amount * prices[key.toUpperCase()];
      }

      setValue(temp_value.toFixed(2));
    };

    if (prices && wallet) {
      getValue();
    }
  }, [prices, wallet]);
  console.log(value);
  return type == "price" ? (
    value
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="#ff0080" fontSize="6xl" fontWeight="bold" mb={4}>
        WALLET
      </Text>
      <VStack align="center">
        {Object.keys(wallet).map((coinID, index) => {
          if (wallet[coinID] != 0) {
            return (
              <HStack key={coinID}>
                <CoinImg
                  src={`https://coinicons-api.vercel.app/api/icon/${coinID}`}
                />
                <Text
                  color={colors[index]}
                  fontSize={["l", "xl", "2xl"]}
                  key={index}
                  fontWeight="bold"
                  mb={2}
                >
                  {coinID.toUpperCase()} : {wallet[coinID]}
                </Text>
              </HStack>
            );
          }
        })}
        <Text
          color="#b742ff"
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight="bold"
          mt={8}
        >
          Total Value : ${value}
        </Text>
      </VStack>
    </Box>
  );
};

export default Wallet;
