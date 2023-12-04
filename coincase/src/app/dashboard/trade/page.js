/** @format */

"use client";

import { useAuth } from "@/app/Auth/AuthContext";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputLeftElement,
  InputGroup,
  Input,
  Box,
  Container,
  Center,
  Collapse,
  Card,
  Text,
  TabIndicator,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import { getData } from "@/app/api";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  useToast,
} from "@chakra-ui/react";

import { Select } from "@chakra-ui/react";

import { motion } from "framer-motion";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { runTransaction } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { LockIcon } from "@chakra-ui/icons";

export default function trade() {
  const { authUser } = useAuth();
  const toast = useToast();
  const router = useRouter();

  // General State
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, isLoading] = useState(false);

  // User State
  const [cashInput, setCashInput] = useState("");
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState();
  const [ticker, setTicker] = useState("");
  const [cryptoIndex, setCryptoIndex] = useState(0);
  const [cryptoSelected, setCryptoSelected] = useState(false);
  // Prices
  const [pricesMap, setPricesMap] = useState(null);
  const [pricesArr, setPricesArr] = useState(null);

  // Buy State
  const [buyAmount, setBuyAmount] = useState(0);
  // const [ticker, setTicker] = useState("");
  const [amountOfCoinBuy, setAmountOfCoinBuy] = useState(0);

  // Sell State
  const [sellAmount, setSellAmount] = useState(0);
  // const [ticker, setTicker] = useState("");
  const [amountOfCoinSell, setAmountOfCoinSell] = useState(0);

  // Send State
  const [sendAmount, setSendAmount] = useState(0);
  // const [ticker, setTicker] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendUpdate, setSendUpdate] = useState(false); // just used to update wallet after send

  // Keep track of submission attempts
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Fetch general information, like crypto prices and user balance.
  useEffect(() => {
    let temp_prices_map = {};
    let temp_prices_arr = [];

    const getCoinPrices = async () => {
      try {
        const coin_data = await getData();

        coin_data.map((item) => {
          temp_prices_map[item?.symbol?.toString()] = item?.quotes?.USD?.price;
          temp_prices_arr.push(
            item?.symbol?.toString() +
              " $" +
              item?.quotes?.USD?.price.toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          );
        });

        setPricesMap(temp_prices_map);
        setPricesArr(temp_prices_arr);
        console.table(pricesArr);
      } catch (error) {
        setErrorMsg("Error Loading Crypto Prices");
      }
    };

    const fetchUserFromDB = async () => {
      isLoading(true);
      const docRef = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        setBalance(data.balance);
        setWallet(data.wallet);
      } else {
        setErrorMsg("Error Loading User");
      }
      isLoading(false);
    };

    fetchUserFromDB();
    getCoinPrices();
  }, [balance, sendUpdate]);

  useEffect(() => {
    if (errorMsg && isButtonPressed) {
      toast({
        title: `${errorMsg}`,
        position: "bottom",
        isClosable: true,
        status: "error",
        duration: 2500,
        colorScheme: "pink",
      });
      setIsButtonPressed(false);
      setErrorMsg("");
    }
  }, [errorMsg, isButtonPressed, toast]);

  useEffect(() => {
    if (successMsg) {
      toast({
        title: `${successMsg}`,
        position: "bottom",
        isClosable: true,
        status: "success",
        duration: 3500,
        colorScheme: "green",
      });

      setSuccessMsg("");
    }
  }, [successMsg]);

  // Buy Logic

  function handleTicker(event) {
    setCryptoIndex(event.target.selectedIndex - 1);
    console.log(event.target.value);
    event.target.value == ""
      ? setCryptoSelected(false)
      : setCryptoSelected(true);
    setTicker(event.target.value);
  }

  // update amountOfCoinBuy
  useEffect(() => {
    const e = {
      target: {
        value: String(buyAmount),
      },
    };
    handleInputForBuy(e);
  }, [ticker]);

  function handleInputForBuy(event) {
    const inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);

      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setAmountOfCoinBuy(0);
        return;
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setAmountOfCoinBuy(0);
      return;
    }

    if (num <= 0 || num >= 10000000) {
      setErrorMsg("Amount must be greater than 0 and less 10,000,000");
      setAmountOfCoinBuy(0);
      return;
    }

    setBuyAmount(num);

    if (!ticker) {
      setAmountOfCoinBuy(0);
      return;
    }

    setAmountOfCoinBuy(num / pricesMap[ticker]);
  }

  async function handleBuy() {
    console.log("State: ", buyAmount);
    console.log("Ticker: ", ticker);

    setIsButtonPressed(true);

    if (buyAmount <= 0 || buyAmount >= 10000000) {
      setErrorMsg("Invalid Amount.");
      setAmountOfCoinSell(0);
      return;
    }

    if (balance < buyAmount) {
      setErrorMsg("Insufficient funds to execute transaction");
      return;
    }

    let amountOfCoin = buyAmount / pricesMap[ticker];

    const docRef = doc(db, "users", authUser.uid);
    setIsButtonPressed(false);

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let data = sfDoc.data();

        // Make sure balance >= buyAmount
        let dbBal = data.balance;

        if (dbBal < buyAmount) {
          return Promise.reject("Insufficient Funds");
        }

        // Update balance
        dbBal = dbBal - buyAmount;
        setBalance(balance - buyAmount); // locally

        // Update wallet
        let dbWallet = data.wallet;
        dbWallet[ticker.toLowerCase()] += amountOfCoin;
        console.log(dbWallet);

        // Update transaction history
        const transaction_details = {
          type: "buy",
          prevBalance: balance,
          newBalance: balance - buyAmount,
          cashAmount: buyAmount,
          coinAmount: amountOfCoin,
          coin: ticker,
          timestamp: new Date().toUTCString(),
        };
        const dbTransactionHistory = [
          ...data.transaction_history,
          transaction_details,
        ];

        // Push updates
        transaction.update(docRef, {
          balance: dbBal,
          wallet: dbWallet,
          transaction_history: dbTransactionHistory,
        });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Bought " + amountOfCoin + " " + ticker);
      setCryptoSelected(false);
      setTicker("");
    } catch (e) {
      setIsButtonPressed(true);
      console.error(e);
      setErrorMsg("Error executing trade.");
    }
  }

  // Sell Logic...

  // update amountOfCoinSell
  useEffect(() => {
    const e = {
      target: {
        value: String(sellAmount),
      },
    };
    handleInputForSell(e);
  }, [ticker]);

  function handleInputForSell(event) {
    const inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);

      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setAmountOfCoinSell(0);
        return;
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setAmountOfCoinSell(0);
      return;
    }

    setSellAmount(num);

    if (!ticker) {
      setAmountOfCoinSell(0);
      return;
    }

    setAmountOfCoinSell(num / pricesMap[ticker]);
  }

  async function handleSell() {
    console.log("State: ", sellAmount);
    console.log("Ticker: ", ticker);
    setIsButtonPressed(true);

    if (sellAmount <= 0 || sellAmount >= 10000000) {
      setErrorMsg("Invalid Amount.");
      setAmountOfCoinSell(0);
      return;
    }

    let amountOfCoin = sellAmount / pricesMap[ticker];

    if (amountOfCoin > wallet[ticker]) {
      setErrorMsg("Insufficient balance to execute transaction");
      return;
    }

    const docRef = doc(db, "users", authUser.uid);
    setIsButtonPressed(false);

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let data = sfDoc.data();

        // Make sure amountOfCoin in wallet >= amountOfCoin trying to sell
        let dbWallet = data.wallet;

        if (dbWallet[ticker.toLowerCase()] < amountOfCoin) {
          return Promise.reject("Insufficient Funds");
        }

        // Update balance
        let profit = amountOfCoin * pricesMap[ticker];
        let dbBal = data.balance;
        dbBal = dbBal + profit;
        setBalance(balance + profit); // locally

        // Update wallet
        dbWallet[ticker.toLowerCase()] -= amountOfCoin;

        // Update transaction history
        const transaction_details = {
          type: "sell",
          prevBalance: balance,
          newBalance: balance + sellAmount,
          cashAmount: sellAmount,
          coinAmount: amountOfCoin,
          coin: ticker,
          timestamp: new Date().toUTCString(),
        };
        const dbTransactionHistory = [
          ...data.transaction_history,
          transaction_details,
        ];

        // Push updates
        transaction.update(docRef, {
          balance: dbBal,
          wallet: dbWallet,
          transaction_history: dbTransactionHistory,
        });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Sold " + amountOfCoin + " " + ticker);
      setCryptoSelected(false);
      setTicker("");
    } catch (e) {
      setIsButtonPressed(true);

      setErrorMsg("Error executing trade.");
    }
  }

  // Send Logic

  function handleInputForSend(event) {
    const inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);

      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setSendAmount(0);
        return;
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setSendAmount(0);
      return;
    }

    if (num < 0 || num > 10000000) {
      setErrorMsg("Amount must be between 0 and 10,000,000");
      setSendAmount(0);
      return;
    }

    setSendAmount(num);
  }

  async function handleSend() {
    console.log("State: ", sendAmount);
    console.log("Ticker: ", ticker);
    setIsButtonPressed(true);

    if (sendAmount <= 0) {
      setErrorMsg("Insufficient Amount.");
      return;
    }

    if (sendAmount > wallet[ticker]) {
      setErrorMsg("Insufficient balance to execute transaction");
      return;
    }

    if (!recipient) {
      setErrorMsg("Enter recipient Address");
    }
    setIsButtonPressed(false);

    // Check if recipient address is correct
    const q = query(
      collection(db, "users"),
      where("wallet_address", "==", recipient)
    );
    let recipientDocId = null;

    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          recipientDocId = doc.id;
        });
      })
      .catch((error) => {
        console.error("Error querying Firestore:", error);
        setIsButtonPressed(true);
        setErrorMsg("Error Finding recipient");
        return;
      });

    setIsButtonPressed(true);

    if (!recipientDocId) {
      setErrorMsg("Error Finding recipient");
      return;
    }

    if (recipientDocId == authUser.id) {
      setErrorMsg("Can't send to yourself!");
      return;
    }
    setIsButtonPressed(false);

    const docRefSender = doc(db, "users", authUser.uid);
    const docRefRecipient = doc(db, "users", recipientDocId);

    try {
      await runTransaction(db, async (transaction) => {
        const refSenderDoc = await transaction.get(docRefSender);
        if (!refSenderDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        const docRefRecipientDoc = await transaction.get(docRefRecipient);
        if (!docRefRecipientDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let recipientData = docRefRecipientDoc.data();
        let senderData = refSenderDoc.data();

        // Make sure sender has enough of coin to send
        let recipientWallet = recipientData.wallet;
        let senderWallet = senderData.wallet;

        if (senderWallet[ticker.toLowerCase()] < sendAmount) {
          return Promise.reject("Insufficient Funds");
        }

        // Now, execute trade
        recipientWallet[ticker.toLowerCase()] += sendAmount;
        senderWallet[ticker.toLowerCase()] -= sendAmount;

        console.log("Rec wallet: ", recipientWallet);
        console.log("sender wallet: ", senderWallet);

        // Update transaction history
        const sender_transaction_details = {
          type: "send",
          prevCoinBalance: senderWallet[ticker.toLowerCase()],
          newCoinBalance: senderWallet[ticker.toLowerCase()] - sendAmount,
          coinAmount: sendAmount,
          coin: ticker,
          recipient: recipientData.wallet_address,
          timestamp: new Date().toUTCString(),
        };
        const recipient_transaction_details = {
          type: "receive",
          prevCoinBalance: recipientWallet[ticker.toLowerCase()],
          newCoinBalance: recipientWallet[ticker.toLowerCase()] + sendAmount,
          coinAmount: sendAmount,
          coin: ticker,
          sender: senderData.wallet_address,
          timestamp: new Date().toUTCString(),
        };
        const recipientTransactionHistory = [
          ...recipientData.transaction_history,
          recipient_transaction_details,
        ];

        const senderTransactionHistory = [
          ...senderData.transaction_history,
          sender_transaction_details,
        ];

        // Push updates
        transaction.update(docRefRecipient, {
          wallet: recipientWallet,
          transaction_history: recipientTransactionHistory,
        });
        transaction.update(docRefSender, {
          wallet: senderWallet,
          transaction_history: senderTransactionHistory,
        });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Sent " + sendAmount + " " + ticker);
      setCryptoSelected(false);
      setTicker("");
      setSendUpdate(!sendUpdate);
    } catch (e) {
      setIsButtonPressed(true);
      setErrorMsg("Error executing trade.");
      console.error(e);
    }
  }

  return (
    <Box>
      <Container centerContent>
        <Stat>
          <Center>
            <StatLabel>Balance</StatLabel>
          </Center>
          <StatNumber>
            $
            {balance.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </StatNumber>
        </Stat>
        <Select
          placeholder="Select crypto"
          value={ticker}
          onChange={handleTicker}
          variant="flushed"
          _hover={{ borderColor: "pink.400" }}
          _placeholder={{ opacity: 0.8, color: "gray.500" }}
          focusBorderColor="pink.400"
        >
          {!loading &&
            pricesArr &&
            pricesArr.map((option) => (
              <option key={option}>{option.split("$")[0]}</option>
            ))}
        </Select>
        <Collapse in={cryptoSelected}>
          <Text>
            Current price:{" "}
            {pricesArr &&
              cryptoIndex >= 0 &&
              pricesArr[cryptoIndex].split(" ")[1]}
          </Text>
          <Text>
            In wallet: {ticker && wallet[ticker.toLowerCase()].toFixed(7)}{" "}
            {ticker}
          </Text>
          <Text>
            Total Value:{" $"}
            {console.table(wallet)}
            {ticker &&
              (
                wallet[ticker.toLowerCase()] *
                parseFloat(
                  pricesArr[cryptoIndex]
                    .split(" ")[1]
                    .split("$")[1]
                    .replace(",", "")
                )
              ).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Text>
        </Collapse>
      </Container>

      <Tabs isFitted variant="unstyled">
        <TabList mb="1em">
          <Tab>Buy</Tab>
          <Tab>Sell</Tab>
          <Tab>Send</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="#FF0080"
          borderRadius="1px"
        />
        <TabPanels>
          {/* BUY PANEL */}
          <TabPanel>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  fontSize="1.2em"
                  children="$"
                  color="#FF0080"
                />
                <Input
                  onChange={handleInputForBuy}
                  type="number"
                  placeholder="Enter amount"
                  variant="flushed"
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>

              <Button
                as={motion.button}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#FF0080"}
                href={"#"}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#e00071",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={handleBuy}
              >
                Buy
                {amountOfCoinBuy > 0 && amountOfCoinBuy.toFixed(5)} {ticker}
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            {/* SELL PANEL */}
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  fontSize="1.2em"
                  children="$"
                  color="#FF0080"
                />
                <Input
                  onChange={handleInputForSell}
                  type="number"
                  placeholder="Enter amount"
                  variant="flushed"
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>

              <Button
                as={motion.button}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#FF0080"}
                href={"#"}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#e00071",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={handleSell}
              >
                Sell {amountOfCoinSell > 0 && amountOfCoinSell.toFixed(5)}{" "}
                {ticker}
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            {/* SEND PANEL */}
            <VStack spacing={4}>
              <InputGroup mt={4}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="#FF0080" />}
                />
                <Input
                  onChange={(e) => {
                    setRecipient(e.target.value);
                  }}
                  variant="flushed"
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                  type="text"
                  placeholder="Recipient Address"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="black.300"
                  fontSize="1.2em"
                  children={<BsCurrencyBitcoin color="#FF0080" />}
                />
                <Input
                  onChange={handleInputForSend}
                  type="number"
                  placeholder="Enter amount"
                  variant="flushed"
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>
              <Button
                as={motion.button}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#FF0080"}
                href={"#"}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#e00071",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={handleSend}
              >
                Send {ticker}
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
