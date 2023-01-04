import { useEffect, useContext, useState } from "react";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ChakraProvider, Box, Spinner, Flex } from "@chakra-ui/react";
import "@fontsource/inter";
import { theme } from "./theme";
import { baseUrl } from "./config";
import { DataContext } from "./store/store";
import Payments from "./pages/Payments";
import GoPro from "./pages/GoPro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Callback from "./pages/Callback";
import Auth from "./pages/Auth";

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
    } else {
      toast.error(error.message);
    }
    dispatch({ type: "LOADING", payload: false });
    return false;
  }
};

function App() {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const verificationCode = params.get("verificationCode");
  const email = params.get("email");

  const userEmail = localStorage.getItem("userId");

  const authenticateUser = async () => {};

  useEffect(() => {
    if (userEmail) {
      const res = authenticateUser(userEmail.toLowerCase(), dispatch);

      if (!res) setPopup(true);
    }

    if (!userEmail) setPopup(true);
  }, [userEmail]);

  const verifyUser = async (email, verificationCode) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/auth/verify?verificationCode=${verificationCode}&email=${email}`
      );

      toast.success(
        "Your account has been verified you have been given 3 free trials"
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (email && verificationCode) {
      verifyUser(email, verificationCode);
    }
  }, [email, verificationCode]);

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
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/pro" element={<GoPro />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        )}
        <ToastContainer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
