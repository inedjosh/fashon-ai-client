import {
  Box,
  Button,
  ListItem,
  UnorderedList,
  Flex,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Hide,
  Show,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BodyText from "./TextElements/BodyText";
import HeadingText from "./TextElements/Heading";
import { HiOutlineMenu } from "react-icons/hi";
import PryBtn from "./UiElements/PryBtn";
import { colors } from "../constants/colors";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex
      bg={colors.pryBck}
      py={"15px"}
      borderRadius={"20px"}
      justifyContent={"space-between"}
      px={"50px"}
      alignItems={"center"}
    >
      <Hide below={"md"}>
        {" "}
        <Link to="/">
          <HeadingText flex={".4"} color={"#fff"}>
            FASHUN.AI
          </HeadingText>
        </Link>
        <UnorderedList
          display={"flex"}
          flex={".3"}
          justifyContent={"space-between"}
        >
          <ListItem>
            <Link fontSize={"20px"} color={"#fff"} to="/about">
              About Us
            </Link>
          </ListItem>
          <ListItem>
            <Link fontSize={"20px"} color={"#fff"} to="/faq">
              FAQ
            </Link>
          </ListItem>
        </UnorderedList>
        <Flex flex={".4"} justifyContent={"flex-end"}>
          {auth ? (
            <PryBtn>
              {" "}
              <Link to="/profile">My Account</Link>{" "}
            </PryBtn>
          ) : (
            <PryBtn>
              {" "}
              <Link to="/auth">Signup</Link>
            </PryBtn>
          )}
        </Flex>
      </Hide>
      <Show below={"md"}>
        <Flex
          colorScheme="teal"
          alignSelf={"flex-end"}
          ref={btnRef}
          borderRadius={"0"}
          onClick={onOpen}
          justifyContent={"flex-end"}
          w={"100%"}
        >
          <Box onClick={() => setOpenMobileNav(true)}>
            <Icon as={HiOutlineMenu} color={"#fff"} fontSize={"30px"} />
          </Box>
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <UnorderedList
                display={["flex"]}
                justifyContent="space-around"
                w="100%"
                alignItems="center"
                py="5"
                flexDirection={"column"}
                marginTop={"100px"}
              >
                <ListItem mb={"100px"} listStyleType={"none"}>
                  <Link to="/" textTransform={"uppercase"}>
                    FUNSHUN AI
                  </Link>
                </ListItem>
                <ListItem mt={"50px"} listStyleType={"none"}>
                  <Link to="/profile">Profile</Link>
                </ListItem>
                <ListItem mt={"50px"} listStyleType={"none"}>
                  <Link to="/faq">FAQ</Link>
                </ListItem>
                <ListItem mt={"50px"} listStyleType={"none"}>
                  <Link to="/about">About Us</Link>
                </ListItem>
              </UnorderedList>
            </DrawerBody>

            <DrawerFooter>
              <Flex w={"100%"} justifyContent={"center"}>
                <BodyText color={"#000"}>Funshun AI 2022</BodyText>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Show>
    </Flex>
  );
};

export default Header;
