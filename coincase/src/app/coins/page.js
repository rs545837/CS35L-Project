/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CoinList from "@/app/dashboard/coins/page";
import Header from "../header";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider
      client={queryClient}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header />
      <CoinList isLoggedIn={false} />
    </QueryClientProvider>
  );
}
