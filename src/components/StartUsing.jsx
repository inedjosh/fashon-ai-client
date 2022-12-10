import React, { useState, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { Box, Flex, Button } from "@chakra-ui/react";
import HeadingText from "./TextElements/Heading";
import BodyText from "./TextElements/BodyText";
import { colors } from "../constants/colors";
import ImageTransform from "./ImageTransform";
import TextImage from "./TextImage";
import { DataContext } from "../store/store";

const StartUsing = ({ setPopup }) => {
  const [text, setText] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [imgDescribtion, setImgDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState([]);

  const [imageState, setImageState] = useState("image");

  const { state, dispatch } = useContext(DataContext);

  const imageStateChange = (val) => {
    setImageState(val);
  };

  return (
    <Box mb={"100px"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HeadingText fontSize={["30px", "30px", "40px", "60px"]}>
          Start using Fushon AI
        </HeadingText>
        <BodyText className="text-sm py-10 text-center lg:w-[500px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
          ipsum mollitia natus fugit veniam praesentium quo maxime quod,
          voluptas laborum.
        </BodyText>
      </Flex>
      <Flex justifyContent={"center"} alignItems={"center"} mb={"35px"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          py={"15px"}
          px={"20px"}
          borderRadius={"10px"}
          bg={colors.pryBck}
          w={"fit-content"}
        >
          <Button
            bg={imageState === "image" ? "#fff" : ""}
            p={imageState === "image" ? "10px" : ""}
            borderRadius={imageState === "image" ? "10px" : ""}
            mr={"10px"}
            onClick={() => imageStateChange("image")}
          >
            <BodyText color={imageState === "image" ? "#000" : "#fff"}>
              Use an image
            </BodyText>
          </Button>
          <Button
            bg={imageState === "text" ? "#fff" : ""}
            p={imageState === "text" ? "10px" : ""}
            borderRadius={imageState === "text" ? "10px" : ""}
            onClick={() => imageStateChange("text")}
          >
            <BodyText color={imageState === "text" ? "#000" : "#fff"}>
              Use text
            </BodyText>
          </Button>
        </Flex>
      </Flex>
      <Box>
        {imageState === "image" ? (
          <ImageTransform setPopup={setPopup} />
        ) : (
          <TextImage setPopup={setPopup} />
        )}
      </Box>
    </Box>
  );
};

export default StartUsing;
