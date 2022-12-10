import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import BodyText from "../components/TextElements/BodyText";
import {
  useParams,
  useLocation,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { DataContext } from "../store/store";
import PryBtn from "../components/UiElements/PryBtn";
import { baseUrl } from "../config";
import axios from "axios";

function Payments(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const email = params.get("email");

  // verify the payment from the front end
  const verifyPayment = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      console.log(`${baseUrl}/subscribe/verify`);
      const { data } = await axios.get(`${baseUrl}/subscribe/verify`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(data);

      if (data.data.status === "success") navigate("/profile"); //naviagte user to profile page is verification passed
    } catch (error) {
      console.log(error);

      setError(error.data.message);
    }
  };

  if (email !== auth.email) {
    return (
      <Box h={"100vw"}>
        <Flex
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Spinner />
          <BodyText>Authenticating payment</BodyText>
        </Flex>
      </Box>
    );
  }

  return (
    <Box h={"100vw"}>
      <Flex
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <BodyText>Payment was successful</BodyText>
        <PryBtn onClick={verifyPayment} my={"15px"}>
          Comtinue
        </PryBtn>
      </Flex>
    </Box>
  );
}

export default Payments;
