import { Heading, Text } from "@chakra-ui/react";
import React from "react";

function HeadingText(props) {
  return (
    <Heading fontSize="30" color={"#fff"} {...props}>
      {props.children}
    </Heading>
  );
}

export default HeadingText;
