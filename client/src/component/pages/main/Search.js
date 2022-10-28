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
      }
      .buttonBox {
        position: absolute;
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
  const [text, setText] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    desc: "",
  });

  const searchFilter = () => {
    console.log("검색 버튼 누름!");
    // 이미 받은 content list에서 filter 시켜 해당 content 노출
  };
  // /post
  const posting = () => {
    console.log("포스팅 post 요청");
    axios
      .post(
        `http://localhost:3005/post`,
        {
          post: {
            email: "redux에 저장된 로그인한 유저 email을 넣어주기",
            title: "",
            desc: postData.desc,
          },
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
  };

  const enterAction = (key, type) => {
    console.log(key);
    if (type === "search") {
      searchFilter();
    } else if (type === "desc") {
      posting();
    }
  };

  return (
    <SearchBox>
      <div className="inputBox">
        <div className="search">
          <input
            placeholder="찾을 사람 검색!"
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction(e.key, "search");
              }
            }}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="iconBox cc" onClick={() => searchFilter()}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>

        <div className="postingBox">
          {/* title input 만들기 */}
          <textarea
            placeholder="무슨일이 일어나고 있나요?"
            className="ta"
            value={postData.desc}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction(e.key, "desc");
              }
            }}
            onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
          />
          <div className="buttonBox cc" onClick={() => posting()}>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};

export default Search;
