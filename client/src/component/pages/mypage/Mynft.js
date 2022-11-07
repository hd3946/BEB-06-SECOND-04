import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const MynftBox = styled.div`
  width: 100%;
  margin-top: 84px;
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
      object-fit: cover;
      overflow: hidden;
      width: 145px;
      height: 180px;
      background-color: #bbd0ff;
      border: 0.5px solid black;
      border-radius: 5px;
      margin: 5px 17px 10px 0px;
      cursor: pointer;
      transition: 0.2s;
      :hover {
        box-shadow: 0px 1px 5px rgba(116, 116, 116, 0.5);
      }
      img {
        width: 100%;
        height: 100%;
        transition: 0.3s;
        :hover {
          width: 130%;
          height: 130%;
        }
      }
    }
  }
`;

const Mynft = () => {
  const [nftList, setNftList] = useState([]);

  const nftCall = () => {
    axios
      .get("http://localhost:3005/contract/mynft", {
        withCredentials: true,
      })
      .then((res) => {
        setNftList(res.data.myToken);
      });
  };

  useEffect(() => {
    nftCall();
  }, []);

  return (
    <MynftBox>
      <div className="myNftHeader">
        <FontAwesomeIcon icon={faImage} /> My NFT Box
      </div>
      <div className="myNftList">
        {nftList.length > 0 ? (
          nftList.map((data, index) => (
            <div className="myNft cc" key={index}>
              <img src={data.metaData.image} />
            </div>
          ))
        ) : (
          <div className="empty cc">보유한 NFT가 없습니다!</div>
        )}
      </div>
    </MynftBox>
  );
};

export default Mynft;
