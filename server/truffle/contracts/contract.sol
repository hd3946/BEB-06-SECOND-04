// // SPDX-License-Identifier: GPL-3.0
// pragma solidity ^0.8.10;

// // 오류로 표시되서 주석처리했습니다 deploy시에는 주석 풀어주세요
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract FantasticToken is ERC20 {
//     constructor() ERC20("FanstasticToken", "Token") {
//           _mint(msg.sender, 100000000e18);
//     }

// }

// contract FantasticNFT is ERC721URIStorage, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;
//     IERC20 token;
//     uint256 nftPrice;

//     constructor() ERC721("FanstasticNFT", "NFT") {
//         nftPrice = 100e18;
//     }

//     function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
//         require(token.balanceOf(recipient) > nftPrice);

//         token.transferFrom(recipient, msg.sender, nftPrice);
        
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();
//         _mint(recipient, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         return newItemId;
//     }

//     function setToken (address tokenAddress) public returns (bool) {
//         require(tokenAddress != address(0x0));
//         token = IERC20(tokenAddress);
//         return true;
//     }
// }