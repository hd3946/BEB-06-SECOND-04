import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import styled from "styled-components";

const SearchBox = styled.div`
  .inputBox {
    width: 100%;
    height: 100px;
    .search {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      height: 30px;
      input {
        width: 280px;
        height: 100%;
        padding: 0px 45px 0px 10px;
        border: 1px solid black;
        border-right: 0px;
      }
      .iconBox {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 100%;
        border: 1px solid black;
        border-left: 0px;
        transition: 0.2s;
        cursor: pointer;
        :hover {
          background-color: rgba(124, 124, 124, 0.3);
        }
      }
    }
    .postingBox {
      position: relative;
      display: flex;
      flex-direction: row-reverse;

      width: 100%;
      height: 60px;
      margin-top: 20px;

      textarea {
        width: 272px;
        height: 100%;
        padding-right: 60px;
        resize: none;
        overflow: hidden;
      }
      .buttonBox {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 10px;
        width: 40px;
        height: 110%;

        button {
          width: 50px;
          height: 50%;
          color: white;
          background-color: rgb(82, 192, 255);
          border: 1px solid rgba(155, 155, 155, 0.5);
          cursor: pointer;
          transition: 0.2s;
          :hover {
            background-color: rgba(82, 192, 255, 0.8);
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [text, setText] = useState({
    searchId: "",
    postText: "",
  });

  const posting = () => {
    //axios.get
  };
  return (
    <SearchBox>
      <div className="inputBox">
        <div className="search">
          <input
            placeholder="찾을 사람 검색!"
            onChange={(e) => setText({ ...text, searchId: e.target.value })}
          />
          <div className="iconBox">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>

        <div className="postingBox">
          {/* <input placeholder="무슨일이 일어나고 있나요?" /> */}
          <textarea
            placeholder="무슨일이 일어나고 있나요?"
            onChange={(e) => setText({ ...text, postText: e.target.value })}
          />
          <div className="buttonBox">
            <button>Enter</button>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};

export default Search;
