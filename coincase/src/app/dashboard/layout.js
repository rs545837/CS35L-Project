/** @format */
"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@/app/components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function dashboard({ children }) {
  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header />
        <Section>{children}</Section>
      </MainContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: white;
  color: black;
`;

const MainContainer = styled.div`
  flex: 1;
`;

const Section = styled.div`
  padding: 1rem;
  margin: 1rem;
`;
