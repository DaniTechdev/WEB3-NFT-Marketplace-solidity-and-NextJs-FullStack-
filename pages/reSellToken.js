import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentsindex";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";

//Import Smart Contract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);
    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    await createSale(tokenURI, price, true, id);
    router.push("/author");
  };

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            placeholder="reSell price"
            min={1}
            className={formStyle.Form_box_input_username}
          />
        </div>

        <div className={Style.reSellToken_box_imgage}>
          {image && (
            <Image src={image} alt="resell nft " width={400} height={400} />
          )}
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
