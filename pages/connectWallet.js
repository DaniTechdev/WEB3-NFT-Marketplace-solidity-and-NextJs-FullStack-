import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT

import Style from "../styles/Collection.module.css";
import images from "../img";

const connectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const providerArray = [
    {
      provider: images.provider1,
      name: "MetaMask",
    },
    {
      provider: images.provider2,
      name: "WallectConnect",
    },
    {
      provider: images.provider3,
      name: "Fomatiic",
    },
    {
      provider: images.provider3,
      name: "Fomatic",
    },
  ];

  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallect</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with one of your available wallet providers
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                Style.activeBtn == i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
            >
              <Image
                src={el.provider}
                alt={el.provider}
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connectWallet;
