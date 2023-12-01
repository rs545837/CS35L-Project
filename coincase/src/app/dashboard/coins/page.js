"use client";
import { useQuery } from "react-query";
import Link from "next/link";
import { fetchCoins } from "../../api";
import { CoinPrice } from "./[coinId]/page";
import { styled } from "styled-components";
import Balance from "../home/balance";
import { coinPrices } from "../../../../static/coinPrices";
import { coinName } from "../../../../static/coinName";

const Row = styled.div`
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 60px;

  align-items: center;
`;

const Div = styled.div`
  text-align: center;
  overflow: overlay;
  padding: 0;
  color: style= {
    !isLoggedIn ? {
      color: "black !important";
    }
    : {
      color: "white";
    }
  }
  display: flex;
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
  transition: 300ms all;
`;

const Button = styled.button`
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export default function CoinList({ isLoggedIn }) {
  let data = coinName;
  const { isLoading, data: datafetched } = useQuery("allCoins", fetchCoins);

  if (!isLoading) {
    data = datafetched;
  }
  console.log(datafetched);
  console.log(data);
  return (
    <>
      <div>
        {isLoggedIn ? <Balance user="user" data={data} /> : null}
        <Row>
          <Div>Name</Div>
          <Div>Price</Div> <Div>Change</Div> <Div>Market Cap</Div>
          {isLoggedIn ? (
            <Link
              href="/dashboard/trade"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button style={{ backgroundColor: "blue" }}>Buy</Button>
            </Link>
          ) : null}
        </Row>
        {data?.slice(0, 10).map((item) => (
          <Row key={item.id}>
            <Div>
              <CoinImg
                src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
              />
              <NameDiv>
                <Div>{item.name}</Div>
                <Div>{item.symbol}</Div>
              </NameDiv>
            </Div>
            <Div
              style={
                !isLoggedIn ? { color: "black !important" } : { color: "white" }
              }
            >
              <CoinPrice params={item.id} type="price" rank={item.rank} />
            </Div>
            <Div>
              <CoinPrice params={item.id} type="change" rank={item.rank} />
            </Div>
            <Div>
              <CoinPrice params={item.id} type="cap" rank={item.rank} />
            </Div>

            {isLoggedIn ? (
              <Button style={{ backgroundColor: "gray" }}>
                <Link href={`/dashboard/coins/${item.id}`}>Buy</Link>
              </Button>
            ) : null}
          </Row>
        ))}
      </div>
    </>
  );
}
