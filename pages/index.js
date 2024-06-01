import React from "react";

//INTERNAL IMPORT
import {
  HeroSection,
  Service,
  BigNFTSlider,
} from "../components/componentsindex";
import Style from "../styles/index.module.css";

const index = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
    </div>
  );
};

export default index;
