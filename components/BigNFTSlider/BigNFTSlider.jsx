import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowRightLine } from "react-icons/tb";

//INTERNAL IMPORT

import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const slideData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Nneji Daniel",
      collection: "GYm",
      price: "0.000000006545 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "RARE NFT",
      id: 1,
      name: "Aka Udeh Aka",
      collection: "GYm",
      price: "0.000000005566 ETH",
      like: 356,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "NETWORK NFT",
      id: 1,
      name: "Ojemba Nneji",
      collection: "GYm",
      price: "0.000000005566 ETH",
      like: 356,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "VOTING NFT",
      id: 1,
      name: "Samuel Ohaneze",
      collection: "GYm",
      price: "0.000000005566 ETH",
      like: 356,
      image: images.user4,
      nftImage: images.nft_image_4,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
  ];

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{slideData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={slideData[idNumber].image}
                alt="profile img"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_img}>
                <p>Creator</p>
                <h4>
                  {slideData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection.icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BigNFTSlider;
