/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Coin from "@/app/coins/[coinId]/coin";
import CoinList from "@/app/coins/page";
import Header from "@/app/components/Header";
import styled from "styled-components";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import Setting from "../setting/page";
import Wallet2 from "../wallet2/page";
import Trade from "../trade/page";

export default function Home() {
  const queryClient = new QueryClient();
  const [clickedTitle, setClickedTitle] = useState(null);

  const handleNavItemClick = (title) => {
    console.log(`NavItem clicked: ${title}`);
    setClickedTitle(title);
  };

  // Map between titles and corresponding components
  const titleComponentMap = {
    Home: CoinList,
    Setting: Setting,
    Wallet2: Wallet2,
    Trade: Trade,
    // Add more mappings as needed
  };

  return (
    <Wrapper>
      <Sidebar onItemClick={handleNavItemClick} />
      <MainContainer>
        <Header />
        <QueryClientProvider client={queryClient}>
          <CoinList />
        </QueryClientProvider>
      </MainContainer>
    </Wrapper>
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
