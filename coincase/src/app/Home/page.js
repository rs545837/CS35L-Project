/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "../coins/page";
import Coin from "../coins/[coinId]/page";
import Header from "../components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <>
      <Wrapper>
        <Sidebar />
        <MainContainer>
          <Header />
        </MainContainer>
      </Wrapper>
      <Wrapper></Wrapper>
      <QueryClientProvider client={queryClient}>
        <CoinList />
      </QueryClientProvider>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`;

const MainContainer = styled.div`
  flex: 1;
`;
