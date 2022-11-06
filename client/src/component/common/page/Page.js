import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  postDelete,
  postLike,
  postListCall,
  postUpdate,
} from "../../../api/post";
import { loginInfo, postValidate, validate } from "../../../libs/validate";
import { detailPageCall, postlist } from "../../../store/slice";

const PageBox = styled.div`
  width: 100%;
  border-bottom: ${(props) =>
    props.path !== "detail" ? "2px solid rgba(36, 36, 36, 0.5)" : null};
  margin-top: 20px;
  a {
    display: flex;
    width: 100%;
    color: black;
    text-decoration: none;
    cursor: default;
    transition: 0.3s;
    :hover {
      background-color: aliceblue;
    }
  }
  .pageHeader {
    display: flex;
    width: 100%;
    .pageUserProfileBox {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(82, 192, 255, 0.6);
      img {
        object-fit: cover;
      }
    }
    .pageUserBox {
      width: 90%;
      margin-left: 10px;

      .pageUsertitle {
        margin-top: 10px;
        font-weight: 500;
      }
      .pageUserDesc {
        position: relative;
        left: -60px;
        width: 110%;

        margin: 20px 0px 10px 0px;
      }
      .updateContentBox {
        height: 100%;
        textarea {
          font-size: 16px;
          padding: 0px;
          border: 0px;
          background-color: antiquewhite;
          outline: 1px solid rgba(129, 129, 129, 0.479);
          resize: block;
        }
        .updateButton {
          height: 30px;
          border: 1px solid black;
          background-color: antiquewhite;
          font-size: 18px;
          font-weight: 700;
          transition: 0.3s;
          :hover {
            background-color: rgb(255, 185, 94);
          }
        }
      }
    }
  }

  .pageImgBox {
    margin-top: 10px;
    background-color: rgba(82, 192, 255, 0.6);
  }

  .pageEtcBox {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0px 10px 0px;
    .pageRorLBox {
      //position: absolute;
      left: 0px;
      display: flex;
      justify-content: space-between;

      .count {
        display: flex;
        align-items: center;
        height: 50px;
        margin: 0px 25px 0px 10px;
        font-weight: 500;
      }
    }
    .pageiconBox {
      display: flex;
      justify-content: space-between;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin-left: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.2s;
        :hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      .delete {
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
        color: red;
        font-weight: 700;
        :hover {
          background-color: rgba(255, 0, 0, 0.3);
        }

        .t1 {
          position: absolute;
          right: 50%;
          width: 50px;
          height: 50px;
          overflow: hidden;
          transition: 0.3s;
          transform: ${(props) =>
            props.deleteCheck ? "translateX(-30px)" : null};

          ::before {
            position: absolute;
            right: -11px;
            content: "🗑️";
          }
        }
        .t2 {
          position: absolute;
          left: 50%;
          width: 50px;
          height: 50px;
          overflow: hidden;
          transition: 0.3s;
          transform: ${(props) =>
            props.deleteCheck ? "translateX(30px)" : null};
          ::after {
            position: absolute;
            left: -11px;
            content: "🗑️";
          }
        }
      }
    }
  }
`;

const Page = ({ data }) => {
  const textareaRef = useRef();
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.slice(1);
  const { content, postId, title, User, PostLikes, Comments, img } = data;
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [likeCheck, setLikeCheck] = useState(false);
  console.log(data);
  const dispatch = useDispatch();
  const postLikeUp = async () => {
    const { status } = await postLike(postId);
    if (status) {
      const pL = await postListCall();
      dispatch(postlist({ list: pL.data.postList }));
      if (path === "detail") {
        window.location.href = `/detail?${postId}`;
      } else {
        setLikeCheck(false);
      }
    }
  };

  const postUpdateCall = async () => {
    const postDate = {
      postId,
      title,
      content: updateContent,
    };
    const { status } = await postUpdate(postDate);
    if (status) {
      if (path === "detail") {
        window.location.href = `/detail?${postId}`;
      } else {
        window.location.href = `/`;
      }
    }
  };

  const postDeleteCall = async () => {
    const { status, data } = await postDelete({ postId });
    console.log(data);
    if (status) {
      window.location.href = `/`;
    }
  };

  const resizeHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    if (updateToggle && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    } else if (!updateToggle) {
      setUpdateContent(data.content);
    }
  }, [updateToggle]);

  useEffect(() => {
    const signData = loginInfo();
    if (!likeCheck && signData) {
      for (let like of PostLikes) {
        if (like.User.nickname === signData.nickname) {
          setLikeCheck(true);
          return;
        }
      }
    }
  }, [PostLikes]);

  return (
    <PageBox path={path} deleteCheck={deleteCheck} likeCheck={likeCheck}>
      <div className="pageHeader">
        <div className="pageUserProfileBox cc">
          <img src="" alt="Profile" />
        </div>
        <div className="pageUserBox">
          <Link
            to={`/detail?${postId}`}
            onClick={(e) => {
              if (path === "detail" || updateToggle) {
                e.preventDefault();
              }
            }}
          >
            <div>
              <div className="pageUserName">{User.nickname}</div>
              <div className="pageUsertitle">{title}</div>
            </div>
          </Link>
          {updateToggle ? (
            <div className="updateContentBox">
              <textarea
                ref={textareaRef}
                className="pageUserDesc ta"
                value={updateContent}
                onChange={(e) => {
                  resizeHeight();
                  setUpdateContent(e.target.value);
                }}
              />
              <button
                className="pageUserDesc updateButton"
                onClick={() => postUpdateCall()}
              >
                수정하기
              </button>
            </div>
          ) : (
            <div className="pageUserDesc">{updateContent}</div>
          )}
        </div>
      </div>

      {img ? (
        <div className="pageImgBox">
          <img src={img} alt="img 공간" />
        </div>
      ) : null}
      <div className="pageEtcBox">
        <div className="pageRorLBox">
          <div className="count">{Comments.length} Reply</div>
          <div className="count">{PostLikes.length} Likes</div>
        </div>

        <div className="pageiconBox">
          {postValidate(User.nickname) ? (
            <div className="cc">
              <div
                className="icon"
                onClick={() => {
                  setUpdateToggle(!updateToggle);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </div>
              <div
                className="icon delete"
                onClick={(e) => {
                  if (!deleteCheck) {
                    setDeleteCheck(true);
                  } else if (deleteCheck) {
                    postDeleteCall();
                  }
                }}
                onMouseLeave={(e) => {
                  if (deleteCheck) {
                    setDeleteCheck(false);
                  }
                }}
              >
                <div className="t1 cc" />
                {deleteCheck ? "삭제?" : null}
                <div className="t2 cc" />
              </div>
            </div>
          ) : null}

          {validate() ? (
            <div className="icon likeButton" onClick={() => postLikeUp()}>
              {likeCheck ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-heart"
                  style={{ color: "red" }}
                />
              ) : (
                <FontAwesomeIcon icon="fa-heart-circle-plus" />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </PageBox>
  );
};

export default Page;
