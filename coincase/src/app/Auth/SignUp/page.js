"use client";

import { React, useState, useEffect,useRef } from "react";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  useToast,
  Spacer,
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
import { Link } from "@chakra-ui/next-js";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { BsBank2 } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdRocketLaunch } from "react-icons/md";

function SignUp() {
  const { isLoading, authUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
  });
  const toast = useToast();
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const passwordRequirementsRef = useRef(null);


  useEffect(() => {
    if (focusPassword) {
      passwordRequirementsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [focusPassword]);

  useEffect(() => {
    if (authUser && !isLoading) {
      redirect("/dashboard/Home");
    }
  }, [isLoading, authUser]);

  const getErrorMessage = (error) => {
    if (error.includes("email-already-in-use")) {
      return "The email address is already in use by another account.";
    } else if (
      error.includes("user-not-found") ||
      error.includes("wrong-password")
    ) {
      return "Incorrect username or password. Please try again.";
    } else if (error.includes("invalid-email")) {
      return "Please enter a valid email address.";
    } else if (error.includes("too-many-requests")) {
      return "Too many unsuccessful login attempts. Please try again later.";
    } else if (error.includes("user-disabled")) {
      return "User account has been disabled.";
    } else {
      return "An error occurred. Please try again later.";
    }
  };
  const handleShow = () => setShowPassword(!showPassword);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
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

  const isValidPassword = (password) => {
    return checkPasswordRequirements(password).every((req) => req);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsButtonPressed(true);
    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter your email and password");
      return;
    }
    if (!isValidPassword(formData.password)) {
      setErrorMsg("Password is not valid. Please try again.");
      return;
    }

    if (!formData.dateOfBirth) {
      setErrorMsg("Please enter your date of birth.");
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      setErrorMsg("Please enter your first name and last name");
      return;
    }

    setIsButtonPressed(false);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const usersCollection = collection(db, "users");
      const userDocRef = doc(usersCollection, response.user.uid);
      try {
        await setDoc(doc(db, "users", response.user.uid), {
          first_name: formData.firstName,
          last_name: formData.lastName,
          balance: 1000,
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
        });
        console.log("Document written with ID: ", userDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      console.log(response.user);
    } catch (err) {
      setErrorMsg(getErrorMessage(err.message));
      console.error(err.message);
    }
  };

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

      setErrorMsg("");
    }
  }, [errorMsg, isButtonPressed, toast]);

  return (
    <Box>
      <Flex>
        <Box padding={10}>
          <List spacing={100}>
            <ListItem>
              <ListIcon as={MdRocketLaunch} color="#FF0080" />
              Get Started Quickly
              <Text fontSize="sm" color="gray.600">
                Start your journey quickly with our seamless and user-friendly
                onboarding process.
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={AiFillSafetyCertificate} color="#FF0080" />
              Secure Crypto Trading
              <Text fontSize="sm" color="gray.600">
                Trade cryptocurrencies with confidence using our advanced
                security measures and robust trading platform.
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BiLineChart} color="#FF0080" />
              Navigate Market Trends
              <Text fontSize="sm" color="gray.600">
                Stay ahead in the crypto market by analyzing real-time data and
                navigating the latest trends effortlessly.
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BsBank2} color="#FF0080" />
              Embrace the Future of Currency
              <Text fontSize="sm" color="gray.600">
                Join the revolution and explore the future of currency with our
                innovative financial solutions.
              </Text>
            </ListItem>
          </List>
        </Box>
        <Container
          w="1000px"
          centerContent
          bgGradient="linear(to-r, #FFFFFF, #FF0080,#b742ff,#FFFFFF)"
          h="100%"
          overflow="hidden"
        >
          <Card
            size="lg"
            variant="elevated"
            padding={30}
            margin={2}
            align="center"
          >
            <CardHeader>
              <Heading
                bgGradient="linear(to-r, #FF0080, #b742ff)"
                bgClip="text"
                fontWeight="bold"
              >
                Create your Coincase account!
              </Heading>
            </CardHeader>
            <FormControl>
              <VStack spacing={50}>
                <HStack spacing={5} divider={<StackDivider />}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={BsFillPersonVcardFill} color="#FF0080" />
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
                      <Icon as={BsFillPersonVcardFill} color="#FF0080" />
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
                    <CalendarIcon color="#FF0080" />
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
                <Collapse in={focusPassword}>
                  <Box ref={passwordRequirementsRef}>
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
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </VStack>
            </FormControl>

            <Text>
              Already have an account?{""}
              <Link href="/Auth/SignIn" color="#b742ff">
                {" "}
                Sign in.
              </Link>
            </Text>
          </Card>
        </Container>
      </Flex>
    </Box>
  );
}
export default SignUp;
