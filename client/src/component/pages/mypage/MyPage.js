import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Mynft from "./Mynft";
import Myposts from "./Myposts";
import Send from "./Send";
import { info } from "../../../store/slice";

const MypageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .mypageHeader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 126px;
    background-color: rgb(82, 192, 255);
    .mypageProfileImg {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-top: 82px;
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
        font-size: 25px;
        font-weight: 600;
      }
      .mypageAccount {
        margin-top: 7px;
      }
    }
  }
`;

const Mypage = () => {
  const dispatch = useDispatch();
  const [userAddr, setUserAddr] = useState("");
  const { email, account, nickname, balance } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    getToken();
  }, []);

  function getToken() {
    axios
      .get(`http://localhost:3005/users/info`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) =>
        dispatch(
          info({
            email: res.data.loginData.email,
            account: res.data.loginData.address,
            nickname: res.data.loginData.nickname,
            balance: res.data.ethBalance,
          })
        )
      );
  }

  return (
    <MypageBox>
      <div className="mypageHeader">
        <div className="mypageProfileImg cc">
          <div className="cc">
            <div
              style={{
                textAlign: "center",
                fontSize: "41px",
                color: "white",
                fontWeight: "700",
                height: "57px",
              }}
            >
              {nickname ? nickname.charAt(0).toUpperCase() : "?"}
            </div>
            {/* <img src="" alt="프사"></img> */}
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
