import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";
//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  //We used array here because data from our api will come as an array and will be displaced here dynamically
  const CategoryArray = [
    images.creatorbackground1,
    images.creatorbackground10,
    images.creatorbackground4,
    images.creatorbackground6,
    images.creatorbackground11,
    images.creatorbackground8,
  ];

  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={i + 1}>
            <Image
              src={el}
              className={Style.category_box_image}
              alt="background image"
              width={350}
              height={150}
              objectFit="cover"
            />
            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Entertainment</h4>
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
