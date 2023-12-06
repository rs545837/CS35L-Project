"use client";
// Chakra UI Imports ;
import { Box, Flex } from "@chakra-ui/react";

// Saas UI Imports ;
import {
  Persona,
  Form,
  FormLayout,
  Field,
  SubmitButton,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from "@saas-ui/react";

import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { auth } from "@/app/firebase";

import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, updatePassword } from "firebase/auth";

export const UserSettings = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(0);

  const [user, setUser] = useState(null);

  const buttonStyles = {
    ...(isButtonEnabled
      ? {
          color: "#fff", // White text for enabled state
          background: "linear-gradient(to right, #FF0080, #b742ff)",
        }
      : {
          backgroundColor: "#e0e0e0", // Light gray for disabled state
          color: "#a0a0a0", // Light gray text for disabled state
          cursor: "not-allowed", // Change cursor to not-allowed for disabled state
        }),
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

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated");
        setUser(user);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => listen();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(user.email);
        setWalletAddress(data.wallet_address);
      } else {
        console.log(user.uid + ": No such document!");
      }
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsMatch(e.target.value === confirmPassword);

    if (e.target.value === confirmPassword) {
      setIsButtonEnabled(isValidPassword(e.target.value));
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatch(e.target.value === password);

    console.log(isValidPassword(e.target.value));

    if (e.target.value === password) {
      setIsButtonEnabled(isValidPassword(e.target.value));
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await updatePassword(user, password);
      setPassword("");
      setConfirmPassword("");
      setPasswordChanged(1);
    } catch (error) {
      setPasswordChanged(2);
    }
  };

  return (
    <>
      <Box padding="8">
        <Flex alignItems="start" marginBlock="4">
          <Persona>
            <PersonaAvatar name={firstName + " " + lastName} marginRight={3} />
            <PersonaDetails>
              <PersonaLabel>{firstName + " " + lastName}</PersonaLabel>
              <PersonaSecondaryLabel>Basic User</PersonaSecondaryLabel>
            </PersonaDetails>
          </Persona>
        </Flex>

        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="firstName"
              label="First Name"
              value={firstName}
              width="20.5em"
              cursor="not-allowed"
            />
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="lastName"
              label="Last Name"
              value={lastName}
              width="20.5em"
              cursor="not-allowed"
            />
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="email"
              label="Email"
              value={email}
              type="email"
              width="20.5em"
              cursor="not-allowed"
            />
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="wallet_address"
              label="Wallet Address"
              value={walletAddress}
              type="password"
              width="20.5em"
              cursor="not-allowed"
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="password"
              label=" New Password"
              value={password}
              width="18em"
              rules={{ required: true }}
              onChange={handlePasswordChange}
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              width="18em"
              rules={{ required: true }}
              onChange={handleConfirmPasswordChange}
            />
            {!isMatch && <p className="highlight">Passwords do not match</p>}
            {!isButtonEnabled && (
              <div>
                <p>Password must:</p>
                <ul style={{ marginLeft: "25px" }}>
                  <li>Be at least 8 character long</li>
                  <li>Have 1 upper case letter</li>
                  <li>Have 1 lpper case letter</li>
                  <li>Have 1 special symbol (!@#$%^&*)(+=._-)</li>
                </ul>
              </div>
            )}

            {passwordChanged == 1 && (
              <p style={{ color: "#4caf50" }}>Successfully changed password</p>
            )}
            {passwordChanged == 2 && (
              <p style={{ color: "red" }}>
                Error changing password, Trying logging out and logging back in
              </p>
            )}
            <SubmitButton marginBlockStart="10px" style={buttonStyles}>
              Save
            </SubmitButton>
          </FormLayout>
        </Form>
      </Box>
    </>
  );
};
