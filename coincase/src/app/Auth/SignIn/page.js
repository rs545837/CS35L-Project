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
} from "@chakra-ui/react";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ViewIcon, ViewOffIcon, PhoneIcon, EmailIcon,LockIcon } from "@chakra-ui/icons";

import { Link } from "@chakra-ui/next-js";
import { redirect } from "next/navigation";
import { useAuth } from "../AuthContext";
import { motion } from "framer-motion";

function SignIn() {
  const { isLoading, authUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (authUser && !isLoading) {
      redirect("/dashboard/home");
    }
  }, [isLoading, authUser]);

  const handleShow = () => setShowPassword(!showPassword);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isValidPassword = (password) => {
    const metRequirements = checkPasswordRequirements(password);
    return metRequirements.every((req) => req);
  };

  const handleSignIn = () => {
    console.log(formData.email);
    console.log(formData.password);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        //console.log(userCredential);
        // Logged in, navigate to dashboard
        setError(false);
        setErrorMsg("");
      })
      .catch((error) => {
        console.log(error);
        // Issue logging in, display error code
        setError(true);
        setErrorMsg("Invalid Credentials");
      });
  };

  return (
    <div>
      <Container w="750px" centerContent>
        <h1>Sign In</h1>
        <FormControl>
          <VStack spacing={5}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="pink.300" />
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
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="pink.300" />
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
                  color="pink.300"
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Center>
              <Button
                as={motion.button}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"#"}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#F687B3",
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Center>
            <Center>
              {isError && (
                <Alert status="error" colorScheme="pink">
                  <AlertIcon />
                  <AlertTitle>{errorMsg}</AlertTitle>
                </Alert>
              )}
            </Center>
          </VStack>
        </FormControl>
        <Text>
          Don't have an account?{""}
          <Link href="/Auth/SignUp" color="pink.300">
            {" "}
            Create one.
          </Link>
        </Text>
      </Container>
    </div>
  );
}

export default SignIn;
