import { Box, Flex, Image, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import PryBtn from "./UiElements/PryBtn";
import axios from "axios";
import { baseUrl } from "../config";
import { DataContext } from "../store/store";
import BodyText from "./../components/TextElements/BodyText";

function TextImage(props) {
  const [resultUrl, setResultUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const userId = state.auth._id;

  const textToImage = async () => {
    const token = localStorage.getItem("token");

    if (state.auth.trials < 1) {
      setError("You have exceeded the maximum number of trials");
    } else {
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/image/text`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            text: text,
          }),
        });

        const data = await res.json();
        console.log(data);
        // setResultUrl(data.data.url);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <Flex
      w={"100%"}
      mt={"20px"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      mb={"40px"}
    >
      {error && <BodyText>{error}</BodyText>}
      {resultUrl ? (
        <Image src={resultUrl} borderRadius={"20px"} />
      ) : (
        <Flex
          w={"100%"}
          mt={"20px"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          mb={"40px"}
        >
          <Box w={"80%"} py={"20px"}>
            <Input
              border={"none"}
              outline={"none"}
              appearance={"none"}
              bg={"#202020"}
              placeholder={"Gender"}
              color={"#fff"}
              opacity={".5"}
              h={"50px"}
              name="gender"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
          <PryBtn disabled={!state.auth.email} onClick={textToImage}>
            {" "}
            {loading ? <Spinner /> : "Generate Image"}
          </PryBtn>
        </Flex>
      )}
    </Flex>
  );
}

export default TextImage;
