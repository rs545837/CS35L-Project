/** @format */
"use client";
import { useState } from "react";

export default function usePasswordMatch() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatch(e.target.value === password);
  };

  return {
    password,
    confirmPassword,
    isMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
}
