"use client";
import { fetchCoins } from "@/app/api";
import axios from "axios";
import { useQuery } from "react-query";
import { styled, keyframes } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Link from "next/link";
import QueryProvider from "@/app/queryProvider";
import Chart from "./chart";
import Price from "./price";
import { coinPrices } from "../../../../../static/coinPrices";
import { coinName } from "../../../../../static/coinName";

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 24px;
  font-weight: 700;
  transition: 300ms ease-in;
`;
const CoinWrapper = styled.div`
  background-color: white;
  height: 80vh;
  padding: 24px 64px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  color: black;
`;

const TitleImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 5rem;
  width: fit-content;
`;

const OverViewBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`;

const OverView = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px;
  margin: 12px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid black;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  span:first-child {
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

const Description = styled.div`
  width: 100%;
  color: black;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px;
  margin: 12px;
  font-size: 20px;
  line-height: 1.5;
  border-radius: 4px;
  border: 1px solid black;
`;

const PriceAndChart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkTo = styled(StyledLink)`
  display: block;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  background-color: white;
  color: black;
  border-radius: 20px;
  padding: 12px 24px;
  margin: 4px;
  &: hover {
    border: 1px solid black;
  }
`;

const titleAnimation = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
  transform: scale(1.2);
}
100% {
opacity: 0;

}
`;

const LinkTitle = styled(StyledLink)`
  margin-left: 10px;
  animation: ${titleAnimation} 2s linear infinite;
`;
const BASE_URL = "https://api.coinpaprika.com/v1";

export default function Coin({ params }) {
  const coinId = params.coinId;
  const fetchCoinTickers = async () => {
    return await axios
      .get(`${BASE_URL}/tickers/${params.coinId}`)
      .then((res) => res.data);
  };
  const coinWithId = coinName.find((coin) => coin.id === params.coinId).rank;
  let tickersData = coinPrices[coinWithId - 1];
  console.log(tickersData);
  const { isLoading: tickersLoading, data } = useQuery(
    ["tickers", { params }],
    () => fetchCoinTickers(params.coinId),
    { refetchInterval: 100000 }
  );

  if (data != undefined) {
    tickersData = data;
    console.log(2);
  }

  return (
    <CoinWrapper>
      <HelmetProvider>
        <Helmet>
          <title>{tickersData.name}</title>
        </Helmet>
      </HelmetProvider>
      <TitleContainer>
        <TitleImg
          src={`https://coinicons-api.vercel.app/api/icon/${tickersData?.symbol.toLowerCase()}`}
        />
        <Title>{tickersData?.name}</Title>
      </TitleContainer>
      <ContentWrapper>
        <PriceAndChart>
          <QueryProvider>
            <Chart params={params} />
            <Price params={params} />
          </QueryProvider>
        </PriceAndChart>
        <OverViewBox>
          <OverView>
            <OverViewItem>
              <span>Name: </span>
              <span>{tickersData?.name}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol: </span>
              <span>{tickersData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Rank: </span>
              <span>{tickersData?.rank}</span>
            </OverViewItem>
          </OverView>
          <Description>{coinName[coinWithId - 1].description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Supply: </span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply: </span>
              <span>
                {tickersData?.max_supply == 0
                  ? tickersData?.total_supply
                  : tickersData?.max_supply}
              </span>
            </OverViewItem>
          </OverView>
        </OverViewBox>
      </ContentWrapper>
    </CoinWrapper>
  );
}
