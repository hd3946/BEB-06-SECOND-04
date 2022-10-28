import React from "react";
import styled from "styled-components";

const MintingPageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 100px 0px 100px;
  .mintingHeader {
    .tapMinting {
      width: 250px;
      padding-bottom: 5px;
      text-align: center;
      font-weight: 600;
      border-bottom: 3px solid rgb(82, 192, 255);
      cursor: pointer;
    }
  }

  .mintingBody {
    flex-direction: column;
    margin-top: 70px;
    text-align: center;
    .mintingText1 {
      font-size: 20px;
      font-weight: 500;
    }
    .mintingText2 {
      margin-top: 10px;
      font-size: 18px;
    }
    .mintingImg {
      object-fit: cover;
      width: 400px;
      height: 400px;
      margin-top: 30px;
      background-color: #e5daff;
      border: 2px solid rgba(110, 110, 110, 0.8);
    }
    input,
    textarea {
      width: 420px;
      border: 2px solid rgba(110, 110, 110, 0.8);
      padding: 0px 5px 0px 5px;
    }
    .mintingNFTName {
      margin-top: 30px;
      input {
        height: 30px;
      }
    }
    .mintingNFTDesc {
      margin-top: 10px;
      textarea {
        height: 70px;
        padding-top: 5px;
        resize: none;
        overflow: hidden;
      }
    }
    .mintingB {
      margin-top: 30px;
      background-color: #e5daff;
      button {
        width: 120px;
        height: 40px;
        border: 0px;
        color: white;

        background-color: rgb(82, 192, 255);
      }
    }
  }
`;

const MintingPage = () => {
  return (
    <MintingPageBox>
      <div className="mintingHeader">
        <div className="tapMinting">Minting</div>
      </div>
      <div className="mintingBody cc">
        <div className="mintingText1">Create your own NFT</div>
        <div className="mintingText2">Minting per 1 FTC</div>
        <div className="mintingImg cc">
          <img src="" alt="이미지" />
        </div>
        <div className="mintingNFTName">
          <input placeholder="NFT name" />
        </div>
        <div className="mintingNFTDesc">
          <textarea placeholder="Description" />
        </div>
        <div className="mintingB">
          <button>MINTING</button>
        </div>
      </div>
    </MintingPageBox>
  );
};

export default MintingPage;
