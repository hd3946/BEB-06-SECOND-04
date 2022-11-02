import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { postDelete, postUpdate } from "../../../api/post";
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
  const likeUp = () => {
    // 좋아요
    // 서버에서 좋아요 개수 업데이트
    // 클라에선 임시로 클릭한 글 좋아요 + 1 해주기
    // 이후 글 새롭게 받아오면 좋아요 적용된 글 받을 수 있음
    axios
      .post(
        `http://localhost:3005/post`,
        {
          email: "redux에 저장된 로그인한 유저 email을 넣어주기",
          contentId: "좋아요 누른 contentID",
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
  };
  // 좋아요 취소 ? 필요한가?
  const likeCancel = () => {
    // 좋아요 취소
    // 로그인한 유저의 좋아요 목록을 조회해 해당 글 아이디가 있다면
    // 좋아요 취소 버튼을 노출하고 likeCancel 함수 연결
    axios
      .put(
        `http://localhost:3005/post`,
        {
          email: "redux에 저장된 로그인한 유저 email을 넣어주기",
          contentId: "좋아요 누른 contentID",
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
  };

  const postUpdateCall = async () => {
    const postDate = {
      postId,
      title,
      content: updateContent,
    };
    const { status } = await postUpdate(postDate);
    if (status) {
      window.location.href = `/detail?${postId}`;
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
      {path === "detail" ? (
        <div className="pageHeader">
          <div className="pageUserProfileBox cc">
            <img src="" alt="Profile" />
          </div>
          <div className="pageUserBox">
            <div className="pageUserName">{User.nickname}</div>
            <div className="pageUsertitle">{title}</div>
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
      ) : (
        <div className="pageHeader">
          <Link to={`/detail?${postId}`}>
            <div className="pageUserProfileBox cc">
              <img src="" alt="Profile" />
            </div>
            <div className="pageUserBox">
              <div className="pageUserName">{data.User.nickname}</div>
              <div className="pageUsertitle">{title}</div>
              <div className="pageUserDesc">{content}</div>
            </div>
          </Link>
        </div>
      )}

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
                onClick={() => setUpdateToggle(!updateTogglem)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </div>
              <div className="icon delete" onClick={() => postDeleteCall()}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </div>
            </div>
          ) : null}

          <div className="icon">
            <FontAwesomeIcon icon="fa-regular fa-message" />
          </div>

          <div className="icon" onClick={() => likeUp()}>
            <FontAwesomeIcon icon="fa-heart-circle-plus" />
          </div>
        </div>
      </div>
    </PageBox>
  );
};

export default Page;
