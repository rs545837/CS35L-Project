/** @format */

"use client";

import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

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

const Wallet = () => {
  const [wallet, setWallet] = useState({});
  const [uid, setUID] = useState("");

  // Checks if user is authenticated
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated");
        setUID(user.uid);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => listen();
  }, []);

  // Gets wallet info based on UID
  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      console.log(docSnap);

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="#ff0080" fontSize="6xl" fontWeight="bold" mb={4}>
        WALLET
      </Text>
      <VStack>
        {Object.keys(wallet).map((coinID, index) => {
          if (wallet[coinID] != 0) {
            return (
              <Text
                color={colors[index]}
                fontSize="xl"
                key={index}
                fontWeight="bold"
                mb={2}
              >
                {coinID}: {wallet[coinID]}
              </Text>
            );
          }
        })}
      </VStack>
    </Box>
  );
};

export default Wallet;
