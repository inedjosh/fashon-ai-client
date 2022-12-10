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
  Flex,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import BodyText from "./TextElements/BodyText";
import PryBtn from "./UiElements/PryBtn";
import axios from "axios";
import { baseUrl } from "./../config";
import { DataContext } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { goPro } from "../App";
import { toast } from "react-toastify";

const Hero = ({ dispatch, email, accountType }) => {
  const navigate = useNavigate();

  const handlePro = async () => {
    const res = await goPro(email, dispatch);

    if (!res) toast.error("Something went wrong");

    if (res) navigate("/pro");
  };

  return (
    <div className="text-white lg:flex-row flex flex-col items-center xl:h-[600px] rounded-3xl overflow-hidden my-10 bg-[#202020] relative 3xl:mx-auto 3xl:container">
      {/*<img src="./images/purpleBlueBackground.png" className='absolute -z-20 left-0 bottom-1 ' alt="" />*/}
      <div className="h-full lg:w-[50%] pt-20 xl:py-10 xl:px-24 2xl:px-32 px-3 flex flex-col   justify-end">
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
        {accountType === "free" && (
          <Flex
            my={"20px"}
            justifyContent={["center"]}
            alignItems={"center"}
            w={"100%"}
          >
            <PryBtn bg={"#C81AD2"} w={["100%", "100%", "80%", "900%"]}>
              <Link onClick={handlePro}> Go Pro</Link>
            </PryBtn>
          </Flex>
        )}
      </div>

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
