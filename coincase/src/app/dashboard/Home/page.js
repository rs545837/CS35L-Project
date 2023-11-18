/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Coin from "@/app/coins/[coinId]/coin";
import CoinList from "@/app/coins/page";
import Header from "@/app/components/Header";
import styled from "styled-components";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import Setting from "../settings/page";
import Wallet2 from "../wallet2/page";
import Trade from "../trade/page";

export default function home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CoinList />
    </QueryClientProvider>
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
