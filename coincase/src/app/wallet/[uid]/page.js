"use client";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Wallet = ({ params }) => {
  const uid = params.uid;

  const [wallet, setWallet] = useState({});

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
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getUser();
  }, []);

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
        })}
      </VStack>
    </Box>
  );
};

export default Wallet;
