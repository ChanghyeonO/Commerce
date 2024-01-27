import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import LoginComponent from "../../components/LoginComponent/LoginCompontent";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, "test@test.com", "12341234");
  }, []);
  return (
    <>
      <Header />
      <LoginComponent />
    </>
  );
};

export default Login;
