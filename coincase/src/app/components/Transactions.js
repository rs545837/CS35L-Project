"use client";

import { Card, SimpleGrid, Text, Box, Heading,Container } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "@/app/Auth/AuthContext";

const TransactionHistoryComponent = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuth();

  const fetchTransactionHistory = async () => {
    setIsLoading(true);
    try {
      const usersCollection = collection(db, "users");
      const userDoc = doc(usersCollection, authUser.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (!userDocSnapshot.exists()) {
        console.log("No matching documents.");
        return;
      }

      const userData = userDocSnapshot.data();
      console.log(userData.transaction_history);
      setTransactionHistory(userData.transaction_history.reverse() || []);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const formatTimestamp = (timestamp) => {
    const formattedDate = new Date(timestamp).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    return formattedDate;
  };

  return (
    <Box>
      {isLoading || !transactionHistory ? (
        <Text>No transactions available.</Text>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
        >
          {transactionHistory.map((transaction, index) => (
            <Box
              centerContent
              bgGradient="linear(to-r, #FFFFFF, #FF0080,#b742ff,#FFFFFF)"
            >
              <Card key={index} boxShadow="lg">
                <Heading
                  fontSize="large"
                  bgGradient="linear(to-r, #FF0080, #b742ff)"
                  bgClip="text"
                  textAlign="center"
                >
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </Heading>
                {(transaction.type === "buy" ||
                  transaction.type === "sell") && (
                  <Text
                    bgGradient="linear(to-r, #FF0080, #b742ff)"
                    bgClip="text"
                  >
                    USD: {transaction.cashAmount}
                  </Text>
                )}

                <Text bgGradient="linear(to-r, #FF0080, #b742ff)" bgClip="text">
                  Coin:{" "}
                  {Number.isInteger(transaction.coinAmount)
                    ? transaction.coinAmount.toFixed(1)
                    : transaction.coinAmount.toFixed(5)}{" "}
                  {transaction.coin}
                </Text>
                <Text
                  bgGradient="linear(to-r, #FF0080, #b742ff)"
                  bgClip="text"
                  textAlign="center"
                >
                  Timestamp: {formatTimestamp(transaction.timestamp)}
                </Text>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TransactionHistoryComponent;
