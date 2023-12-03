import React from "react";
import styled from "styled-components";
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import { redirect } from "next/navigation";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const Header = ({ title }) => {
  function handleSignOut() {
    let success = false; // Using this to prevent an error
    signOut(auth).then(() => {
        // Sign-out successful.
        success = true;
    }).catch((error) => {
        // An error happened.
        redirect("/Auth/SignIn")
    });

    if (success) {
      redirect("/Auth/SignIn")
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <Wrapper>
      <Title>
      {title}
      </Title>
      <ButtonsContainer>
        <motion.div className="box"
      whileHover={{ scale: [null, 1.5, 1.4] }}
      transition={{ duration: 0.3 }}>
        <Button style={{ backgroundColor: "radial(#FF0080, #b742ff)", color: "#000" }} onClick={handleSignOut}>Sign Out</Button>
        </motion.div>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: calc(100% - 3rem);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
`;
const ButtonsContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  border: 2px solid #282b2f;
  padding: 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
