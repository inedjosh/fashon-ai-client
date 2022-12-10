import React from "react";
import { Button } from "@chakra-ui/react";

const PryBtn = (props) => {
  return (
    <Button
      borderRadius="10px;"
      border="none;"
      color="white;"
      fontSize={["12px", "16px;"]}
      fontWeight="700;"
      textTransform="capitalize;"
      px={"45px"}
      height={"45px"}
      bg={
        " linear-gradient(271.39deg, #F602CA 1.2%, #A417B5 47.76%, #432F9D 98.84%);"
      }
      _hover={" linear-gradient(135deg, #8482FF 0%, #7723FE 100%);"}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default PryBtn;
