import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import {
  useParams,
  useLocation,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";
import { DataContext } from "../store/store";

function Callback(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { state, dispatch } = useContext(DataContext);

  const status = params.get("status");
  const transaction_id = params.get("transaction_id");
  const tx_ref = params.get("tx_ref");
  const email = params.get("email");

  const verifyPayment = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `${baseUrl}/subscribe/verify?status=${status}&transaction_id=${transaction_id}&email=${email}&trx_ref=${tx_ref}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data);
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (email) verifyPayment();
  }, [email]);

  return (
    <Flex
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <LoadingSpinner />
      <Text color={"#fff"}>
        Verifying your payments, please dont eave the page
      </Text>
    </Flex>
  );
}

export default Callback;
