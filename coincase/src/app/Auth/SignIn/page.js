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

function SignIn() {
  const { isLoading, authUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
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
    if (authUser && !isLoading) {
      redirect("/dashboard/home");
    }
  }, [isLoading, authUser]);

  const handleShow = () => setShowPassword(!showPassword);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsButtonPressed(true);
    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter your email and password");
      return;
    }
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        //console.log(userCredential);
        // Logged in, navigate to dashboard
        setErrorMsg("");
      })
      .catch((error) => {
        console.log(error);
        // Issue logging in, display error code
        setIsButtonPressed(true);
        setErrorMsg("Invalid Credentials");
      });
  };

  return (
    <Flex>
      <Container>
        <Text
          bgGradient="radial(#FF0080, #b742ff)"
          bgClip="text"
          textAlign="center"
          fontSize="5xl"
          fontWeight="bold"
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
          <CardHeader>
            <Heading
              bgGradient="linear(to-r, #FF0080, #b742ff)"
              bgClip="text"
              fontWeight="bold"
              textAlign="center"
            >
              Welcome back!
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
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                  onChange={handleInput}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="#FF0080" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
                <InputRightElement>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShow}
                    color="#FF0080"
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
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
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </VStack>
          </FormControl>
          <br />
          <Text>
            Don&apos;t have an account?{""}
            <Link href="/Auth/SignUp" color="#b742ff">
              {" "}
              Create one.
            </Link>
            <br />
            Forgot Password?
            <Link href="/Auth/ForgotPassword" color="#b742ff">
              {" "}
              Click Here.
            </Link>
          </Text>
        </Card>
      </Container>
    </Flex>
  );
}

export default SignIn;
