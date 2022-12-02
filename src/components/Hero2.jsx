import React from "react";

const Hero2 = () => {
  return (
    <div className="text-white bg-blue-purple flex flex-col lg:flex-row rounded-3xl sm:rounded-[50px] overflow-hidden 3xl:mx-auto 3xl:container">
      <div className="w-full lg:w-[50%] flex justify-center items-center p-10 lg:px-20">
        <p className="text-[30px] sm:text-[60px] xl:text-[75px] leading-none">
          Premium membership perks.
        </p>
      </div>

      <div className="flex justify-center items-center w-full lg:w-[50%]">
        <img src="./images/woman-with-ring-light.png" alt="" />
      </div>
    </div>
  );
};

export default Hero2;
