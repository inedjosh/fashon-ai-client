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

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleAuth = async () => {
    const res = await authenticateUser(email, dispatch);

    if (!res) {
      toast.error("Authentication failed");
    } else {
      toast.success("Authentication successful");
      closePopup();
    }
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
  );
}

export default AuthPopup;
