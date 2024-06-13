import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/Author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import images from "../img";

// import { AuthorProfileCard, AuthorTaps, TabCard } from "../";

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
  const [liked, setLiked] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className={Style.banner}>
      <Banner bannerImage={images.creatorbackground5} />
    </div>
  );
};

export default Author;
