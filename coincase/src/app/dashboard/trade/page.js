/** @format */

"use client";

import { useAuth } from '@/app/Auth/AuthContext';
import { Tabs, TabList, TabPanels, Tab, TabPanel, InputLeftElement, InputGroup, Input, Box } from '@chakra-ui/react'

import { getData } from "@/app/api";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  useToast,
} from '@chakra-ui/react'

import { Select } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { db } from "@/app/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { runTransaction } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { LockIcon } from '@chakra-ui/icons';

export default function trade() {
  const { authUser } = useAuth();
  const toast = useToast();
  const router = useRouter();

  // General State
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, isLoading] = useState(false);
  
  // User State
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState();

  // Prices
  const [pricesMap, setPricesMap] = useState(null);
  const [pricesArr, setPricesArr] = useState(null);

  // Buy State
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyTicker, setBuyTicker] = useState("");
  const [amountOfCoinBuy, setAmountOfCoinBuy] = useState(0);

  // Sell State
  const [sellAmount, setSellAmount] = useState(0);
  const [sellTicker, setSellTicker] = useState("");
  const [amountOfCoinSell, setAmountOfCoinSell] = useState(0);

  // Send State
  const [sendAmount, setSendAmount] = useState(0);
  const [sendTicker, setSendTicker] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendUpdate, setSendUpdate] = useState(false); // just used to update wallet after send

  // Fetch general information, like crypto prices and user balance.
  useEffect(() => {
    let temp_prices_map = {};
    let temp_prices_arr = [];

    const getCoinPrices = async () => {
      try {
        const coin_data = await getData();

        coin_data.map((item) => {
          temp_prices_map[item?.symbol?.toString()] = item?.quotes?.USD?.price;
          temp_prices_arr.push(item?.symbol?.toString() + " $" + item?.quotes?.USD?.price.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }));
        });

        setPricesMap(temp_prices_map);
        setPricesArr(temp_prices_arr);
      } catch (error) {
        setErrorMsg("Error Loading Crypto Prices");
      }
    };

    const fetchUserFromDB = async () => {
      isLoading(true)
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
    if (errorMsg) {
      toast({
        title: `${errorMsg}`,
        position: "bottom",
        isClosable: true,
        status: "error",
        duration: 3500,
        colorScheme: "pink",
      });

      setErrorMsg("");
    }
  }, [errorMsg]);

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

  function handleSelectComponentForBuy(event) {
    setBuyTicker(event.target.value);
  }

  // update amountOfCoinBuy
  useEffect(() => {
    const e = {
      target: {
        value: String(buyAmount)
      }
    };
    handleInputForBuy(e);
  }, [buyTicker]);

  function handleInputForBuy(event) {
    let inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);
  
      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setAmountOfCoinBuy(0);
        return
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setAmountOfCoinBuy(0);
      return
    }

    if (num < 0 || num > 10000000) {
      setErrorMsg("Amount must be between 0 and 10,000,000");
      setAmountOfCoinBuy(0);
      return
    }

    setBuyAmount(num);

    if (!buyTicker) {
      setAmountOfCoinBuy(0);
      return
    }

    setAmountOfCoinBuy(num / pricesMap[buyTicker]);
  }

  async function handleBuy() {
    console.log("State: ", buyAmount);
    console.log("Ticker: ", buyTicker);

    if (balance < buyAmount) {
      setErrorMsg("Insufficient funds to execute transaction");
      return
    }

    let amountOfCoin = buyAmount / pricesMap[buyTicker];

    const docRef = doc(db, "users", authUser.uid);

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
        dbWallet[buyTicker.toLowerCase()] += amountOfCoin;
        console.log(dbWallet);

        // Push updates
        transaction.update(docRef, { balance: dbBal, wallet: dbWallet });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Bought " + amountOfCoin + " " + buyTicker);
      setBuyTicker("");
    } catch (e) {
      setErrorMsg("Error executing trade. Try again later.");
    }
  }

  // Sell Logic...

  function handleSelectComponentForSell(event) {
    setSellTicker(event.target.value);
  }

  // update amountOfCoinSell
  useEffect(() => {
    const e = {
      target: {
        value: String(sellAmount)
      }
    };
    handleInputForSell(e);
  }, [sellTicker]);

  function handleInputForSell(event) {
    let inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);
  
      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setAmountOfCoinSell(0);
        return
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setAmountOfCoinSell(0);
      return
    }

    if (num < 0 || num > 10000000) {
      setErrorMsg("Amount must be between 0 and 10,000,000");
      setAmountOfCoinSell(0);
      return
    }

    setSellAmount(num);

    if (!sellTicker) {
      setAmountOfCoinSell(0);
      return
    }

    setAmountOfCoinSell(num / pricesMap[sellTicker])
  }

  async function handleSell() {
    console.log("State: ", sellAmount);
    console.log("Ticker: ", sellTicker);

    let amountOfCoin = sellAmount / pricesMap[sellTicker];

    if (amountOfCoin > wallet[sellTicker]) {
      setErrorMsg("Insufficient balance to execute transaction");
      return
    }

    const docRef = doc(db, "users", authUser.uid);

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let data = sfDoc.data();

        // Make sure amountOfCoin in wallet >= amountOfCoin trying to sell
        let dbWallet = data.wallet;

        if (dbWallet[sellTicker.toLowerCase()] < amountOfCoin) {
          return Promise.reject("Insufficient Funds");
        }

        // Update balance
        let profit = amountOfCoin * pricesMap[sellTicker];
        let dbBal = data.balance;
        dbBal = dbBal + profit;
        setBalance(balance + profit); // locally

        // Update wallet
        dbWallet[sellTicker.toLowerCase()] -= amountOfCoin;

        // Push updates
        transaction.update(docRef, { balance: dbBal, wallet: dbWallet });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Sold " + amountOfCoin + " " + sellTicker);
      setSellTicker("");
    } catch (e) {
      setErrorMsg("Error executing trade. Try again later.");
    }
  }

  // Send Logic

  function handleSelectComponentForSend(event) {
    setSendTicker(event.target.value);
  }

  function handleInputForSend(event) {
    let inputStr = event.target.value;
    let num = NaN;

    try {
      // Use parseFloat with radix 10 to parse the string as a base-10 integer
      num = parseFloat(inputStr, 10);
  
      if (isNaN(num)) {
        // issue
        setErrorMsg("Invalid Amount");
        setSendAmount(0);
        return
      }
    } catch (error) {
      // issue
      setErrorMsg("Invalid Amount");
      setSendAmount(0);
      return
    }

    if (num < 0 || num > 10000000) {
      setErrorMsg("Amount must be between 0 and 10,000,000");
      setSendAmount(0);
      return
    }

    setSendAmount(num);
  }

  async function handleSend() {
    console.log("State: ", sendAmount);
    console.log("Ticker: ", sendTicker);

    if (sendAmount <= 0) {
      setErrorMsg("Insufficient amount");
    }

    if (sendAmount > wallet[sellTicker]) {
      setErrorMsg("Insufficient balance to execute transaction");
      return
    }
    
    if (!recipient) {
      setErrorMsg("Enter Receipient Address");
    }

    // Check if receipient address is correct
    const q = query(collection(db, 'users'), where('wallet_address', '==', recipient));
    let receipientDocId = null;

    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          receipientDocId = doc.id;
        });
      })
      .catch((error) => {
        console.error('Error querying Firestore:', error);
        setErrorMsg("Error Finding Receipient");
        return
      });
    
    if (!receipientDocId) {
      setErrorMsg("Error Finding Receipient");
      return
    }

    if (receipientDocId == authUser.id) {
      setErrorMsg("Can't send to yourself!")
      return
    }

    const docRefSender = doc(db, "users", authUser.uid);
    const docRefReceipient = doc(db, "users", receipientDocId);

    try {
      await runTransaction(db, async (transaction) => {
        const refSenderDoc = await transaction.get(docRefSender);
        if (!refSenderDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        const refReceipientDoc = await transaction.get(docRefReceipient);
        if (!refReceipientDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let receipientData = refReceipientDoc.data();
        let senderData = refSenderDoc.data();

        // Make sure sender has enough of coin to send
        let receipientWallet = receipientData.wallet;
        let senderWallet = senderData.wallet;

        if (senderWallet[sendTicker.toLowerCase()] < sendAmount) {
          return Promise.reject("Insufficient Funds");
        }

        // Now, execute trade
        receipientWallet[sendTicker.toLowerCase()] += sendAmount;
        senderWallet[sendTicker.toLowerCase()] -= sendAmount;

        console.log("Rec wallet: ", receipientWallet);
        console.log("sender wallet: ", senderWallet);

        // Push updates
        transaction.update(docRefReceipient, { wallet: receipientWallet });
        transaction.update(docRefSender, { wallet: senderWallet });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success! Sent " + sendAmount + " " + sendTicker);
      setSendTicker("");
      setSendUpdate(!sendUpdate);
    } catch (e) {
      setErrorMsg("Error executing trade. Try again later.");
      console.log(e);
    }
  }

  return (
    <>
      <Stat>
        <StatLabel>Cash Balance</StatLabel>
        <StatNumber>${balance.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </StatNumber>
      </Stat>

      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Buy</Tab>
          <Tab>Sell</Tab>
          <Tab>Send</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* BUY PANEL */}  
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='black.300'
                fontSize='1.2em'
                children='$'
              />
              <Input onChange={handleInputForBuy} type="number" placeholder='Enter amount' />
            </InputGroup>

            <Box m={2} />

            <Select placeholder='Select crypto' value={buyTicker} onChange={handleSelectComponentForBuy}>
              {pricesArr && pricesArr.map((option) => (
                <option key={option} value={option.split(' ')[0]}>
                  {option}
                </option>
              ))}
            </Select>

            <Box m={2} />

            <Button colorScheme='blue' onClick={handleBuy}>Buy {amountOfCoinBuy > 0 && amountOfCoinBuy} {buyTicker}</Button>
          </TabPanel>
          <TabPanel>
            {/* SELL PANEL */}
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='black.300'
                fontSize='1.2em'
                children='$'
              />
              <Input onChange={handleInputForSell} type="number" placeholder='Enter amount' />
            </InputGroup>

            <Box m={2} />

            <Select placeholder='Select crypto' value={sellTicker} onChange={handleSelectComponentForSell}>
              {!loading && pricesArr && pricesArr.map((option) => (
                <option key={option} value={option.split(' ')[0]}>
                  {option}      - Amount: {wallet[option.split(' ')[0].toLowerCase()]}
                </option>
              ))}
            </Select>

            <Box m={2} />

            <Button colorScheme='blue' onClick={handleSell}>Sell {amountOfCoinSell > 0 && amountOfCoinSell} {sellTicker}</Button>
          </TabPanel>
          <TabPanel>
            {/* SEND PANEL */}

            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none" children={<LockIcon />} />
              <Input onChange={(e) => {setRecipient(e.target.value)}} type="text" placeholder="Recipient Address" />
            </InputGroup>

            <Box m={2} />

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='black.300'
                fontSize='1.2em'
                children={<BsCurrencyBitcoin />}
              />
              <Input onChange={handleInputForSend} type="number" placeholder='Enter amount' />
            </InputGroup>

            <Box m={2} />

            <Select placeholder='Select crypto' value={sendTicker} onChange={handleSelectComponentForSend}>
              {!loading && pricesArr && pricesArr.map((option) => (
                <option key={option} value={option.split(' ')[0]}>
                  {option}      - Amount: {wallet[option.split(' ')[0].toLowerCase()]}
                </option>
              ))}
            </Select>

            <Box m={2} />

            <Button colorScheme='blue' onClick={handleSend}>Send {sendTicker}</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
