import { useEffect, useContext, useState } from "react";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Suscription from "./pages/Suscription";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider, Box, Spinner, Flex } from "@chakra-ui/react";
import "@fontsource/inter";
import { theme } from "./theme";
import { baseUrl } from "./config";
import { DataContext } from "./store/store";

function App() {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await axios.get(`http://localhost:3000/`);

    console.log(data);
  };

  useEffect(() => {
    load();
  }, []);

  const authenticateUser = async (user) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/auth/signup`, {
        email: user,
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.email);
      dispatch({
        type: "SIGNUP",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userId");

    if (userEmail) {
      authenticateUser(userEmail);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box h={"100%"} bg={"#0D0C0C"} w={"100vw"} p={"10px 20px"}>
        {loading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h={"100vw"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#fff"
              size="xl"
            />
          </Flex>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/suscription" element={<Suscription />} />
          </Routes>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
