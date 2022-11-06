import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Mynft from "./Mynft";
import Myposts from "./Myposts";
import Send from "./Send";
import axios from "axios";

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
  .edit-BTN {
    font-size: 14px;
    color: white;
    background-color: tomato;
    border-radius: 7px;
    cursor: pointer;
    z-index: 10;
    margin: 14px 1px 15px;
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

      .mypageMyCoin {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        right: 0px;
        margin: -19px 10px;
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
  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [myimgURL, setMyImgURL] = useState(""); // base64
  const [myFile, setMyFile] = useState(); //file 형식
  const [sendImg, setSendImg] = useState(false); //axios img
  console.log(JSON.parse(localStorage["userData"]));
  useEffect(() => {
    getMyInfo();
  }, []);

  function getMyInfo() {
    setNickname(JSON.parse(localStorage["userData"]).nickname);
    setAccount(JSON.parse(localStorage["userData"]).address);
    setTokenBalance(JSON.parse(localStorage["userData"]).tokenBalance);
    setMyImgURL(JSON.parse(localStorage["userData"]).profileImg);
  }

  //edit profile photo
  const onChangeProfile = async (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setMyImgURL(reader.result);
        resolve();
        setMyFile(e.target.files[0]);
        setSendImg(true);
      };
    });
  };

  function editBTN() {
    //Todo: 서버에 imgurl 보내주기
    // let formData = new FormData();
    // formData.append("image", myFile);
    // const config = {
    //   "Content-Type": "multipart/form-data",
    //   withCredentials: true,
    // };
    // axios
    //   .post("http://localhost:3005/users/img", formData, config)
    //   .then((res) => {
    //     res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("완료");
    setSendImg(false);
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
              {nickname && !myimgURL ? nickname.charAt(0).toUpperCase() : null}
            </div>
            {myimgURL && (
              <img
                src={myimgURL}
                style={{ borderRadius: "50%", width: "80px", height: "80px" }}
                alt="프사"
              ></img>
            )}
          </div>
        </div>
        <div className="headerLine" />
      </div>
      {sendImg ? (
        <div className="edit-BTN" onClick={editBTN}>
          수정
        </div>
      ) : (
        <div>
          {" "}
          <label className="input-file-BTN" for="input-file">
            <FontAwesomeIcon
              icon={faCamera}
              style={{ padding: "14px", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="input-file"
            style={{ display: "none" }}
            onChange={onChangeProfile}
          ></input>
        </div>
      )}

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
            <div className="coinSymbol">{tokenBalance} FTC</div>
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
