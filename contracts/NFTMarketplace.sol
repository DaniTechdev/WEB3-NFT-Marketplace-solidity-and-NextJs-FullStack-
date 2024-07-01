// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

//INTERNAL IMPORT

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

// contract NFTMarketplace is ERC721URIStorage {
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIds;
//     Counters.Counter private _itemsSold;

//     uint256 listingPrice = 0.0015 ether;

//     address payable owner;

//     mapping(uint256 => MarketItem) idToMarketItem;

//     struct MarketItem {
//         uint256 tokenId;
//         address payable seller;
//         address payable owner;
//         uint256 price;
//         bool sold;
//     }

//     event MarketItemCreated(
//         uint256 indexed tokenId,
//         address seller,
//         address owner,
//         uint256 price,
//         bool sold
//     );

//     modifier onlyOwner() {
//         require(
//             msg.sender == owner,
//             "only owner of the Marketpplace can change the listing price"
//         );
//         _;
//     }

//     //We will use the ERC721 to define the symbol and a name of all the NFT created

//     constructor() ERC721("NFT Metaverse Token", "MYNFT") {
//         owner == payable(msg.sender);
//     }

//     function updateListingPrice(
//         uint256 _listingPrice
//     ) public payable onlyOwner {
//         listingPrice = _listingPrice;
//     }

//     function getListingPrice() public view returns (uint256) {
//         return listingPrice;
//     }

//     //LET CREATE "CREATE NFT TOKEN FUNCTION"

//     function createToken(
//         string memory tokenURI,
//         uint256 price
//     ) public payable returns (uint256) {
//         _tokenIds.increment();

//         uint256 newTokenId = _tokenIds.current();

//         _mint(msg.sender, newTokenId);
//         _setTokenURI(newTokenId, tokenURI);

//         createMarketItem(newTokenId, price);

//         return newTokenId;
//     }

//     function createMarketItem(uint256 tokenId, uint256 price) private {
//         require(price > 0, "Price must be at least 1");
//         require(
//             msg.value == listingPrice,
//             "price must be equal to listing price"
//         );

//         //We will assign a unique id to the nft and calling the struct and updating the nft itme

//         idToMarketItem[tokenId] = MarketItem(
//             tokenId,
//             payable(msg.sender),
//             payable(address(this)),
//             price,
//             false
//         );
//         //now we want to transfer the nft from the one who
//         // is creating it to the contract
//         _transfer(msg.sender, address(this), tokenId);

//         emit MarketItemCreated(
//             tokenId,
//             msg.sender,
//             address(this),
//             price,
//             false
//         );
//     }

//     //FUNCTION FOR RESALE TOKEN
//     //this function allow users to resell their own nft probably for a higher vlaue

//     //we will pass the token id and the updated price

//     function reSellToken(uint256 tokenId, uint256 price) public payable {
//         require(
//             idToMarketItem[tokenId].owner == msg.sender,
//             "Only item's owner can perform this operation"
//         );
//         require(
//             msg.value == listingPrice,
//             "Price must be equal to listing price"
//         );

//         idToMarketItem[tokenId].sold = false;
//         idToMarketItem[tokenId].price = price;
//         idToMarketItem[tokenId].seller = payable(msg.sender);
//         idToMarketItem[tokenId].owner = payable(address(this));

//         _itemsSold.decrement();

//         _transfer(msg.sender, address(this), tokenId);
//     }

//     //FUNCTION CREATEMARKETSALE
//     //This will help someoen to buy a particular NFT

//     function createMArketSale(uint256 tokenId) public payable {
//         uint256 price = idToMarketItem[tokenId].price;

//         require(
//             msg.value == price,
//             "Please submit the asking price in order to complete the purchase"
//         );

//         idToMarketItem[tokenId].owner = payable(msg.sender);
//         idToMarketItem[tokenId].sold = true;
//         idToMarketItem[tokenId].owner = payable(address(0));

//         _itemsSold.increment();

