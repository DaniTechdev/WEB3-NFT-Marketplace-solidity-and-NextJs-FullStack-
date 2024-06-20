import React, { useState, useEffect, useContext } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

//--FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

export const NFTMarketplaceContext = React.createContext();

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    //who ever interact with our smart contract becomes our signer below
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";
  return (
    <NFTMarketplaceContext.Provider value={{ titleData }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
