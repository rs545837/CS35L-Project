"use client";
import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  return await axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

export const fetchCoinInfo = async () => {
  return await axios
    .get(`${BASE_URL}/coins/${params.coinId}`)
    .then((res) => res.data);
};

export const fetchCoinPrice = async () => {
  return await axios.get(`${BASE_URL}/tickers`).then((res) => res.data);
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
