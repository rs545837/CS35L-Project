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
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import {
  InfoOutlineIcon,
  CheckIcon,
  NotAllowedIcon,
  ViewIcon,
  ViewOffIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
  LockIcon,
} from "@chakra-ui/icons";

import { BsFillPersonVcardFill } from "react-icons/bs";
// import Link from "next/link";
import { Link } from "@chakra-ui/next-js";

import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";


function SignUp() {
  const { isLoading, authUser } = useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
  });
  const [isError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (authUser && !isLoading) {
        redirect("/dashboard/Home")
    }
  }, [isLoading, authUser])

  const handleFocus = () => {
    if (!focusPassword) {
      setFocusPassword(true);
    }
  };
  const handleShow = () => setShowPassword(!showPassword);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "password" && e.target.value !== "") {
      setFocusPassword(true);
    } else if (e.target.name == "password" && e.target.value === "") {
      setFocusPassword(false);
    }
  };

  const checkPasswordRequirements = (password) => {
    const requirements = [
      /.{8,}/, // Minimum length of 8 characters
      /[A-Z]/, // Contains an uppercase letter
      /[a-z]/, // Contains a lowercase letter
      /[0-9]/, // Contains a number
      /[!@#\$%\^\&*\)\(+=._-]/, // Contains a special character
    ];

    return requirements.map((regex) => regex.test(password));
  };

  const isValidInput = (email, password, firstName, lastName, dateOfBirth) => {
    let validPassword = checkPasswordRequirements(password).every((req) => req);
    // TODO: implement logic for validating input
    return true
  };

  const createUserInUsersCollection = async (user) => {
    // This is for creating the user in firestore on sign-up
    try {
        await setDoc(doc(db, "users", user.uid), {
            first_name: formData.firstName,
            last_name: formData.lastName,
            balance: 0,
            date_of_birth: Timestamp.fromDate(new Date(formData.dateOfBirth)),
            wallet: {
              btc: 0,
              eth: 0,
              usdt: 0,
              bnb: 0,
              xrp: 0,
              usdc: 0,
              sol: 0,
              steth: 0,
              ada: 0,
              doge: 0,
            },
            transaction_history: [],
        })
    } catch (err) {
        // TODO: Figure out how to handle this error
    }
  }

  const handleSignUp = () => {
    if (!isValidInput()) {
      // do not proceed, display error message
      // set error message...
      return
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            setError(false)
            setErrorMsg("")
            // Signed up
            const user = userCredential.user;
            
            const promise = createUserInUsersCollection(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setError(true)
            setErrorMsg("Error Creating Account")
        });
  }

  return (
    <div>
      <Container w="750px" centerContent>
        <h1>Create An Account!</h1>
        <FormControl>
          <VStack spacing={5}>
            <HStack spacing={2} divider={<StackDivider />}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsFillPersonVcardFill} color="pink.300" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleInput}
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsFillPersonVcardFill} color="pink.300" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleInput}
                  _placeholder={{ opacity: 0.8, color: "gray.500" }}
                  focusBorderColor="pink.400"
                />
              </InputGroup>
            </HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CalendarIcon color="pink.300" />
              </InputLeftElement>
              <Input
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                variant="flushed"
                onChange={handleInput}
                _placeholder={{ opacity: 0.8, color: "gray.500" }}
                focusBorderColor="pink.400"
              />
            </InputGroup>
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
            <Collapse in={focusPassword} animateOpacity>
              <Box>
                <List spacing={1}>
                  <ListItem>
                    <ListIcon
                      as={
                        checkPasswordRequirements(formData.password)[0]
                          ? CheckIcon
                          : NotAllowedIcon
                      }
                      color={
                        checkPasswordRequirements(formData.password)[0]
                          ? "green.500"
                          : "red.500"
                      }
                    />
                    At least 8 characters
                  </ListItem>
                  <ListItem>
                    <ListIcon
                      as={
                        checkPasswordRequirements(formData.password)[1]
                          ? CheckIcon
                          : NotAllowedIcon
                      }
                      color={
                        checkPasswordRequirements(formData.password)[1]
                          ? "green.500"
                          : "red.500"
                      }
                    />
                    At least 1 uppercase letter
                  </ListItem>
                  <ListItem>
                    <ListIcon
                      as={
                        checkPasswordRequirements(formData.password)[2]
                          ? CheckIcon
                          : NotAllowedIcon
                      }
                      color={
                        checkPasswordRequirements(formData.password)[2]
                          ? "green.500"
                          : "red.500"
                      }
                    />
                    At least 1 lowercase character
                  </ListItem>
                  <ListItem>
                    <ListIcon
                      as={
                        checkPasswordRequirements(formData.password)[3]
                          ? CheckIcon
                          : NotAllowedIcon
                      }
                      color={
                        checkPasswordRequirements(formData.password)[3]
                          ? "green.500"
                          : "red.500"
                      }
                    />
                    At least 1 number
                  </ListItem>
                  <ListItem>
                    <ListIcon
                      as={
                        checkPasswordRequirements(formData.password)[4]
                          ? CheckIcon
                          : NotAllowedIcon
                      }
                      color={
                        checkPasswordRequirements(formData.password)[4]
                          ? "green.500"
                          : "red.500"
                      }
                    />
                    At least 1 special character
                  </ListItem>
                </List>
              </Box>
            </Collapse>
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
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Center>
            <Center>
              {isError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{errorMsg}</AlertTitle>
                </Alert>
              )}
            </Center>
          </VStack>
        </FormControl>
        <Text>
          Already have an account?{""}
          <Link href="/Auth/SignIn" color="pink.300">
            {" "}
            Sign in.
          </Link>
        </Text>
      </Container>
    </div>
  );
}

export default SignUp;
