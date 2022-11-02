import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { check, filtering, postlist } from "../../../store/slice";
import { postListCall, postWrite } from "../../../api/post";
import { validate } from "../../../libs/validate";

const MainTopBox = styled.div`
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
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-right: 0px;
        :focus {
          background-color: rgba(189, 189, 189, 0.1);
          outline: none;
        }
      }
      .iconBox {
        position: absolute;
        width: 40px;
        height: 100%;
        border: 1px solid rgba(155, 155, 155, 0.5);
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
      flex-direction: column;
      align-items: flex-end;

      width: 100%;
      //height: 120px;
      margin-top: 20px;
      /* background-color: rgba(255, 106, 106, 0.493); */

      input {
        width: 325px;
        height: 20px;
        padding: 5px 5px;
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-bottom: 0px;
        background-color: ${(props) =>
          props.inputCheck.title ? "rgb(253, 255, 224)" : "white"};
        transition: 0.2s;
        :focus {
          outline: none;
        }
      }
      textarea {
        width: ${(props) => (props.active ? "260px" : "260px")};
        height: ${(props) => (props.active ? "80px" : "0px")};
        padding: ${(props) =>
          props.active ? "5px 70px 0px 5px" : "0px 70px 0px 5px"};
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-bottom: 0px;
        background-color: ${(props) =>
          props.inputCheck.content ? "rgb(253, 255, 224)" : "white"};
        transition: 0.3s;
        :focus {
          outline: none;
        }
      }
      .buttonBox {
        //position: absolute;
        right: 10px;

        //background-color: rgba(255, 106, 106, 0.493);
        button {
          width: 337px;
          height: 30px;
          color: white;
          ${(props) =>
            props.inputCheck.title && props.inputCheck.content
              ? "background-color: rgb(82, 192, 255)"
              : "background-color: rgb(255, 82, 82)"};
          border: 1px solid rgba(155, 155, 155, 0.5);
          cursor: pointer;
          transition: 0.2s;
          :hover {
            ${(props) =>
              props.inputCheck.title && props.inputCheck.content
                ? css`
                    background-color: rgb(25, 171, 255);
                    cursor: pointer;
                  `
                : css`
                    background-color: rgb(255, 82, 82);
                    cursor: not-allowed;
                  `};
          }
        }
      }
    }
  }
`;

const MainTop = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);

  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [inputCheck, setInputCheck] = useState({
    title: false,
    content: false,
  });

  const searchFilter = () => {
    const test = list.filter((data, index) => data.nickname === text);
    dispatch(
      filtering({
        list: test,
      })
    );
  };

  const posting = async () => {
    const { title, content } = inputCheck;

    if (title && content) {
      dispatch(check({ type: "loading" }));
      const { status } = await postWrite(postData);

      if (status) {
        const { data } = await postListCall();
        dispatch(postlist({ list: data.postList.reverse() }));
        setPostData({
          title: "",
          content: "",
        });
        setInputCheck({
          title: false,
          content: false,
        });
        dispatch(check({ type: "" }));
      }
    }
  };

  const enterAction = (type) => {
    const { title, content } = postData;
    if (type === "search") {
      searchFilter();
    } else if (type === "desc" && title && content) {
      // 제목과 내용이 다 있을 경우
      posting();
    } else if (type === "desc" && !title) {
      // 제목이 없을 경우
      alert("제목이 없습니다!");
    }
  };

  return (
    <MainTopBox active={active} inputCheck={inputCheck}>
      <div className="inputBox">
        <div className="search">
          <input
            placeholder="찾을 사람 검색!"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("search");
              }
            }}
          />
          <div className="iconBox cc" onClick={() => searchFilter()}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>

        <div
          className="postingBox"
          onClick={() => {}}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={
            validate() ? { pointerEvents: "block" } : { pointerEvents: "none" }
          }
        >
          <input
            placeholder={
              validate()
                ? "무슨일이 일어나고 있나요? (title)"
                : "로그인을 해주세요!"
            }
            value={postData.title}
            onChange={(e) => {
              if (e.target.value) {
                setInputCheck({
                  ...inputCheck,
                  title: true,
                });
              } else {
                setInputCheck({
                  ...inputCheck,
                  title: false,
                });
              }
              setPostData({ ...postData, title: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("desc");
              }
            }}
          />

          <textarea
            placeholder="자세하게 말해주세요! (contant)"
            className="ta"
            value={postData.content}
            maxLength={50}
            onChange={(e) => {
              if (e.target.value) {
                setInputCheck({
                  ...inputCheck,
                  content: true,
                });
              } else {
                setInputCheck({
                  ...inputCheck,
                  content: false,
                });
              }
              setPostData({
                ...postData,
                content: e.target.value.replace(/\n/g, ""),
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("desc");
              }
            }}
          />
          <div className="buttonBox cc" onClick={() => posting()}>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </MainTopBox>
  );
};

export default MainTop;
