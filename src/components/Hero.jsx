import {
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
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import BodyText from "./TextElements/BodyText";
import PryBtn from "./UiElements/PryBtn";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { baseUrl } from "./../config";
import { DataContext } from "../store/store";

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const [email, setEmail] = useState("");
  const [erorr, setError] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const signupUser = async () => {
    if (!isEmail(email)) return setError("Please input a valid email address");

    try {
      setError("");

      const { data } = await axios.post(`${baseUrl}/auth/signup`, {
        email: email,
      });

      console.log(data);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.email);
      dispatch({
        type: "SIGNUP",
        payload: data.data,
      });
      onClose(() => true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white lg:flex-row flex flex-col items-center xl:h-[600px] rounded-3xl overflow-hidden my-10 bg-[#202020] relative 3xl:mx-auto 3xl:container">
      {/*<img src="./images/purpleBlueBackground.png" className='absolute -z-20 left-0 bottom-1 ' alt="" />*/}
      <div className="h-full lg:w-[50%] pt-20 xl:py-10 xl:px-24 2xl:px-32 px-3 flex flex-col items-center justify-end">
        <h1 className="text-center lg:text-left text-[45px] sm:text-[50px] xl:text-[60px] 2xl:text-[79px] leading-none relative">
          <div className=" bg-black-transparent h-full w-full absolute bottom-[-7px] xl:top-0 2xl:top-[10px] left-0 hidden lg:block"></div>
          Get <span className="text-[#C81AD2]">new</span> cloth designs in
          seconds.
        </h1>
        <p className="text-center lg:text-left text-sm py-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          necessitatibus consequuntur ipsum est beatae repudiandae, animi hic
          voluptate tenetur voluptatibus enim ipsam alias fuga cupiditate
          doloribus. Veritatis nam nobis deserunt?
        </p>

        <div className="flex lg:flex-row flex-col justify-center  items-center">
          {!auth.email && (
            <button
              onClick={onOpen}
              className={`bg-white text-black font-semibold rounded-lg px-10 py-3 my-5 outline-none lg:mr-8`}
            >
              enter your email to start using
            </button>
          )}

          <button
            className={`bg-[#791AE9] text-white font-semibold rounded-lg px-10 py-3 my-5 outline-none lg:mr-8`}
          >
            Get premium
          </button>
        </div>
      </div>
      {/* <Button >Open Modal</Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your email to get started </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erorr && (
                <BodyText fontSize={"12px"} color={"red"} mr={"20px"}>
                  {erorr}
                </BodyText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"space-between"}>
            <PryBtn colorScheme="blue" mr={3} onClick={signupUser}>
              Get started
            </PryBtn>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="h-full w-[50%] justify-between 2xl:justify-evenly lg:flex hidden">
        <div className="h-full flex flex-col">
          <img src="./images/hero-girl1.png" className="scale-[.95]" alt="" />
          <img src="./images/hero-girl3.png" className="scale-[.95]" alt="" />
        </div>
        <div className="h-full flex flex-col">
          <img src="./images/hero-girl2.png" className="scale-[.95]" alt="" />
          <img src="./images/hero-girl4.png" className="scale-[.95]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
