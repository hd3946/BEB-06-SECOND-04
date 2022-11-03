import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { postDelete, postLike, postUpdate } from "../../../api/post";
import { postValidate } from "../../../libs/validate";

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

        margin: 20px 0px 20px 0px;
      }
      .updateContentBox {
        height: 100%;
        textarea {
          font-size: 16px;
          margin-bottom: 0px;
          padding: 0px;
          border: 0px;
          background-color: antiquewhite;
          outline: 1px solid rgba(129, 129, 129, 0.479);
          resize: block;
        }
        .updateButton {
          height: 30px;
          margin: 0;
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
    margin-top: 15px;
    background-color: rgba(82, 192, 255, 0.6);
  }

  .pageEtcBox {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    margin: 10px 0px 10px 0px;
    .pageRorLBox {
      position: absolute;
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
        :hover {
          background-color: rgba(255, 0, 0, 0.5);
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
  const { content, postId, title, User } = data;
  const [updateTogglem, setUpdateToggle] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);

  // 좋아요 작업하기
  const likeUp = async () => {
    console.log("좋아요 클릭!");
    // console.log(data);
    //const { status } = await postLike(postId);
    //if (status === 200) {
    // 해당 글의 좋아요 수를 가져와 임시로 1 더해주기
    // 좋아요 이후 홈으로가거나 사용자가 새로고침을 하면 1+가 업데이트 된 글을 가져옴
    // 이렇게 하는 이유는 좋아요 누를 때 리랜더링을 줄이기 위해
    //}
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
    if (updateTogglem && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    } else if (!updateTogglem) {
      setUpdateContent(data.content);
    }
  }, [updateTogglem]);

  return (
    <PageBox path={path}>
      <div className="pageHeader">
        <div className="pageUserProfileBox cc">
          <img src="" alt="Profile" />
        </div>
        <div className="pageUserBox">
          <Link
            to={`/detail?${postId}`}
            onClick={(e) => {
              if (path === "detail" || updateTogglem) {
                e.preventDefault();
              }
            }}
          >
            <div>
              <div className="pageUserName">{User.nickname}</div>
              <div className="pageUsertitle">{title}</div>
            </div>
          </Link>
          {updateTogglem ? (
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

      {data.img ? (
        <div className="pageImgBox">
          <img src={data.img} alt="img 공간" />
        </div>
      ) : null}

      <div className="pageEtcBox">
        {path === "detail" ? (
          <div className="pageRorLBox">
            <div className="count">0 Reply</div>
            <div className="count">0 Likes</div>
          </div>
        ) : null}

        <div className="pageiconBox">
          {postValidate(User.nickname) ? (
            <div className="cc">
              <div
                className="icon"
                onClick={() => {
                  setUpdateToggle(!updateTogglem);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </div>
              <div className="icon delete" onClick={() => postDeleteCall()}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </div>
            </div>
          ) : null}

          {/* <div className="icon">
            <FontAwesomeIcon icon="fa-regular fa-message" />
          </div> */}

          <div className="icon likeButton" onClick={() => likeUp()}>
            <FontAwesomeIcon icon="fa-heart-circle-plus" />
          </div>
        </div>
      </div>
    </PageBox>
  );
};

export default Page;
