import { useState } from "react";
import styled from "styled-components";
import CoinbaseLogo from "../../../assets/cb-logo.png";
import Image from "next/image";

import { navItems } from "../../../static/navItems";
import Link from "next/link";
import { Text } from "@chakra-ui/react";


const Sidebar = ({ onItemClick }) => {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title);

  return (
    <Wrapper>
      <LogoContainer>
        <Link
          href="/"
          onClick={() => {
            setActiveIcon("Home");
          }}
        >
          <Text
          bgGradient="radial(#FF0080, #b742ff)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
          textAlign="center"
        >
          Coincase
        </Text>
          {/* <Logo>
            <Image src={CoinbaseLogo} alt="Coinbase Logo" />
          </Logo> */}
        </Link>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map((item) => (
          <Link
            href={
              item.title === "dashboard/home"
                ? "/"
                : `/dashboard/${item.title.toLowerCase()}`
            }
            key={item.title}
          >
            <NavItem
              key={item.title}
              onClick={() => {
                setActiveIcon(item.title);
              }}
            >
              <NavIcon
                style={{ color: item.title === activeIcon && "#3773f5" }}
              >
                {item.icon}
              </NavIcon>
              <NavTitle>{item.title}</NavTitle>
            </NavItem>
          </Link>
        ))}
      </NavItemsContainer>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  height: calc(100vh);
  border-right: 1px solid #282b2f;
  width: calc(22rem - 16px - 16px);
  /* TRouBLe */
  padding: 0 1rem;
`;
const LogoContainer = styled.div`
  /* TRouBLe */
  margin: 1.5rem 0;
`;

const Logo = styled.div`
  width: 44%;
  object-fit: contain;
  margin-left: 1.5rem;
`;

const NavItemsContainer = styled.div`
  margin-top: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 4rem;

  &:hover {
    background-color: gray;
  }
`;

const NavIcon = styled.div`
  border: 1px solid black;
  padding: 0.7rem;
  border-radius: 50%;
  margin: 0 1rem;
  display: grid;
  place-items: center;
`;

const NavTitle = styled.div``;
