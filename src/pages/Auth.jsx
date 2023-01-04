import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { baseUrl } from "../config";
import { DataContext } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BodyText from "../components/TextElements/BodyText";
import HeadingText from "../components/TextElements/Heading";
import PryBtn from "../components/UiElements/PryBtn";

function Auth(props) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [verifyAccount, setVerifyAccount] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.email);
      dispatch({
        type: "SIGNUP",
        payload: data.data,
      });
      if (data.data.verified) {
        setVerifyAccount(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      setLoading(true);
    }
  };

  const signup = async () => {
    if (!isEmail(email)) toast.error("Please input a valid email");

    if (!fullName) toast.error("Please input a valid name");

    if (password < 7) toast.error("password must be at least 7 characters");

    try {
      setLoading(true);

      const { data } = await axios.post(`${baseUrl}/auth/signup`, {
        email: email,
        fullName: fullName,
        password: password,
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.email);
      dispatch({
        type: "SIGNUP",
        payload: data.data,
      });
      if (data.data.verified) {
        setVerifyAccount(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        console.log(error.response.data.message);

        dispatch({ type: "ERROR", payload: error.response.data.message });
      } else {
        dispatch({ type: "ERROR", payload: error.message });
      }
      dispatch({ type: "LOADING", payload: false });
    }
  };

  if (verifyAccount) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        h={"100vh"}
      >
        <svg
          className=""
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>

        <HeadingText color={"#fff"}>
          Your account has not been verified
        </HeadingText>
        <BodyText color={"#fff"}>
          We have sent you a mail to the email you registered with to verifyyour
          account
        </BodyText>
        <BodyText color={"#fff"}>
          Verify your account and get 3 free trials{" "}
        </BodyText>
      </Flex>
    );
  }

  return (
    <Box color={"#fff"} h={"100vh"}>
      <Box>
        <Flex py={"20px"}>
          {isAuth ? (
            <HeadingText color={"#fff"} px={["10px", "10px", "0"]}>
              Login to continue....
            </HeadingText>
          ) : (
            <HeadingText color={"#fff"} px={["10px", "10px", "0"]}>
              Create an account to get started
            </HeadingText>
          )}
        </Flex>
        <Box>
          {!isAuth && (
            <Box pb={6} mt={"15px"} w={"100%"}>
              <FormControl
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  border={"1px solid #ccc"}
                  outline={"none"}
                  appearance={"none"}
                  w={["100%", "100%", "80%"]}
                />
              </FormControl>
            </Box>
          )}
          <Box pb={6} mt={"15px"}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                w={["100%", "100%", "80%"]}
                border={"1px solid #ccc"}
                outline={"none"}
                appearance={"none"}
              />
            </FormControl>
          </Box>
          <Box pb={6} mt={"15px"}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                w={["100%", "100%", "80%"]}
                border={"1px solid #ccc"}
                outline={"none"}
                appearance={"none"}
              />
            </FormControl>
          </Box>
        </Box>

        {isAuth ? (
          <Flex flexDirection={"column"} mt={"30px"}>
            <PryBtn
              colorScheme="blue"
              mr={3}
              onClick={login}
              w={["100%", "100%", "80%"]}
            >
              {loading ? <Spinner /> : " Login"}
            </PryBtn>
            <Flex mt={"30px"}>
              <BodyText color={"#fff"}>Dont have an account? </BodyText>{" "}
              <BodyText
                pl={"10px"}
                onClick={() => setIsAuth(false)}
                color={"#F602CA"}
                textDecoration={"underline"}
                cursor={"pointer"}
              >
                Signup
              </BodyText>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection={["column"]} mt={"30px"}>
            <PryBtn
              colorScheme="blue"
              mr={3}
              onClick={signup}
              w={["100%", "100%", "80%"]}
            >
              {loading ? <Spinner /> : "Get started"}
            </PryBtn>
            <Flex mt={"30px"}>
              <BodyText color={"#fff"}>Already have an account? </BodyText>{" "}
              <BodyText
                pl={"10px"}
                onClick={() => setIsAuth(true)}
                color={"#F602CA"}
                textDecoration={"underline"}
                cursor={"pointer"}
              >
                Login
              </BodyText>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default Auth;
