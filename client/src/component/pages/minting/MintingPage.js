import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { check } from "../../../store/slice";
import DragDrop from "./DragDrop";
import axios from "axios";

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
    .attri-BTN {
      padding: 1px 1px 1px 400px;
      button {
        margin: 3px 5px 0px 0px;
        background-color: white;
        border: 1px solid;
        border-radius: 10px;
        cursor: pointer;
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
        transition: 0.2s;
        cursor: pointer;

        :hover {
          color: #000000;
          background-color: rgb(0, 162, 255);
        }
      }
    }
  }
`;

const MintingPage = () => {
  const [fileData, setFileData] = useState(null); // 이미지 데이터
  const [nftName, setNftName] = useState(""); // nft 이름
  const [description, setDescription] = useState(""); // nft 설명
  const [categorys, setCategory] = useState([{ trait_type: "", value: "" }]);
  const [imgURL, setImgURL] = useState(null); //imgURL base64
  const dispatch = useDispatch();
  console.log(categorys);
  //DragDrop 에서 imgURL 바꿔 줄 수 있는 함수
  const setImageUrl = (data) => {
    setImgURL(data);
  };
  const inputCategoryType = (e, idx) => {
    let newInput = [...categorys];
    newInput[idx].trait_type = e.target.value;
    setCategory(newInput);
  };

  const inputValueType = (e, idx) => {
    let newInput = [...categorys];
    newInput[idx].value = e.target.value;
    setCategory(newInput);
  };

  const addInput = () => {
    let input = { trait_type: "", value: "" };
    setCategory([...categorys, input]);
  };

  const deleteInput = () => {
    setCategory(categorys.slice(0, categorys.length - 1));
  };

  const handleMint = (e) => {
    dispatch(check({ type: "loading" }));

    let formData = new FormData(); //formdata object

    // formData.append("url", fileData);
    formData.append("name", nftName);
    formData.append("description", description);
    formData.append("image", fileData);
    formData.append("attributes", JSON.stringify(categorys));

    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    const config = {
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    };

    axios
      .post("http://localhost:3005/contract/mint", formData, config)
      .then((res) => {
        console.log(res);
        dispatch(check({ type: "success" }));
      })
      .catch((err) => console.err);

    dispatch(check({ type: "" }));
  };

  return (
    <MintingPageBox>
      <div className="mintingHeader">
        <div className="tapMinting">Minting</div>
      </div>
      <div className="mintingBody cc">
        <div className="mintingText1">Create your own NFT</div>
        <div className="mintingText2">Minting per 1 FTC</div>

        <DragDrop
          setFileData={setFileData}
          fileData={fileData}
          imgURL={imgURL}
          setImageUrl={setImageUrl}
        />

        <div className="mintingNFTName">
          <input
            placeholder="NFT name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
          />
        </div>
        <div className="mintingNFTDesc">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {categorys.map((a, idx) => (
          <div className="mintingNFTAttri">
            <textarea
              placeholder="Trait_Type"
              style={{
                width: "200px",
                height: "26px",
                margin: "5px 7px 0px 0px",
              }}
              onChange={(e) => inputCategoryType(e, idx)}
            />
            <textarea
              placeholder="Value"
              style={{ width: "200px", height: "26px" }}
              onChange={(e) => inputValueType(e, idx)}
            />
          </div>
        ))}
        <div className="attri-BTN">
          <button onClick={addInput}>+</button>
          <button onClick={deleteInput}>-</button>
        </div>

        <div className="mintingB">
          <button onClick={() => handleMint()}>MINTING</button>
        </div>
      </div>
    </MintingPageBox>
  );
};

export default MintingPage;
