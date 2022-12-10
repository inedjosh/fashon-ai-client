import { useEffect, useContext, useState } from "react";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Suscription from "./pages/Suscription";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Spinner, Flex } from "@chakra-ui/react";
import "@fontsource/inter";
import { theme } from "./theme";
import { baseUrl } from "./config";
import { DataContext } from "./store/store";
import isEmail from "validator/lib/isEmail";
import Payments from "./pages/Payments";
import GoPro from "./pages/GoPro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const authenticateUser = async (email, dispatch) => {
  console.log(email);
  if (!isEmail(email)) {
    toast.error("Please input a valid email");
    return dispatch({
      type: "ERROR",
      payload: "Please input a valid email address",
    });
  }

  try {
    dispatch({ type: "LOADING", payload: true });
    const { data } = await axios.post(`${baseUrl}/auth/signup`, {
      email: email,
    });

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("userId", data.data.email);
    dispatch({
      type: "SIGNUP",
      payload: data.data,
    });
    return true;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      console.log(error.response.data.message);

      dispatch({ type: "ERROR", payload: error.response.data.message });
    } else {
      dispatch({ type: "ERROR", payload: error.message });
    }
    dispatch({ type: "LOADING", payload: false });
    return false;
  }
};

export const goPro = async (email, dispatch) => {
  const token = localStorage.getItem("token");

  if (!email) {
    toast.error("You are not logged in");
    return false;
  }

  try {
    dispatch({ type: "LOADING", payload: true });
    const { data } = await axios.post(
      `${baseUrl}/subscribe/auth`,
      { email: email },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({ type: "LINK", payload: data.data.link });
    return true;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);

      dispatch({ type: "ERROR", payload: error.response.data.message });
    } else {
      toast.error(error.message);
      dispatch({ type: "ERROR", payload: error.message });
    }
    dispatch({ type: "LOADING", payload: false });
    return false;
  }
};

function App() {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userId");

    if (userEmail) {
      const res = authenticateUser(userEmail.toLowerCase(), dispatch);

      if (!res) setPopup(true);
    }

    if (!userEmail) setPopup(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box bg={"#0D0C0C"} w={"100vw"} p={"10px 20px"}>
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
            <Route
              path="/"
              element={<HomePage popup={popup} setPopup={setPopup} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/suscription" element={<Suscription />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/pro" element={<GoPro />} />
          </Routes>
        )}
        <ToastContainer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
