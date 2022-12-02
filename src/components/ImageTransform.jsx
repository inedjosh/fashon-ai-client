import { Box, Flex, Select, Spinner, Image } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/store";
import "./styles.css";
import PryBtn from "./UiElements/PryBtn";
import { baseUrl } from "./../config";
import axios from "axios";

function ImageTransform(props) {
  const [details, setDetails] = useState({
    gender: "",
    size: "",
    sleeve: "",
    material: "",
    color: "",
  });
  const [image, setImage] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgBlob, setImgBlob] = useState();

  // on first visit

  const { state, dispatch } = useContext(DataContext);

  const menCategory = [
    {
      name: "Bathing suit",
      value: "Bathing suit",
    },
    {
      name: "Bodysuit",
      value: "Bodysuit",
    },
    {
      name: "Cap",
      value: "Cap",
    },
    {
      name: "Hoodie",
      value: "Hoodie",
    },
    {
      name: "Jacket",
      value: "Jacket",
    },
    {
      name: "Pants",
      value: "Pants",
    },
    {
      name: "Puffer",
      value: "Puffer",
    },
    {
      name: "Shirt",
      value: "shirt",
    },
    {
      name: "Shorts",
      value: "Shorts",
    },
    {
      name: "Socks",
      value: "Socks",
    },
    {
      name: "Sweater",
      value: "Sweater",
    },
  ];
  const womenCategory = [
    {
      name: "Bathing suit",
      value: "Bathing suit",
    },
    {
      name: "Bikini",
      value: "Bikini",
    },
    {
      name: "Blouse",
      value: "Blouse",
    },
    {
      name: "BodySuit",
      value: "BodySuit",
    },
    {
      name: "Bralette",
      value: "Bralette",
    },
    {
      name: "Cap",
      value: "Cap",
    },
    {
      name: "Coat",
      value: "Coat",
    },
    {
      name: "Dress",
      value: "Dress",
    },
    {
      name: "Hoodie",
      value: "Hoodie",
    },
    {
      name: "Leggings",
      value: "Leggings",
    },
    {
      name: "Pants",
      value: "Pants",
    },
  ];

  const size = [
    {
      name: "small size",
      value: "small size",
    },
    {
      name: "medium size",
      value: "medium size",
    },
    {
      name: "large size",
      value: "large size",
    },
    {
      name: "Extra large size",
      value: "Extra large size",
    },
  ];

  const sleeve = [
    {
      name: "Long sleeve",
      value: "Long sleeve",
    },
    {
      name: "Short sleeve",
      value: "Short sleeve",
    },
  ];

  const color = [
    {
      name: "Blue",
      value: "Blue",
    },
    {
      name: "Black",
      value: "Black",
    },
  ];

  const material = [];

  const category = [];
  useEffect(() => {
    if (details.gender === "male") {
      category.push(menCategory);
    } else {
      category.push(womenCategory);
    }
  }, [details.gender]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails((data) => ({ ...data, [name]: value }));
    console.log(details);
  };

  const handleImage = (e) => {
    setImgBlob(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const imageTransform = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    console.log(token);

    const imgDescribtion = `${details.gender}, ${details.size}, ${details.sleeve}, ${details.color}`;
    try {
      const imgData = new FormData();
      imgData.append("image", image);
      imgData.append("imgDescription", imgDescribtion);
      imgData.append("id", state.auth._id);

      const { data } = await axios.post(`${baseUrl}/image/transform`, imgData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(data);
      setResultUrl(data.data.url);
    } catch (error) {
      console.log(error?.response?.data);
    }
    setLoading(false);
  };
  console.log(resultUrl);
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      mt={"15px"}
      mb={"30px"}
      flexDirection={"column"}
    >
      {resultUrl ? (
        <Image src={resultUrl} borderRadius={"20px"} />
      ) : (
        <Box w={"70%"}>
          {imgBlob ? (
            <Flex>
              <Image src={imgBlob} />
            </Flex>
          ) : (
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
          )}
          <Flex w={"100%"} mt={"20px"} justifyContent={"space-between"}>
            <Box w={"48%"} py={"20px"}>
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
            <Box w={"48%"} py={"20px"}>
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
                {menCategory.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <Flex w={"100%"} py={"20px"} justifyContent={"space-between"}>
            <Flex w={"48%"} justifyContent={"space-between"}>
              <Flex flex={".45"}>
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
              <Flex flex={".45"}>
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
            <Flex w={"48%"} justifyContent={"space-between"}>
              <Flex flex={".45"}>
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
                  {color.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex flex={".45"}>
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
                  <option value={"Pro"}>Pro version only</option>
                </Select>
              </Flex>
            </Flex>
          </Flex>
          <Flex w={"50%"}>
            <PryBtn
              disabled={!state.auth.email}
              onClick={imageTransform}
              bg={"#791AE9"}
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
