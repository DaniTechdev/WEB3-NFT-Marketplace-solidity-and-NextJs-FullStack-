import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
// import Bhai from "react-icons/bi"

//INTERNAL IMPORT
import Style from "./DaysComponnts.module.css";
import images from "../../../img";

const DaysComponnts = ({ el, i }) => {
  return (
    <div className={Style.daysComponet}>
      <div className={Style.daysComponet_box}>
        <div className={Style.daysComponet_box_img}>
          <Image
            src={el.background}
            className={Style.daysComponet_box_img_img}
            alt="profile background"
            objectFit="covers"
          />
        </div>

        <div className={Style.daysComponet_box_profile}>
          <Image
            src={images.creatorbackground2}
            alt="profile"
            width={200}
            height={200}
            className={Style.daysComponet_box_img_1}
            objectFit="cover"
          />
          <Image
            src={images.creatorbackground2}
            alt=""
            width={200}
            height={300}
            className={Style.daysComponet_box_img_2}
            objectFit="cover"
          />
          <Image
            src={images.creatorbackground2}
            alt=""
            width={200}
            height={200}
            className={Style.daysComponet_box_img_3}
            objectFit="cover"
          />
        </div>

        <div className={Style.daysComponet_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.daysComponet_box_title_info}>
            <div className={Style.daysComponet_box_title_info_profile}>
              <Image
                src={el.user}
                alt="profile"
                width={30}
                height={30}
                objectFit="cover"
                className={Style.daysComponet_box_title_info_profile_img}
              />
              <p>
                Creator
                <span>
                  {" "}
                  Nnej Daniel
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={Style.daysComponet_box_title_info_price}>
              <small>1.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponnts;
