// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

//INTERNAL IMPORT

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0015 ether;

    address payable owner;

    mapping(uint256 => MarketItem) idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the Marketpplace can change the listing price"
        );
        _;
    }

    //We will use the ERC721 to define the symbol and a name of all the NFT created

    constructor() ERC721("NFT Metaverse Token", "MYNFT") {
        owner == payable(msg.sender);
    }

    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //LET CREATE "CREATE NET TOKEN FUNCTION"

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );

        //We will assign a unique id to the nft and calling the struct and updating the nft itme

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        //now we want to transfer the nft from the one who
        // is creating it to the contract
        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    //FUNCTION FOR RESALE TOKEN
    //this function allow users to resell their own nft probably for a higher vlaue

    //we will pass the token id and the updated price

    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only item's owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price";
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }


    //FUNCTION CREATEMARKETSALE
    //This will help someoen to buy a particular NFT

    function createMArketSale(uint256 tokenId) public payable {
        uint256  price = idMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase")

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
        
    }



    //GETTING UNSOLD NFT DATA

    function fetchMarketIten() public view returns(MarketItem[] memory){
        //first get thge total items in the marketplace
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _itemSold.current();-_itemsSold;
        uint256 currentIndex = 0;

        //we will create a new array that will be capable of  only containing the items not sold

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        //note: the unsold NFT belong to the address of the contract , i.e owner is address(this)
        for(uint256 i = 0; i < itemCount; i++){
            //if the current item is not sold
            if(idMarketItem[i + 1].owner == address(this)){
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
             }
        }

        return items;
    }


    //PURCHASED ITEM
    function fetchMyNft () public view returns (MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;//this will help us get the number of items owned by the msg.sender
        uint256 currentIndex =0;

        //Here to get the itemCount
        for(uint256 i=0; i<totalCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){
                itemCount++;
            }
        }
        //here to use the current id to get the items associated to the current id and save each in the newly created array
        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint256 i=0; i<totalCount; i++){
             if(idMarketItem[i+1].owner == msg.sender){
                uint256 currentId = i+1;
                 MarketItem storage currentItem = idMarketItem[currentId];
                 items[currentIndex] = currentItem;
                 currentIndex++;
                }
        }
         return items;       
    }


    //SINGLE USER ITEM
    //we want to display the information about the NFT individually

    function fetchItemsListed () public view returns (MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i = 0; i<totalCount;i++){
            if(idMarketItem[i+1].seller == msg.sender){
                itemCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint256 i=0; i< totalCount;i++){
            if(idMarketItem[i+1].seller == msg.sender){
                uint256 currentId = i+1;

                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }


}
