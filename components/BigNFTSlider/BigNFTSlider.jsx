import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT

import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(1);

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
        days: 30,
        hours: 40,
        minutes: 13,
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
      nftImage: images.nft_image_3,
      time: {
        days: 7,
        hours: 1,
        minutes: 90,
        seconds: 35,
      },
    },
  ];

  //Here we are changing the ID number and it will change at the onclick event which can detemine what image shgould displacy
  //------INC

  const inc = useCallback(() => {
    if (idNumber + 1 < slideData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, slideData.length]);

  //------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  useEffect(() => {
    inc();
  }, []);

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
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
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
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{slideData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {slideData[idNumber].price} <span>$222,213</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div className={Style.bigNFTSlider_box_left_bidding_box_item}>
                <p>{slideData[idNumber].time.days}</p>
                <span>DAYS</span>
              </div>

              <div className={Style.bigNFTSlider_box_left_bidding_box_item}>
                <p>{slideData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>

              <div className={Style.bigNFTSlider_box_left_bidding_box_item}>
                <p>{slideData[idNumber].time.minutes}</p>
                <span>Mins</span>
              </div>

              <div className={Style.bigNFTSlider_box_left_bidding_box_item}>
                <p>{slideData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button btnText="Place" handleClick={() => {}} />
              <Button btnText="View" handleClick={() => {}} />
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={slideData[idNumber].nftImage}
              alt="nft image"
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{slideData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BigNFTSlider;
