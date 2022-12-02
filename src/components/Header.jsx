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
  Link,
  Show,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BodyText from "./TextElements/BodyText";
import HeadingText from "./TextElements/Heading";
import { HiOutlineMenu } from "react-icons/hi";
import PryBtn from "./UiElements/PryBtn";
import { colors } from "../constants/colors";

const Header = ({ title }) => {
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
        <HeadingText flex={".4"} color={"#fff"}>
          FASHUN.AI
        </HeadingText>
        <UnorderedList
          display={"flex"}
          flex={".2"}
          justifyContent={"space-between"}
        >
          <ListItem>
            <Link fontSize={"20px"} color={"#fff"} href="/about">
              About Us
            </Link>
          </ListItem>
          <ListItem>
            <Link fontSize={"20px"} color={"#fff"} href="/faq">
              FAQ
            </Link>
          </ListItem>
        </UnorderedList>
        <Flex flex={".4"} justifyContent={"flex-end"}>
          <PryBtn>{title}</PryBtn>
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
              >
                <ListItem>
                  <Link href="/about">About Us</Link>
                  <Link href="/faq">FAQ</Link>
                </ListItem>
              </UnorderedList>
            </DrawerBody>

            <DrawerFooter>
              <Flex w={"100%"} justifyContent={"center"}>
                <PryBtn px={"30px"}>
                  <Link to="/login">Login</Link>
                </PryBtn>
                <Button
                  ml={"15px"}
                  border={"1px solid #8482FF"}
                  bg={"#fff"}
                  px={"30px"}
                  color={"#8482FF"}
                  borderRadius={"30px"}
                  py={"25px"}
                >
                  <Link color={"#8482FF"} to="/signup">
                    Signup
                  </Link>
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Show>
    </Flex>
  );
};

export default Header;
