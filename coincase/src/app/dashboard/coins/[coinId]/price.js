"use client";
import axios from "axios";
import { useQuery } from "react-query";
import { keyframes, styled } from "styled-components";
const PriceContainer = styled.div`
  width: fit-content;
  overflow: overlay;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const priceAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const CurrentPrice = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
  animation: ${priceAnimation} 1s linear;
`;

const PercentChange = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const PercentItems = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  padding: 12px 24px;
  margin: 12px;
  animation: ${priceAnimation} 1.5s linear;
  transition: 300ms all;

  span:first-child {
    margin-right: 12px;
    font-size: 18px;
  }
  &:hover {
    transform: scale(1.15);
  }
`;
const BASE_URL = "https://api.coinpaprika.com/v1";

export default function Price({ params }) {
  const fetchCoinTickers = async () => {
    return await axios
      .get(`${BASE_URL}/tickers/${params.coinId}`)
      .then((res) => res.data);
  };
  const { isLoading: priceLoading, data: priceData } = useQuery(
    ["tickers", { params }],
    () => fetchCoinTickers(params.coinId),
    { refetchInterval: 100000 }
  );

  let val;
  const getPriceColor = (val) => {
    if (val === undefined) {
      return "black";
    } else if (val > 0) {
      return "blue";
    } else if (val < 0) {
      return "red";
    } else if (val === 0) {
      return "black";
    }
  };

  const getPriceArrow = (val) => {
    if (val === undefined) {
      return "- ";
    } else if (val > 0) {
      return "↑";
    } else if (val < 0) {
      return "↓";
    } else if (val === 0) {
      return "";
    }
  };

  return (
    <PriceContainer>
      {
        <PriceWrapper>
          <CurrentPrice>
            <h3>
              Current Price : {priceData?.quotes.USD.price.toFixed(2) ?? 0} USD
            </h3>
          </CurrentPrice>
          <PercentChange>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_1y),
              }}
            >
              {" "}
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_1y)}
              </span>
              <span>1 Year : {priceData?.quotes.USD.percent_change_1y}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_30d),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_30d)}
              </span>
              <span>1 Month : {priceData?.quotes.USD.percent_change_30d}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_7d),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_7d)}
              </span>
              <span>1 Week : {priceData?.quotes.USD.percent_change_7d}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_24h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_24h)}
              </span>
              <span>1 Day : {priceData?.quotes.USD.percent_change_24h}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_12h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_12h)}
              </span>
              <span>
                12 Hours : {priceData?.quotes.USD.percent_change_12h}%
              </span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_6h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_6h)}
              </span>
              <span>6 Hours : {priceData?.quotes.USD.percent_change_6h}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_1h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_1h)}
              </span>
              <span>1 Hour : {priceData?.quotes.USD.percent_change_1h}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_30m),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_30m)}
              </span>
              <span>30 Min : {priceData?.quotes.USD.percent_change_30m}%</span>
            </PercentItems>
          </PercentChange>
        </PriceWrapper>
      }
    </PriceContainer>
  );
}
