import { Box, Flex, Icon, Image, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import Header from "../components/Header";
import BodyText from "../components/TextElements/BodyText";
import HeadingText from "../components/TextElements/Heading";
import { AiFillCheckCircle } from "react-icons/ai";
import PryBtn from "../components/UiElements/PryBtn";
import { DataContext } from "../store/store";

function GoPro(props) {
  const { state, dispatch } = useContext(DataContext);
  const { link } = state;

  const pro = [
    {
      id: 1,
      value: "100 text to image ashion renders",
    },
    {
      id: 2,
      value: "100 AI cloth try-on renders",
    },
    {
      id: 3,
      value: "High quality renders",
    },
    {
      id: 4,
      value: "More styles, categories, colours",
    },
    {
      id: 5,
      value: "Cloth materials and realism types to try",
    },
    {
      id: 6,
      value: "Priority support",
    },
    {
      id: 7,
      value: "First access to newest features and tools",
    },
  ];

  const free = [
    {
      id: 1,
      value: "3 AI cloth try-on renders",
    },
    {
      id: 2,
      value: "Limited styles, categories and colors to try",
    },
    {
      id: 3,
      value: "Simple design renders",
    },
  ];
  return (
    <Box h={"100%"} pb={"50px"}>
      <Header title="Go pro" />
      <HeadingText mt={"20px"} textAlign={"center"}>
        Go pro
      </HeadingText>
      <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent={"space-around"}
          mt={"50px"}
          h={"70%"}
          w={"70%"}
        >
          <Box>
            <Flex
              flexDirection={["column"]}
              border={"1px dashed #ccc"}
              borderRadius={"30px"}
              bg={"#202020"}
              py={"20px"}
              w={"280px"}
            >
              <Flex
                justifyContent={"space-between"}
                p={"10px"}
                alignItems={"center"}
              >
                <Flex>
                  <Image
                    src={"./images/pro.png"}
                    w={"30px"}
                    height={"30px"}
                    objectFit={"cover"}
                  />
                  <BodyText fontSize={"11px"} ml={"3px"}>
                    Premium <br /> memebership
                  </BodyText>
                </Flex>
                <Box>
                  <HeadingText>$10</HeadingText>
                </Box>
              </Flex>
              <Flex
                flexDirection={"column"}
                mt={"10px"}
                borderBottom={"1px solid #ccc"}
                pb={"25px"}
              >
                {pro.map((item, index) => (
                  <Flex
                    key={index}
                    alignItems={"center"}
                    py={"4px"}
                    px={"12px"}
                  >
                    <Icon as={AiFillCheckCircle} color={"#fff"} />
                    <BodyText fontSize={"13px"} ml={"3px"} opacity={".7"}>
                      {item.value}
                    </BodyText>
                  </Flex>
                ))}
              </Flex>
              <Flex py={"20px"} px={"20px"}>
                <PryBtn>
                  <Link href={link}> Upgrade to Premium</Link>
                </PryBtn>
              </Flex>
            </Flex>
          </Box>
          <Box mt={["40px", "40px", "0"]}>
            <Flex
              flexDirection={["column"]}
              border={"1px dashed #ccc"}
              borderRadius={"30px"}
              bg={"#202020"}
              py={"30px"}
              w={"280px"}
            >
              <Flex
                justifyContent={"space-between"}
                p={"10px"}
                alignItems={"center"}
              >
                <Flex>
                  <BodyText fontSize={"11px"} ml={"3px"}>
                    Basic
                  </BodyText>
                </Flex>
                <Box>
                  <HeadingText>$0</HeadingText>
                </Box>
              </Flex>
              <Flex
                flexDirection={"column"}
                mt={"10px"}
                borderBottom={"1px solid #ccc"}
                pb={"25px"}
              >
                {free.map((item, index) => (
                  <Flex
                    key={index}
                    alignItems={"center"}
                    py={"4px"}
                    px={"12px"}
                  >
                    <Icon as={AiFillCheckCircle} color={"#fff"} />
                    <BodyText fontSize={"13px"} ml={"3px"} opacity={".7"}>
                      {item.value}
                    </BodyText>
                  </Flex>
                ))}
              </Flex>
              <Flex py={"40px"} px={"20px"}></Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default GoPro;