//         _transfer(address(this), msg.sender, tokenId);

//         payable(owner).transfer(listingPrice);
//         payable(idToMarketItem[tokenId].seller).transfer(msg.value);
//     }

//     //GETTING UNSOLD NFT DATA

//     function fetchMarketItem() public view returns (MarketItem[] memory) {
//         //first get thge total items in the marketplace
//         uint256 itemCount = _tokenIds.current();
//         uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
//         uint256 currentIndex = 0;

//         //we will create a new array that will be capable of  only containing the items not sold

//         MarketItem[] memory items = new MarketItem[](unsoldItemCount);

//         //note: the unsold NFT belong to the address of the contract , i.e owner is address(this)
//         for (uint256 i = 0; i < itemCount; i++) {
//             //if the current item is not sold
//             if (idToMarketItem[i + 1].owner == address(this)) {
//                 uint256 currentId = i + 1;
//                 MarketItem storage currentItem = idToMarketItem[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex += 1;
//             }
//         }

//         return items;
//     }

//     //Single USer Purc+hased Item
//     //PURCHASED ITEM
//     function fetchMyNft() public view returns (MarketItem[] memory) {
//         uint256 totalCount = _tokenIds.current();
//         uint256 itemCount = 0; //this will help us get the number of items owned by the msg.sender
//         uint256 currentIndex = 0;

//         //Here to get the itemCount
//         for (uint256 i = 0; i < totalCount; i++) {
//             if (idToMarketItem[i + 1].owner == msg.sender) {
//                 itemCount += 1;
//             }
//         }
//         //here to use the current id to get the items associated to the current id and save each in the newly created array
//         MarketItem[] memory items = new MarketItem[](itemCount);
//         for (uint256 i = 0; i < totalCount; i++) {
//             if (idToMarketItem[i + 1].owner == msg.sender) {
//                 uint256 currentId = i + 1;
//                 MarketItem storage currentItem = idToMarketItem[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex += 1;
//             }
//         }
//         return items;
//     }

//     //SINGLE USER ITEM
//     //we want to display the information about the NFT individually

//     function fetchItemsListed() public view returns (MarketItem[] memory) {
//         uint256 totalCount = _tokenIds.current();
//         uint256 itemCount = 0;
//         uint256 currentIndex = 0;

//         for (uint256 i = 0; i < totalCount; i++) {
//             if (idToMarketItem[i + 1].seller == msg.sender) {
//                 itemCount += 1;
//             }
//         }
//         MarketItem[] memory items = new MarketItem[](itemCount);

//         for (uint256 i = 0; i < totalCount; i++) {
//             if (idToMarketItem[i + 1].seller == msg.sender) {
//                 uint256 currentId = i + 1;

//                 MarketItem storage currentItem = idToMarketItem[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex += 1;
//             }
//         }
//         return items;
//     }
// }
contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // constructor() ERC721(“Metaverse Tokens”, “METT”) {
    //     owner = payable(msg.sender);
    // }
    constructor() ERC721("NFT Metaverse Token", "MYNFT") {
        owner == payable(msg.sender);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public payable {
        // require(
        //     owner == msg.sender,
        //     “only marketplace owner can update listing price.”
        // );
        require(
            owner == msg.sender,
            "Only market owner can update the lsiting price"
        );
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
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
        // require(price > 0, “Price must be at least 1 wei”);
        require(price > 0, "Price must be at least 1 wei");
        // require(
        //     msg.value == listingPrice,
        //     “Price must be equal to listing price”
        // );
        require(
            msg.value == listingPrice,
            "Price must be eqaul to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        // require(
        //     idToMarketItem[tokenId].owner == msg.sender,
        //     “Only item owner can perform this operation”
        // );
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        // require(
        //     msg.value == listingPrice,
        //     “Price must be equal to listing price”
        // );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        // require(
        //     msg.value == price,
        //     “Please submit the asking price in order to complete the purchase”
        // );
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
