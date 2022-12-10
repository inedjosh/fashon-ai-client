import { Box, Flex, Image, Select, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/store";
import "./styles.css";
import PryBtn from "./UiElements/PryBtn";
import { baseUrl } from "./../config";
import axios from "axios";
import BodyText from "./TextElements/BodyText";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import { toast } from "react-toastify";

function ImageTransform({ setPopup }) {
  const [details, setDetails] = useState({
    gender: "",
    size: "",
    sleeve: "",
    material: "",
    color: "",
  });
  const [image, setImage] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [imgBlob, setImgBlob] = useState();
  const [preview, setPreview] = useState(false);
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // on first visit

  const { state, dispatch } = useContext(DataContext);

  const handleImage = (e) => {
    setImgBlob(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  };
  const imgData = new FormData();
  imgData.append("image", image);

  const imageTransform = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!imgData) {
        setError("Please select an image");
        toast.error("Please select an image");
      }

      if (state.auth.trials < 1) {
        toast.error("You have exceeded the maximum number of trials");
        return setError("You have used up your trials");
      }

      setLoading(true);
      if (!error) toast.info("Image generation takes time, be patient");

      const { data } = await axios.post(`${baseUrl}/image/transform`, imgData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setResultUrl(data?.data?.url);
      toast.success("Image successfully generated");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
        setError(error.response?.data?.message);
      } else {
        toast.error(error.message);
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      mt={"15px"}
      mb={"30px"}
      flexDirection={"column"}
    >
      {resultUrl ? (
        <Image src={resultUrl} />
      ) : (
        <Box w={["100%", "100%", "70%"]}>
          <Box>
            {!imgBlob ? (
              <label class="custom-file-upload">
                <input type="file" onChange={handleImage} />
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>{" "}
                select an Image
              </label>
            ) : (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Image
                  src={imgBlob}
                  w={["90%", "90%", "95%"]}
                  h={"350px"}
                  objectFit={"cover"}
                  borderRadius={"20px"}
                  border={"1px dashed #ccc"}
                />
                <BodyText
                  onClick={() => setImgBlob("")}
                  cursor={"pointer"}
                  mt={"20px"}
                >
                  Change Image
                </BodyText>
              </Flex>
            )}
          </Box>

          <Flex
            w={"100%"}
            mt={"40px"}
            flexDirection={["column", "column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <PryBtn
              onClick={!state.auth.email ? setPopup : imageTransform}
              bg={"#791AE9"}
              w={["90%", "90%", "60%"]}
            >
              {loading ? <Spinner /> : "Generate Image"}
            </PryBtn>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}

export default ImageTransform;
