/** @format */

"use client";

import { useAuth } from '@/app/Auth/AuthContext';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

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

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { Select } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { runTransaction } from "firebase/firestore";

export default function trade() {
  const { authUser } = useAuth();
  const toast = useToast()

  // General State
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  
  // User State
  const [balance, setBalance] = useState(0)
  const [wallet, setWallet] = useState()

  // Prices
  const [pricesMap, setPricesMap] = useState(null)
  const [pricesArr, setPricesArr] = useState(null)

  // Buy State
  const [buyAmount, setBuyAmount] = useState(0)
  const [buyTicker, setBuyTicker] = useState("")

  // Sell State

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
        setPricesArr(temp_prices_arr)
      } catch (error) {
        setErrorMsg("Error Loading Crypto Prices")
      }
    };

    const fetchUserFromDB = async () => {
      const docRef = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let data = docSnap.data();
        setBalance(data.balance)
      } else {
        setErrorMsg("Error Loading User")
      }
    };

    fetchUserFromDB()
    getCoinPrices()
  }, [], [balance]);

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

  async function handleBuy() {
    console.log("State: ", buyAmount)
    console.log("Ticker: ", buyTicker)

    if (balance < buyAmount) {
      setErrorMsg("Insufficient funds to execute transaction");
      return
    }

    let amountOfCoin = buyAmount / pricesMap[buyTicker]

    const docRef = doc(db, "users", authUser.uid);

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          return Promise.reject("Error! Try again.");
        }

        let data = sfDoc.data();

        // Make sure balance >= buyAmount
        let dbBal = data.balance

        if (dbBal < buyAmount) {
          return Promise.reject("Insufficient Funds");
        }
        
        // Update balance
        dbBal = dbBal - buyAmount
        setBalance(balance - buyAmount) // locally

        // Update wallet
        let dbWallet = data.wallet
        dbWallet[buyTicker.toLowerCase()] += amountOfCoin
        console.log(dbWallet)

        // Push updates
        transaction.update(docRef, { balance: dbBal, wallet: dbWallet });
      });
      console.log("Transaction successfully committed!");
      setSuccessMsg("Success!")
    } catch (e) {
      setErrorMsg("Error executing trade. Try again later.")
    }
  }

  // Sell Logic...

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
            <NumberInput value={buyAmount} onChange={setBuyAmount} min={0} max={1000000}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Select placeholder='Select crypto' onChange={handleSelectComponentForBuy}>
              {pricesArr && pricesArr.map((option) => (
                <option key={option} value={option.split(' ')[0]}>
                  {option}
                </option>
              ))}
            </Select>

            <Button colorScheme='blue' onClick={handleBuy}>Buy {buyTicker}</Button>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
