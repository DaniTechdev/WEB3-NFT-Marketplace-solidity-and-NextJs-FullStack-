import React, { useContext, useEffect, useState } from "react";

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
  Loader,
} from "../components/componentsindex";
import Style from "../styles/index.module.css";
import { getTopCreators } from "../TopCreator";

//IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletIsConnected, checkContract } = useContext(
    NFTMarketplaceContext
  );

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  //CREATOR LIST
  const creators = getTopCreators(nfts);
  console.log("creators", creators);
  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
      // console.log("nft", nfts);
    }, []);
    //Check if providing the dependency array will help the filter not to misbehave above
  });

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
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

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
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

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

export default Home;
