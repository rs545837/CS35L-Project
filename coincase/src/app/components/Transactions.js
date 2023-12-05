"use client";

import {
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Text,
  Box,
  Heading,
  Container,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

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
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
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
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {transactionHistory.map((transaction, index) => (
            <Container
              centerContent
              bgGradient="linear(to-r, #FFFFFF, #FF0080,#b742ff,#FFFFFF)"
            >
              <Card
                key={index}
                w="100%"
                h="100%"
                variant="elevated"
                padding={5}
                margin={1}
              >
                <CardHeader>
                  <Heading
                    bgGradient="linear(to-r,#FF0080, #b742ff,#FF0080)"
                    bgClip="text"
                    size="lg"
                    textAlign="center"
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading
                        bgGradient="linear(to-r,#FF0080, #b742ff,#FF0080)"
                        bgClip="text"
                        size="md"
                      >
                        {transaction.type === "buy" ||
                        transaction.type === "sell"
                          ? "USD"
                          : transaction.type === "receive"
                          ? "Sent From"
                          : "Sent To"}
                      </Heading>

                      {transaction.type === "buy" ||
                      transaction.type === "sell" ? (
                        <Text color="#FF0080">{transaction.cashAmount}$</Text>
                      ) : (
                        <Text color="#FF0080">
                          {transaction.sender
                            ? transaction.sender
                            : transaction.recipient}
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <Heading
                        bgGradient="linear(to-r,#FF0080, #b742ff,#FF0080)"
                        bgClip="text"
                        size="md"
                      >
                        Coin
                      </Heading>
                      <Text color="#FF0080">
                        {Number.isInteger(transaction.coinAmount)
                          ? transaction.coinAmount.toFixed(1)
                          : transaction.coinAmount.toFixed(5)}{" "}
                        {transaction.coin}
                      </Text>
                    </Box>
                    <Box>
                      <Heading
                        bgGradient="linear(to-r,#FF0080, #b742ff,#FF0080)"
                        bgClip="text"
                        size="md"
                      >
                        Time
                      </Heading>
                      <Text color="#FF0080">
                        {formatTimestamp(transaction.timestamp)}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Container>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TransactionHistoryComponent;
