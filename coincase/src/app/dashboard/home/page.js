/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "@/app/dashboard/coins/page";
import styled from "styled-components";

export default function home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CoinList isLoggedIn={true} />
    </QueryClientProvider>
  );
}
