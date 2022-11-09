import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  check,
  filtering,
  postlist,
  searchControl,
} from "../../../store/slice";
import { postListCall, postWrite } from "../../../api/post";
import { validate } from "../../../libs/validate";

const SearchAndPostBox = styled.div`
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
      margin-top: 20px;

      .imageAdd {
        position: absolute;
        flex-direction: column;
        right: 337px;
        //transform: translateX(-337px);
        width: 200px;
        height: 32px;
        z-index: 1;
        label {
          width: 100%;
          height: 100%;
          background-color: aliceblue;
          transition: 0.2s;
          :hover {
            background-color: #d0e9ff;
          }
        }
        .imageInput {
          width: 100%;
          height: 100%;
          margin: 0px;
          padding: 0px;
          border: 0px;
          //outline: 0px;
          background-color: aliceblue;
          z-index: 1;
        }
        .postFileName {
          position: absolute;
          transform: translateY(25px);
        }
      }
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
        right: 10px;
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

const SearchAndPost = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);

  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    file: null,
  });
  const [inputCheck, setInputCheck] = useState({
    title: false,
    content: false,
  });

  const searchFilter = (searchText) => {
    dispatch(check({ type: "loading" }));
    const filterList = list.filter((data, index) => {
      return data.User.nickname === searchText;
    });

    dispatch(searchControl({ searchText }));
    dispatch(filtering({ list: filterList.reverse() }));
    setSearchText("");
    dispatch(check({ type: "" }));
  };

  const posting = async () => {
    const { title, content } = inputCheck;
    let formData = new FormData();

    formData.append("title", postData.title);
    formData.append("content", postData.content);
    console.log(postData.file);
    if (postData.file) {
      formData.append("image", postData.file[0]);
    } else {
      formData.append("image", null);
    }
    if (title && content) {
      dispatch(check({ type: "loading" }));
      const { status } = await postWrite(formData);

      if (status) {
        const { data } = await postListCall();
        dispatch(postlist({ list: data.postList }));
        setPostData({
          title: "",
          content: "",
        });
        setInputCheck({
          title: false,
          content: false,
        });
        dispatch(check({ type: "" }));
        //window.location.href = `/`;
        return;
      }
    }
    dispatch(check({ type: "" }));
    //window.location.href = `/`;
  };

  const enterAction = (type) => {
    const { title, content } = postData;
    if (type === "search") {
      searchFilter(searchText);
    } else if (type === "desc" && title && content) {
      // 제목과 내용이 다 있을 경우
      posting();
    } else if (type === "desc" && !title) {
      // 제목이 없을 경우
      alert("제목이 없습니다!");
    }
  };

  return (
    <SearchAndPostBox active={active} inputCheck={inputCheck}>
      <div className="inputBox">
        <div className="search">
          <input
            placeholder="찾을 사람 검색!"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("search");
              }
            }}
          />
          <div className="iconBox cc" onClick={() => searchFilter(searchText)}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>

        <div
          className="postingBox"
          onClick={() => {
            if (!validate()) {
              dispatch(check({ type: "login" }));
            }
          }}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        >
          <div className="imageAdd cc">
            <input
              type="file"
              id="postFileUpload"
              className="imageInput"
              style={{ display: "none" }}
              onChange={(e) => {
                console.log(e.target.files.length);
                if (e.target.files.length === 1) {
                  setPostData({ ...postData, file: e.target.files });
                } else {
                  setPostData({ ...postData, file: "" });
                }
              }}
            />
            <label
              className="cc"
              htmlFor="postFileUpload"
              style={{ cursor: "pointer" }}
            >
              {/* <FontAwesomeIcon icon="fa-regular fa-image" /> */}
              <div className="dragdrop cc">
                <FontAwesomeIcon icon="fa-regular fa-image" />
              </div>
            </label>
            {postData.file ? (
              <div className="postFileName">{postData.file[0].name}</div>
            ) : null}
          </div>
          <input
            placeholder={
              validate()
                ? "무슨일이 일어나고 있나요? (title)"
                : "로그인을 해주세요!"
            }
            tabIndex={validate() ? 1 : -1}
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
            tabIndex={validate() ? 1 : -1}
            value={postData.content}
            maxLength={150}
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
            <button tabIndex={-1}>Enter</button>
          </div>
        </div>
      </div>
    </SearchAndPostBox>
  );
};

export default SearchAndPost;
