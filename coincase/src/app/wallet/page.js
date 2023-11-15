"use client";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

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
      const docRef = doc(db, "Users", uid);
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

  return (
    <Box
      bgGradient="linear(to-r, #FF0080, #b742ff)"
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        textShadow={"1px 1px 2px #222222"}
        color="white"
        fontSize="6xl"
        fontWeight="bold"
        mb={4}
      >
        WALLET
      </Text>
      <VStack>
        {Object.keys(wallet).map((coinID, index) => {
          if (wallet[coinID] != 0) {
            return (
              <Text
                textShadow={"1px 1px 2px #222222"}
                color="white"
                fontSize="xl"
                key={index}
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
