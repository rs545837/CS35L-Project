/** @format */
"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@/app/components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../Auth/ProtectedRoute";
import { AuthUserProvider } from "../Auth/AuthContext";

export default function dashboard({ children }) {
  return (
    <Wrapper>
      <AuthUserProvider>
        <ProtectedRoute>
          <Sidebar />
          <MainContainer>
            <Header />
            <Section>{children}</Section>
          </MainContainer>
        </ProtectedRoute>
      </AuthUserProvider>
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

const Section = styled.div`
  padding: 1rem;
  margin: 1rem;
`;
