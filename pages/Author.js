import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/Author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import images from "../img";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";

import {
  AuthorProfileCard,
  AuthorTaps,
  TabCard,
} from "../authorPage/componentIndex";

const Author = () => {
  const popularArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
    images.user6,
    images.user7,
    images.user8,
  ];

  const [collectibles, setCollectibles] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className={Style.banner}>
      <Banner bannerImage={images.creatorbackground5} />
      <AuthorProfileCard />
      <AuthorTaps
        collectibles={collectibles}
        created={created}
        like={like}
        follower={follower}
        TabCard={TabCard}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NFT music or audio"
      />
      {/* {popularArray.map((el, i) => (
        <FollowerTabCard key={i + 1} i={i} el={el} />
      ))} */}
      <Brand />
    </div>
  );
};

export default Author;
