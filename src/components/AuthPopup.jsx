import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Spinner,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import HeadingText from "./TextElements/Heading";
import { AiOutlineCloseCircle } from "react-icons/ai";
import BodyText from "./TextElements/BodyText";
import PryBtn from "./UiElements/PryBtn";
import { authenticateUser } from "../App";
import { toast } from "react-toastify";

function AuthPopup({ dispatch, error, loading, closePopup }) {
  const [email, setEmail] = useState("");
  const [verifyAccount, setVerifyAccount] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleAuth = async () => {
    const res = await authenticateUser(email, dispatch);

    if (!res.auth) {
      toast.error("Authentication failed");
    } else {
      if (!res.user.verified) {
        setVerifyAccount(true);
        toast.success(
          "We have sent you a mail to verify your account, verify your account to continue..."
        );
      } else {
        toast.success("Authentication successful");
        closePopup();
      }
    }
  };

  const closeAuthPopup = () => {
    setVerifyAccount(false);
    closePopup();
  };

  return (
    <Box
      style={{
        backgroundColor: "#fff",
        padding: 30,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {!verifyAccount ? (
        <Box>
          <Flex justifyContent={"space-between"}>
            <HeadingText color={"#000"} px={["10px", "10px", "0"]}>
              Enter your email to get started{" "}
            </HeadingText>
            <Icon
              onClick={closePopup}
              as={AiOutlineCloseCircle}
              fontSize={"30px"}
              color={"#F602CA"}
            />
          </Flex>
          <Box pb={6} mt={"15px"}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width={["90%", "90%", "50%"]}
                border={"1px solid #ccc"}
                outline={"none"}
                appearance={"none"}
              />
              {error && (
                <BodyText fontSize={"12px"} color={"red"} mr={"20px"}>
                  {error}
                </BodyText>
              )}
            </FormControl>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <PryBtn colorScheme="blue" mr={3} onClick={handleAuth}>
              {loading ? <Spinner /> : "Get started"}
            </PryBtn>
          </Box>
        </Box>
      ) : (
        <Box>
          <BodyText color={"#000"}>
            We have sent you an email to verify your account.
          </BodyText>
          <BodyText color={"#000"}>Verify your email to continue</BodyText>
          <Box display={"flex"} mt={"50px"} justifyContent={"space-between"}>
            <PryBtn colorScheme="blue" mr={3} onClick={closeAuthPopup}>
              Okay
            </PryBtn>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AuthPopup;
