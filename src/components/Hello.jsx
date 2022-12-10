import { Box, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { goPro } from "../App";
import { baseUrl } from "../config";
import { calcMonth } from "../utils/calcMonth";
import BodyText from "./TextElements/BodyText";
import PryBtn from "./UiElements/PryBtn";

const Hello = ({ auth, dispatch }) => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch({
      type: "SIGNUP",
      payload: {},
    });
  };

  console.log(auth);

  const nextBilling = calcMonth(auth.billing?.date);

  const navigate = useNavigate();

  const handlePro = async () => {
    const res = await goPro(auth.email, dispatch);

    if (!res) toast.error("Something went wrong");

    if (res) navigate("/pro");
  };

  return (
    <div className="3xl:mx-auto 3xl:container">
      <div className="text-white border-2 border-dashed border-neutral-700 rounded-[50px] my-20 py-20 px-10 flex flex-col sm:flex-row items-center justify-between bg-black-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-end">
          <img
            src="./images/userProfile.png"
            className="w-[150px] h-[150px]"
            alt=""
          />

          <div className="sm:px-5 font-semibold py-10 sm:py-0 sm:h-[100px] flex flex-col justify-between">
            <p className="text-center sm:text-left text-2xl sm:text-[80px]">
              Hello!
            </p>
            <p>{auth.email}</p>
          </div>
        </div>

        <img src="./images/cloud.png" alt="" />
      </div>

      {auth.accountType !== "free" ? (
        <div className="flex flex-col items-center sm:items-start py-10 md:px-0 md:mx-20">
          <div className="w-full bg-white rounded-[40px] sm:px-10 p-5 py-20 text-center sm:text-left sm:text-xl">
            <h1 className="text-2xl sm:text-5xl font-bold">Account overview</h1>

            <div className="py-7">
              <p className="font-bold">Your plan</p>
              <p>PREMIUM INDIVIDUAL</p>
            </div>

            <div className="flex xl:flex-row flex-col justify-between pt-10">
              <div>
                <p className="pb-5">You have - {auth.trials} trials more</p>
                <p className="font-bold underline text-zinc-600">
                  Learn more about your plan
                </p>
              </div>

              <div className="md:w-[350px] py-10 xl:py-0">
                <div>Payment details</div>
                <div>Your next bill is for 900.00 NGN on {nextBilling}.</div>
                <div>
                  <BodyText color={"#000"}>
                    Your card ending on {auth.billing?.card_last_4digits}{" "}
                  </BodyText>
                  <BodyText color={"#000"}>
                    Expires on {auth.billing?.expiry}
                  </BodyText>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`bg-blue-purple text-white font-semibold rounded-lg px-10 py-5 my-10 outline-none lg:mr-8`}
          >
            Renew payment
          </button>
        </div>
      ) : (
        <Box>
          <div className="flex flex-col items-center sm:items-start py-10 md:px-0 md:mx-20">
            <div className="w-full bg-white rounded-[40px] sm:px-10 p-5 py-20 text-center sm:text-left sm:text-xl">
              <h1 className="text-2xl sm:text-5xl font-bold">
                Account overview
              </h1>

              <div className="py-7">
                <p className="font-bold">Your plan</p>
                <p>FREE PLAN</p>
              </div>

              <div className="flex xl:flex-row flex-col justify-between pt-10">
                <div>
                  <p className="pb-5">You have - {auth.trials} trials more</p>
                  <p className="font-bold underline text-zinc-600">
                    Learn more about our free plans
                  </p>
                </div>
              </div>
            </div>

            <Flex mt={"30px"}>
              <PryBtn onClick={handlePro}>Go Pro</PryBtn>
              <PryBtn ml={"30px"} onClick={handleLogout}>
                Logout
              </PryBtn>
            </Flex>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Hello;
