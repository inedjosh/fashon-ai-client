import React, { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import Hello from "../components/Hello";
import { DataContext } from "../store/store";
import NoUser from "../components/NoUser";
import axios from "axios";
import { baseUrl } from "../config";
import { Box, Flex, Spinner } from "@chakra-ui/react";

const AccountOverview = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fecthUserDetails = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/profile/details`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(data);
      if (data) {
        dispatch({
          type: "SIGNUP",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (auth.accountType === "pro") {
      fecthUserDetails();
    }
  }, []);

  if (loading) {
    return (
      <Box h={"100vw"}>
        <Flex
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Spinner />
        </Flex>
      </Box>
    );
  }

  if (!auth.email) {
    return <NoUser dispatch={dispatch} />;
  }

  return (
    <div>
      <Header title={`Hello`} />
      <Hello auth={auth} dispatch={dispatch} />
    </div>
  );
};

export default AccountOverview;
