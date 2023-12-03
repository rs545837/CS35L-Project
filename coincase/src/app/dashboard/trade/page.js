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

  const [userState, setUserState] = useState({
    isLoading: false,
    balance: 0,
    
  });
  
  // User State
  const [balance, setBalance] = useState(0)
  const [wallet, setWallet] = useState()

  // Buy State
  const [buyAmount, setBuyAmount] = useState(0)
  const [buyTicker, setBuyTicker] = useState("")

  // Prices
  const [pricesMap, setPricesMap] = useState(null)
  const [pricesArr, setPricesArr] = useState(null)

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
        console.log(error);
      }
    };

    const fetchUserFromDB = async () => {
      const docRef = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let data = docSnap.data();
        // setPageState((prevState) => ({
        //   ...prevState,
        //   firstName: data.first_name,
        //   lastName: data.last_name,
        //   balance: data.balance,
        // }));
        setBalance(data.balance)
        data.wallet["doge"] = 1.3
        console.log(data.wallet["doge"])

      } else {
        //console.log("No such document!");
      }
    };

    fetchUserFromDB()
    getCoinPrices()
  }, []);

  function handleSelectComponentForBuy(event) {
    setBuyTicker(event.target.value);
  }

  async function handleBuy() {
    console.log("State: ", buyAmount)
    console.log("Ticker: ", buyTicker)

    if (balance < buyAmount) {
      // TODO: REPLACE WITH PROPER ERROR HANDLING
      console.log("Not enough money to buy")
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

        // Update wallet
        let dbWallet = data.wallet
        dbWallet[buyTicker.toLowerCase()] += amountOfCoin
        console.log(dbWallet)

        // Push updates
        transaction.update(docRef, { balance: dbBal, wallet: dbWallet });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
      // TODO: REPLACE WITH PROPER ERROR HANDLING
    }
  }

  return (
    <>
      <Stat>
        <StatLabel>Cash Balance</StatLabel>
        <StatNumber>${balance}</StatNumber>
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
            <NumberInput value={buyAmount} onChange={setBuyAmount} min={0} max={10000}>
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
