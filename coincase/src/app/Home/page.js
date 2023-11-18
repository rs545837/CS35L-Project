/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "../coins/page";
import Coin from "../coins/[coinId]/page";
import Header from "../components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Setting from "../Setting/page";
import Wallet2 from "../Wallet2/page";
import Trade from "../Trade/page";

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

  const DynamicComponent = titleComponentMap[clickedTitle];
  return (
    <Wrapper>
      <Sidebar onItemClick={handleNavItemClick} />
      <MainContainer>
        <Header title={clickedTitle} />
        <QueryClientProvider client={queryClient}>
          {DynamicComponent && <DynamicComponent />}
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
