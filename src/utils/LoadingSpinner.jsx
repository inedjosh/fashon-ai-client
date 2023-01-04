import { Spinner } from "@chakra-ui/react";
import React from "react";

function LoadingSpinner(props) {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color={"#fff"}
      size="xl"
    />
  );
}

export default LoadingSpinner;
