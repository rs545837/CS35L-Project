"use client";
import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";
import { coinPrices } from "../../static/coinPrices";

const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  return await axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

export const fetchCoinInfo = async () => {
  return await axios
    .get(`${BASE_URL}/coins/${params.coinId}`)
    .then((res) => res.data);
};

export const fetchCoinTickers = async () => {
  return await axios
    .get(`${BASE_URL}/tickers/${params.coinId}`)
    .then((res) => res.data);
};

export const fetchCoinHistory = async () => {
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${params.coinId}`)
    .then((res) => res.data);
};

export const fetchCoinPrice = async () => {
  return await axios.get(`${BASE_URL}/tickers`).then((res) => res.data);
};

export const getData = async () => {
  try {
    const data = await fetchCoinPrice();
    const subset = data.slice(0, 10);
    return subset;
  } catch (error) {
    console.error(error.message);
    return coinPrices;
  }
};

export const fetchData = async () => {
  try {
    const data = await getData().catch(() => coinPrices);
    return data.map((item) => item?.quotes?.USD?.price?.toString() ?? "");
  } catch (error) {
    console.error("Error:", error);
    return Array(10).fill(""); // Return an array of 10 empty strings in case of an error
  }
};

/* do it like this 
// import fetchData from api.js

  const [data, setData] = useState(Array(10).fill("")); 

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataAndSetData();
  }, []);

  // data will have the array of 10 prices. 
  console.log(data);
 
 
 */
