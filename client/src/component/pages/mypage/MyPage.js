import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Mynft from "./Mynft";
import Myposts from "./Myposts";
import Send from "./Send";

const MypageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .mypageHeader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    background-color: rgb(82, 192, 255);
    .mypageProfileImg {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-top: 35px;
      background-color: white;
      div {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background-color: rgb(82, 192, 255);
        img {
          object-fit: cover;
        }
      }
    }

    .headerLine {
      //width: 100%;
      background-color: rgb(82, 192, 255);
      z-index: -10;
    }
  }

  .mypageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    .mypageProfile {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 150px;
      text-align: center;
      /* align-items: center; */
      .mypageMyCoin {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        right: 0px;
        margin: 5px 10px;
        transform: translateX(-10px);
        .coinIcon {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          .fa-brands {
          }
        }
        .coinSymbol {
          margin-right: -50px;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .faucetEth {
        position: absolute;
        top: 70px;
        right: -50px;
        font-size: 18px;
      }
      .faucetButton {
        position: absolute;
        top: 116px;
        right: -53px;
      }
      button {
        width: 64px;
        height: 34px;
        border-radius: 11px;
      }
      .mypageName {
        font-size: 20px;
        font-weight: 600;
      }
      .mypageAccount {
        margin-top: 7px;
      }
    }
  }
`;

const Mypage = () => {
  const [eth, setEth] = useState(0);
  const [userAddr, setUserAddr] = useState("");
  const { email, account, nickname, balance } = useSelector(
    (state) => state.user
  );

  //get 1 eth
  function getEth() {
    axios
      .post(
        `http://localhost:3005/contract/eth`,
        {
          userAddr: userAddr,
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        setEth(eth + 1);
      })
      .catch((err) => console.log(err));
  }

  return (
    <MypageBox>
      <div className="mypageHeader">
        <div className="mypageProfileImg cc">
          <div className="cc">
            <img src="" alt="프사" />
          </div>
        </div>
        <div className="headerLine" />
      </div>

      <div className="mypageBody">
        <div className="mypageProfile">
          <div className="mypageMyCoin">
            <div className="coinIcon cc">
              <FontAwesomeIcon
                icon="fa-brands fa-bitcoin"
                size="2x"
                color="#555555"
              />
            </div>
            <div className="coinSymbol">{balance ? balance : 0} FTC</div>
            <div className="faucetEth"> {eth} ETH</div>
            <div className="faucetButton">
              <button onClick={getEth}>faucet</button>
            </div>
          </div>
          <div className="mypageName">{nickname}</div>
          <div className="mypageAccount">{account}</div>
        </div>

        <Send />
        <Myposts />
        <Mynft />
      </div>
    </MypageBox>
  );
};

export default Mypage;
