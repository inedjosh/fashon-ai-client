import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useContext } from "react";
import { baseUrl } from "../config";
import BodyText from "./TextElements/BodyText";
import PryBtn from "./UiElements/PryBtn";
import isEmail from "validator/lib/isEmail";
import Header from "./Header";
import { DataContext } from "../store/store";
import { authenticateUser } from "../App";
import { toast } from "react-toastify";

function NoUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { state, dispatch } = useContext(DataContext);
  const { error } = state;

  return (
    <Box h={"100vh"}>
      <Header title="hello" link="/profile" />
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"90vh"}
      >
        <BodyText py={"20px"}>No user is logged in.</BodyText>
        <PryBtn onClick={onOpen}>Login Now</PryBtn>
      </Flex>
    </Box>
  );
}

export default NoUser;
