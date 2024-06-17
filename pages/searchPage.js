import React from "react";
import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarindex";
import { Filter } from "../components/componentsindex";
import {
  NfTCardTwo,
  Banner,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import images from "../img";

const searchPage = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
