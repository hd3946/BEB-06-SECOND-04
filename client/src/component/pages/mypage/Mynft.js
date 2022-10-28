import React from "react";
import styled from "styled-components";

const MynftBox = styled.div`
  width: 100%;
  margin-top: 30px;
  overflow-x: hidden;
  .myNftHeader {
    font-size: 18px;
    font-weight: 500;
  }
  .myNftList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 187px;
    margin-top: 10px;
    overflow-y: hidden;
    .myNft {
      display: flex;
      justify-content: center;
      align-items: center;
      object-fit: cover;
      width: 145px;
      height: 180px;
      background-color: #bbd0ff;
      border: 1px solid black;
      margin: 0px 10px 10px 0px;
      cursor: pointer;
      transition: 0.2s;
      :hover {
        box-shadow: 0px 1px 5px rgba(116, 116, 116, 0.5);
      }
    }
  }
`;

const Mynft = () => {
  return (
    <MynftBox>
      <div className="myNftHeader">My NFT</div>
      <div className="myNftList">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
          <div className="myNft">
            <img src="" alt={index} />
          </div>
        ))}
      </div>
    </MynftBox>
  );
};

export default Mynft;
