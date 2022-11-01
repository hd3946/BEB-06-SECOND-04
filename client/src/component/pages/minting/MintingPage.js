import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { check } from "../../../store/slice";

const MintingPageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 100px 0px 100px;
  .mintingHeader {
    .tapMinting {
      margin: 45px;
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
      border: 2px dashed rgba(110, 110, 110, 0.8);
      position: relative;
    }
    #ex_file {
      position: absolute;
      top: 173px;
      left: 159px;
      border: 0;
    }
    .file_box {
      width: 238px;
      height: 300px;
      display: inline-block;
      border: 3px;
      cursor: pointer;
    }
    .uploadImageon {
      width: 397px;
      height: 399px;
      position: absolute;
      right: 2px;
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
  const [imageView, setImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { control } = useSelector((state) => state.state);
  const { email } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (!email) {
      dispatch(check({ type: "login" }));
    }
  }, []);

  const handleNftName = (e) => {
    setNftName(e.target.value);
    console.log(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };

  const uploadImage = (e) => {
    let file = e.target.files[0];
    const file_url = URL.createObjectURL(file);
    document.querySelector(".uploadImage").src = file_url;
    setImage(true);
    console.log(file_url);
    //blob:http://localhost:3000/aad74c35-6ea4-4745-b791-fdc827a52a59
  };

  const handlePost = (e) => {
    // if (e.target.files[0]) {
    //   const img = new FormData();
    //   img.append("file", e.target.files[0]);

    //   //value 확인
    //   for (let value of FormData.values()) {
    //     console.log(value);
    //   }

    //   axios
    //     .post(
    //       "http://localhost:3005/contract/mint",
    //       { token: 1, balance: 1 },
    //       { "Content-Type": "application/json", withCredentials: true }
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
    dispatch(check({ type: "loading" }));
    axios
      .post(
        "http://localhost:3005/contract/mint",
        { token: 1, balance: 1 },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        dispatch(check({ type: "success" }));
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(check({ type: "error" }));
        console.error(err);
      });
  };

  return (
    <MintingPageBox>
      <div className="mintingHeader">
        <div className="tapMinting">Minting</div>
      </div>
      <div className="mintingBody cc">
        <div className="mintingText1">Create your own NFT</div>
        <div className="mintingText2">Minting per 1 FTC</div>
        <div className="mintingImg">
          <label className="file_box" htmlFor="ex_file">
            <div className="file_label_div"></div>
          </label>
          <input
            type="file"
            id="ex_file"
            onChange={uploadImage}
            name="image"
            style={{ display: "none" }}
          ></input>
          <img className={"uploadImage" + (imageView ? "on" : "")}></img>
          {/* <img
            src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
            alt="파일 아이콘"
            class="image"
          /> */}
          <p class="message">Drag & Drops your files here</p>
          {/* <div className="mintingImg cc"></div> */}
        </div>
        <div className="mintingNFTName">
          <input placeholder="NFT name" onChange={handleNftName} />
        </div>
        <div className="mintingNFTDesc">
          <textarea placeholder="Description" onChange={handleDescription} />
        </div>
        <div className="mintingB">
          <button onClick={handlePost}>MINTING</button>
        </div>
      </div>
    </MintingPageBox>
  );
};

export default MintingPage;
