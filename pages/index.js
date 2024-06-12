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
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video,
} from "../components/componentsindex";
import Style from "../styles/index.module.css";

const index = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading=" Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <AudioLive />
      {/* <Title
        heading="New Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      /> */}
      <FollowerTab />

      {/* <Title
        heading="Explore NFTs Video"
        paragraph="Click on play and enjoy NFTs video"
      /> */}
      <Slider />

      <Collection />
      <Title
        heading="Featured NFTS"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <Filter />
      <NFTCard />
      <Title
        heading="Browse by Category"
        paragraph="Explore the NFTs in the most featured catogories"
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default index;
