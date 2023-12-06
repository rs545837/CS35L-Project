"use client";
import axios from "axios";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import Coin from "./coin";
import { coinPrices } from "../../../../../static/coinPrices";

const BASE_URL = "https://api.coinpaprika.com/v1";

export default function Home({ params }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Coin params={params} />
    </QueryClientProvider>
  );
}

export function CoinPrice({ params, type, rank }) {
  let tickersData = coinPrices[rank - 1];
  const fetchCoinTickers = async () => {
    return await axios
      .get(`${BASE_URL}/tickers/${params}`)
      .then((res) => res.data);
  };
  const { isLoading: tickersLoading, data } = useQuery(
    ["tickers", { params }],
    () => fetchCoinTickers(params),
    { refetchInterval: 5000 }
  );
  if (!tickersLoading) {
    tickersData = data;
  }

  let value;

  switch (type) {
    case "only":
      value = tickersData?.quotes.USD.price.toFixed(2);
    case "price":
      value = "$" + tickersData?.quotes.USD.price.toFixed(2);
      break;
    case "change":
      value = tickersData?.quotes.USD.percent_change_1h;
      break;
    case "cap":
      value = tickersData?.quotes.USD.market_cap;
      if (value > 1000000000) {
        value = "$" + (value / 1000000000).toFixed(1) + "B";
      } else if (value > 1000000) {
        value = "$" + (value / 1000000).toFixed(1) + "M";
      } else if (value > 1000) {
        value = "$" + (value / 1000).toFixed(1) + "K";
      } else {
        value = "$" + value?.toFixed(1);
      }
      break;
    default:
      value = "price";
      break;
  }

  return type === "only" ? (
    value
  ) : (
    <>
      <div
        style={{
          color: type === "change" ? (value < 0 ? "red" : "blue") : "black",
        }}
      >
        {value}
        {type === "change" ? "%" : null}
      </div>
      <br />
    </>
  );
}
