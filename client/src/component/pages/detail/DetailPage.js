import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  commentDelete,
  commentLike,
  commentListCall,
  commentUpdate,
  commentWrite,
} from "../../../api/comment";
import { postListCall } from "../../../api/post";
import { postValidate } from "../../../libs/validate";
import { detailPageCall, postlist } from "../../../store/slice";
import Page from "../../common/page/Page";

const DetailPageBox = styled.div`
  flex-direction: column;
  width: 100%;
  padding-top: 50px;

  .pageBox {
    width: 700px;
  }
  .createReply {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    textarea {
      width: 530px;
      height: 80px;
      padding: 10px 70px 0px 100px;

      border: 2px solid rgba(110, 110, 110, 0.8);
    }
    .replyIn {
      position: absolute;
    }
    .createReplyProfile {
      object-fit: cover;
      width: 70px;
      height: 70px;
      transform: translate(-305px, 12px);
      background-color: #7a9bb8;
      border-radius: 50%;
    }
    .createReplyB {
      transform: translate(305px, 55px);
      button {
        width: 60px;
        height: 25px;
        border: 0px;
        color: white;
        background-color: rgba(20, 150, 224, 0.6);
        cursor: pointer;
        transition: 0.2s;
        :hover {
          background-color: rgba(20, 150, 224, 0.4);
        }
      }
    }
  }
  .replyList {
    flex-direction: column;
    width: 100%;
    margin-top: 25px;
    .replyHeader {
      display: flex;
      width: 600px;
      margin-top: 30px;
      .replyUserProfileBox {
        object-fit: cover;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(82, 192, 255, 0.6);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .replyUserBox {
        width: 90%;
        margin-left: 10px;
        .replyUserName {
          font-weight: 500;
        }
        .replyUserDesc {
          margin-top: 10px;
        }
      }
    }
  }
  .pageiconBox2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .icon2 {
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

    .delete2 {
      position: relative;
      width: 50px;
      height: 50px;
      overflow: hidden;
      color: red;
      font-weight: 700;
      :hover {
        background-color: rgba(255, 0, 0, 0.3);
      }

      .t11 {
        position: absolute;
        right: 50%;
        width: 50px;
        height: 50px;
        overflow: hidden;
        transition: 0.3s;
        transform: ${(props) =>
          props.cDeleteCheck ? "translateX(-30px)" : null};

        ::before {
          position: absolute;
          right: -11px;
          content: "🗑️";
        }
      }
      .t22 {
        position: absolute;
        left: 50%;
        width: 50px;
        height: 50px;
        overflow: hidden;
        transition: 0.3s;
        transform: ${(props) =>
          props.cDeleteCheck ? "translateX(30px)" : null};
        ::after {
          position: absolute;
          left: -11px;
          content: "🗑️";
        }
      }
    }
  }
`;

const DetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const textareaRef = useRef();
  const { search } = location;
  const postId = search.slice(1);
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentLender, setCommentLender] = useState(false);
  const [updateComment, setUpdateComment] = useState(content);
  const [commentToggle, setCommentToggle] = useState(false);
  const [cDeleteCheck, setCDeleteCheck] = useState(false);
  const [likeCheck, setLikeCheck] = useState(false);

  const { detailPage } = useSelector((state) => state.post);
  const { User } = detailPage[0];
  console.log(commentList);

  const handlerCommentList = async () => {
    const { status, data } = await commentListCall(postId);
    if (status) {
      setCommentList(data.comments);
      setCommentLender(false);
    }
  };

  const handlerCommentWrite = async () => {
    const { status } = await commentWrite({ postId, content });
    if (status) {
      setCommentLender(true);
      setContent("");
    }
  };

  //수정
  const handlerCommentEdit = async (commentId) => {
    const { status } = await commentUpdate({ commentId, content });
    if (status) {
    }
  };
  //삭제
  const handlerCommentDelete = async (commentId) => {
    const { status } = await commentDelete({ commentId });
    if (status) {
    }
  };

  const handlerCommentLike = async (commentId) => {
    const { status } = await commentLike({ commentId });
    if (status) {
      setLikeCheck(false);
      setCommentLender(true);
    }
  };

  useEffect(() => {
    const detailPostCall = async () => {
      const { status, data } = await postListCall();
      if (status) {
        dispatch(postlist({ list: data.postList }));
        dispatch(detailPageCall({ postId }));
      }
    };
    detailPostCall();
    handlerCommentList();

    return;
  }, [postId]);

  useEffect(() => {
    if (commentLender) {
      handlerCommentList();
    }
  }, [commentLender]);

  const resizeHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  return (
    <DetailPageBox className="cc" cDeleteCheck={cDeleteCheck}>
      <div className="pageBox">
        {detailPage.length > 0 ? <Page data={detailPage[0]} /> : null}
      </div>
      {/* 댓글 박스 */}
      <div className="createReply">
        <textarea
          placeholder="Description"
          className="ta"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="createReplyProfile replyIn cc">
          <img src="" alt="프사" />
        </div>
        <div className="createReplyB replyIn">
          <button onClick={() => handlerCommentWrite()}>reply</button>
        </div>
      </div>
      <div className="replyList cc">
        {commentList.length > 0 ? (
          commentList.map((data, index) => (
            <div className="replyHeader" key={index}>
              <div className="replyUserProfileBox">
                <img src={data.img} alt="Profile" />
              </div>
              <div className="replyUserBox">
                <div className="replyUserName">{data.User.nickname}</div>

                {commentToggle ? (
                  <div className="updateContentBox">
                    <textarea
                      ref={textareaRef}
                      className="pageUserDesc ta"
                      value={updateComment}
                      onChange={(e) => {
                        resizeHeight();
                        setUpdateComment(e.target.value);
                      }}
                    />
                    <button
                      className="pageUserDesc updateButton"
                      onClick={() => handlerCommentEdit()}
                    >
                      수정하기
                    </button>
                  </div>
                ) : (
                  <div className="replyUserDesc">{data.content}</div>
                )}
              </div>

              <div className="pageiconBox2">
                {postValidate(User.nickname) ? (
                  <div className="cc">
                    <div
                      className="icon2"
                      onClick={() => {
                        setCommentToggle(!commentToggle);
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-pen" />
                    </div>
                    <div
                      className="icon2 delete2"
                      onClick={(e) => {
                        if (!cDeleteCheck) {
                          setCDeleteCheck(true);
                        } else if (cDeleteCheck) {
                          handlerCommentDelete();
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (cDeleteCheck) {
                          setCDeleteCheck(false);
                        }
                      }}
                    >
                      <div className="t11 cc" />
                      {cDeleteCheck ? "삭제?" : null}
                      <div className="t22 cc" />
                    </div>
                  </div>
                ) : null}

                <div
                  className="icon2 likeButton"
                  onClick={() => handlerCommentLike()}
                >
                  {likeCheck ? (
                    <FontAwesomeIcon
                      icon="fa-solid fa-heart"
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon="fa-heart-circle-plus" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>작성된 댓글이 없습니다!</div>
        )}
      </div>
    </DetailPageBox>
  );
};

export default DetailPage;
