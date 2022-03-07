// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {Base64} from "./libraries/Base64.sol";

contract Web3Bottle is ERC721URIStorage, Ownable {
    uint256 public mintPrice;
    address public constant DEV_WALLET =
        0x0efA29A129487D4c8a42A1F306478BE5D6cD51A1;

    // keep track of tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Web3Bottle", "W3BOT") {
        mintPrice = 0;
    }

    // public mint function
    function mintNFT(string memory imageSvg) public payable {
        require(msg.value >= mintPrice, "Not enough ETH sent; check price!");
        uint256 newItemId = _tokenIds.current();

        // Encode JSON metadata to Base64
        // string memory json = Base64.encode(
        //     bytes(
        //         string(
        //             abi.encodePacked(
        //                 '{"name": Words by "',
        //                 msg.sender,
        //                 '", "description": "Bottle #"',
        //                 getCurrentTokenId(),
        //                 '"image": "data:image/svg+xml;base64,',
        //                 // add data:image/svg+xml;base64 and base64 encode of svg
        //                 imageSvg,
        //                 '"}'
        //             )
        //         )
        //     )
        // );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "words by 0x',
                        toAsciiString(msg.sender),
                        '", "description": "bottle number ',
                        Strings.toString(getCurrentTokenId()),
                        '", "image": "data:image/svg+xml;base64,',
                        imageSvg,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        // mints NFT with newItemId to msg.sender
        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        console.log(finalTokenUri);
    }

    // set mint price
    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    // withdraw from contract
    function withdrawAll() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");
        payable(DEV_WALLET).transfer(balance);
    }

    // get current tokenId
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
