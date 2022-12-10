import {
  Box,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Select,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import PryBtn from "./UiElements/PryBtn";
import axios from "axios";
import { baseUrl } from "../config";
import { DataContext } from "../store/store";
import BodyText from "./../components/TextElements/BodyText";
import {
  size,
  noOfrenders,
  proRealism,
  freeRealism,
  clothMaterial,
  proColor,
  freeColor,
  sleeve,
  proWemenCategory,
  freeWomenCategory,
  proMenCategory,
  freeMenCategory,
} from "./../data";
import { toast } from "react-toastify";

function TextImage({ setPopup }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const [details, setDetails] = useState({
    gender: "",
    size: "",
    sleeve: "",
    material: "",
    color: "",
    renders: 1,
    realism: "",
  });
  const [image, setImage] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgBlob, setImgBlob] = useState();

  const { state, dispatch } = useContext(DataContext);
  const { accountType } = state.auth;

  let freeCategory = [];
  let proCategory = [];

  useEffect(() => {
    if (details.gender === "male" && accountType === "free") {
      freeCategory.push(...freeMenCategory);
    } else {
      freeCategory.push(...freeWomenCategory);
    }
  }, [details.gender]);

  useEffect(() => {
    if (details.gender === "male" && accountType !== "free") {
      proCategory.push(...proMenCategory);
    } else {
      proCategory.push(...proWemenCategory);
    }
  }, [details.gender]);

  useEffect(() => {
    console.log("free", freeCategory);
    console.log("pro", proCategory);
  }, [details.gender]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails((data) => ({ ...data, [name]: value }));
    console.log(details);
  };

  const textToImage = async () => {
    try {
      const token = localStorage.getItem("token");

      const textDescription = `${text}, ${details.gender}, ${details.size}, ${details.sleeve}, ${details.color}`;

      if (state.auth.trials === 0) {
        toast.error("You have exceeded the maximum number of trials");
        return setError("You have exceeded the maximum number of trials");
      }

      if (!textDescription)
        toast.error("Please provide a valid image description");

      setLoading(true);
      toast.info("Image generation takes time, be patient");
      const { data } = await axios.post(
        `${baseUrl}/image/text`,
        {
          text: textDescription,
          renders: details.renders,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data);

      if (data) {
        setResultUrl(data.data.url);
        toast.success("Image successfully generated");
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        toast.error(error.message);
        setError(error.message);
      }
    }
    setLoading(false);
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
      {resultUrl ? (
        <Image src={resultUrl} borderRadius={"20px"} />
      ) : (
        <Flex
          w={"100%"}
          mt={"20px"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box w={"90%"}>
            <Input
              border={"none"}
              outline={"none"}
              appearance={"none"}
              bg={"#202020"}
              placeholder={"Image description"}
              color={"#fff"}
              opacity={".5"}
              h={"50px"}
              name="gender"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
          <Flex
            w={"90%"}
            mt={"20px"}
            justifyContent={"space-between"}
            flexDirection={["column", "column", "row"]}
          >
            <Box w={["100%", "100%", "48%", "48%"]} py={"15px"}>
              <Select
                border={"none"}
                outline={"none"}
                appearance={"none"}
                bg={"#202020"}
                placeholder={"Gender"}
                color={"#fff"}
                opacity={".5"}
                h={"50px"}
                name="gender"
                onChange={handleChange}
              >
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </Select>
            </Box>
            <Box w={["100%", "100%", "48%", "48%"]} py={"15px"}>
              <Select
                border={"none"}
                outline={"none"}
                appearance={"none"}
                bg={"#202020"}
                placeholder={"Category"}
                color={"#fff"}
                opacity={".5"}
                h={"50px"}
                onChange={handleChange}
                name={"category"}
              >
                {accountType === "free"
                  ? freeWomenCategory.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))
                  : proMenCategory.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
              </Select>
            </Box>
          </Flex>
          <Flex
            w={"90%"}
            py={"20px"}
            justifyContent={"space-between"}
            flexDirection={["column", "column", "row"]}
          >
            <Flex
              w={["100%", "100%", "48%", "48%"]}
              justifyContent={"space-between"}
            >
              <Flex w={["47%"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"Size"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"size"}
                >
                  {size.map((size, index) => (
                    <option key={index} value={size.value}>
                      {size.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex w={["47%"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"Sleeve"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"sleeve"}
                >
                  {sleeve.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
            <Flex
              w={["100%", "100%", "48%", "48%"]}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex w={["47%"]} mt={["30px", "30px", "0"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"Color"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"color"}
                >
                  {accountType === "free"
                    ? freeColor.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      ))
                    : proColor.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      ))}
                </Select>
              </Flex>
              <Flex w={["47%"]} mt={["30px", "30px", "0"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"Material"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"color"}
                >
                  {accountType === "free" ? (
                    <option value={"Pro"}>Pro version only</option>
                  ) : (
                    clothMaterial.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    ))
                  )}
                </Select>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"90%"}
            justifyContent={"space-between"}
            flexDirection={["column", "column", "row"]}
          >
            <Flex
              my={["20px", "20px", "10px"]}
              justifyContent={"space-between"}
              w={["100%", "100%", "48%"]}
            >
              <Flex w={["47%"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"Realism"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"realism"}
                >
                  {accountType === "free"
                    ? freeRealism.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      ))
                    : proRealism.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      ))}
                </Select>
              </Flex>
              <Flex w={["47%"]}>
                <Select
                  border={"none"}
                  outline={"none"}
                  appearance={"none"}
                  bg={"#202020"}
                  placeholder={"No of Render"}
                  color={"#fff"}
                  opacity={".5"}
                  h={"50px"}
                  onChange={handleChange}
                  name={"renders"}
                >
                  {accountType === "free" ? (
                    <option value={1}>1</option>
                  ) : (
                    noOfrenders.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    ))
                  )}
                </Select>
              </Flex>
            </Flex>
            ;
          </Flex>
          <Flex
            w={"100%"}
            mt={"60px"}
            flexDirection={["column"]}
            alignItems={"center"}
          >
            <PryBtn
              w={["90%", "90%", "50%"]}
              onClick={!state.auth.email ? setPopup : textToImage}
              bg={"#791AE9"}
            >
              {loading ? <Spinner /> : "Generate Image"}
            </PryBtn>
            {error && (
              <BodyText color={"red"} ml={"10px"} fontSize={"12px"}>
                {error}
              </BodyText>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default TextImage;
