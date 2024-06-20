import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../HeroSection/HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData}</h1>
          <p>
            Discover the most outstanding NFTs in all topics. Create your NFTs
            an sell them
          </p>
          <Button btnText="Start your search " />
        </div>
        <div className={Style.heroSection_right}>
          <div className={Style.heroSection_box_right}>
            <Image
              src={images.hero}
              alt="Hero Section"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
