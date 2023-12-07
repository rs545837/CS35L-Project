/** @format */

/** @format */

"use client";

import { React, useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Container,
  Collapse,
  Box,
  List,
  ListIcon,
  ListItem,
  HStack,
  VStack,
  Divider,
  Center,
  StackDivider,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  InputLeftAddon,
  Icon,
  AbsoluteCenter,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Card,
  CardHeader,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "@/app/components/logo";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import {
  ViewIcon,
  ViewOffIcon,
  PhoneIcon,
  EmailIcon,
  LockIcon,
} from "@chakra-ui/icons";

import { Link } from "@chakra-ui/next-js";
import { redirect } from "next/navigation";
import { useAuth } from "../AuthContext";
import { motion } from "framer-motion";
import LogoRepeat from "@/app/components/logoRepeating";

function ResetPassword() {
  const { isLoading, authUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const toast = useToast();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    if (errorMsg && isButtonPressed) {
      toast({
        title: `${errorMsg}`,
        position: "bottom",
        isClosable: true,
        status: "error",
        duration: 2500,
        colorScheme: "pink",
      });
      setIsButtonPressed(false);
      setErrorMsg("");
    }
  }, [errorMsg, isButtonPressed, toast]);

  useEffect(() => {
    if (successMsg) {
      toast({
        title: `${successMsg}`,
        position: "bottom",
        isClosable: true,
        status: "success",
        duration: 3500,
        colorScheme: "green",
      });

      setSuccessMsg("");
    }
  }, [successMsg]);

  useEffect(() => {
    if (authUser && !isLoading) {
      redirect("/dashboard/home");
    }
  }, [isLoading, authUser]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const triggerResetEmail = async () => {
    setIsButtonPressed(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setSuccessMsg("Password reset email sent");
      console.log("Password reset email sent");
      // alert("Check your email for further instructions");
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid email address");
      // alert("Invalid email address");
    }
  };

  return (
    <Flex>
      <Container>
        <Text
          bgGradient="radial(#FF0080, #b742ff)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
          textAlign="center"
        >
          <Link href="/">Coincase</Link>
        </Text>
        <LogoRepeat />
      </Container>
      <Container
        w="40%"
        centerContent
        bgGradient="linear(to-r, #FFFFFF, #FF0080,#b742ff,#FFFFFF)"
        h="97vh"
        overflow="hidden"
      >
        <Card
          size="lg"
          variant="elevated"
          padding={50}
          margin={1.5}
          align="center"
          w="100%"
          h="100%"
        >
          <br />
          <br />
          <br />
          <br />
          <CardHeader>
            <Heading
              bgGradient="linear(to-r, #FF0080, #b742ff)"
              bgClip="text"
              fontWeight="bold"
              textAlign="center"
            >
              Enter Your Email!
            </Heading>
          </CardHeader>
          <FormControl>
            <VStack spacing={70}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="#FF0080" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>

              <Button
                as={motion.button}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#FF0080"}
                href={"#"}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#e00071",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={triggerResetEmail}
              >
                Submit
              </Button>
            </VStack>
          </FormControl>
          <br />
        </Card>
      </Container>
    </Flex>
  );
}

export default ResetPassword;
