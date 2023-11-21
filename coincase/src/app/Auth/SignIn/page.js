"use client";

import { React, useState } from "react";
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
} from "@chakra-ui/react";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ViewIcon, ViewOffIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";

import { Link } from "@chakra-ui/next-js";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFocus = () => {
    if (!focusPassword) {
      setFocusPassword(true);
    }
  };
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
        console.log(userCredential);
        // Logged in, navigate to dashboard
      })
      .catch((error) => {
        console.log(error);
        // Issue logging in, display error code
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
              <Button onClick={handleSignIn} colorScheme="pink">
                Sign In
              </Button>
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
