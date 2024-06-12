import React from "react";

//INTERNAL IMPORT
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
} from "../components/componentsindex";
import Style from "../styles/index.module.css";

const index = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Featured NFTS"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <Title
        heading="Browse by Category"
        paragraph="Explore the NFTs in the most featured catogories"
      />
      <Filter />
      <Category />
      <Subscribe />
    </div>
  );
};

export default index;
