import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Link from "next/link";

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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    //who ever interact with our smart contract becomes our signer below
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log("contract", contract);

    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  //-----USESTATE
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  const checkContract = async () => {
    const contract = await connectingWithSmartContract();
    console.log("contract", contract);
  };
  //------CONNECTING WALLETMETAMASK
  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     //   if (!window.ethereum) return setError("Please Install MetaMask");
  //     if (!window.ethereum) return console.log("Install MetaMask");

  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });

  //     if (accounts.length) {
  //       setCurrentAccount(accounts[0]);
  //       console.log("Current Account", currentAccount);
  //     } else {
  //       // setError("Please Install Metamask & Connect, Reload");
  //       console.log("No Account Found");
  //     }
  //   } catch (error) {
  //     console.log("Something wrong while connecting to wallet");
  //   }
  // };
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return console.log("Please install Metamask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log("currentAccount", currentAccount);
    } else {
      console.log("Something went wrong while on connecting with wallet");
    }
  };

  checkIfWalletIsConnected();
  useEffect(() => {
    checkIfWalletIsConnected();
    // checkContract();
  }, []);
  // checkIfWalletIsConnected();

  // checkIfWalletIsConnected();
  // connectingWithSmartContract();
  //---CONNECT WALLET;
  const connectWallet = async () => {
    try {
      //   if (!window.ethereum) return setError("Please Install MetaMask");
      if (!window.ethereum) return console.log("Please Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(currentAccount);

      // window.location.reload();
    } catch (error) {
      console.log("Error while connecting to Wallet");
    }
  };

  // connectWallet();
  // checkIfWalletIsConnected();
  //-----UPLOAD TO IPFS CANDIDATE IMAGE
  const uploadToIPFS = async (file) => {
    try {
      // const added = await client.add({ content: file });

      // const url = `https://ipfs.infuria.io/ipfs/${added.path}`;

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `d334d6b3fa02adf4e0ec`,
          pinata_secret_api_key: `6b2798c9672b34636df779ee6d406949c3a36288f71bd69680244acf98c715b4`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `http://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return ImgHash;
    } catch (error) {
      //   setError("Error Uploading file to IPFS for Candidate");
      console.log("Error uploading to IPFS");
    }
  };

  //CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    try {
      if (!name || !description || !price || !image)
        return console.log("Data Is Missing");

      const data = JSON.stringify({ name, description, image });

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `
            1693a8cadad504e5f1b9`,
          pinata_secret_api_key: `
            c9ed011fb121fc59b62f2176ae7df55c63aecbaab8e5dc2d17f5dbffc371655a`,
          "Content-Type": "application/json",
        },
      });

      const url = `http://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      console.log(url);

      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      console.log("Error while creating NFT");
    }
  };

  //--CreateSale Function
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      //convert the input price to ether format before posting to the blockchain
      const price = ethers.utils.parseUnits(formInputPrice);

      console.log("price", price);

      const contract = await connectingWithSmartContract();
      const listingPrice = await contract.getListingPrice();

      console.log("listingPrice", listingPrice);
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      //when a function makes changes to the blockchain it is wise to await it

      await transaction.wait();

      console.log("Transaction", transaction);
    } catch (error) {
      console.log("Error while creating sale");
    }
  };

  //FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();
      //   console.log(data);

      //the data will come in terms of promise and we wll have to await the promise (all)
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log("Error while fetching NFTS");
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);
  //--FETCHING MY NFT OR LISTED NFTS

  const fetchMyNFTsOrListedNFTs = async (type) => {
    //We use type argument because we can either fetch my nft that is put up for sell or the ones not put up for sale(type = sale or notforSale)
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log("Error while fetching listed NFTs");
    }
  };

  // useEffect(() => {
  //   fetchMyNFTsOrListedNFTs();
  // }, []);
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      console.log("Buy transaction details", transaction);
      router.push("/author");
    } catch (error) {
      console.log("Error while buying NFT");
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        titleData,
        connectWallet,
        uploadToIPFS,
        createSale,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        currentAccount,
        // checkIfWalletIsConnected,
        // checkContract,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
