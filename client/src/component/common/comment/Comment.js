import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  commentDelete,
  commentLike,
  commentUpdate,
} from "../../../api/comment";
import { loginInfo, postValidate } from "../../../libs/validate";

const CommentBox = styled.div`
  .replyList {
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
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
        .updateContentBox {
          width: 100%;

          button {
            border: 1px solid black;
            background-color: #f4fff7;
            margin-left: 3px;
          }
        }
        .pageUserDesc {
          width: 100%;
        }
      }
    }
  }
  .commentEtcBox {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .commentLBox {
      display: flex;
      align-items: center;
      height: 50px;
      margin: 0px 25px 0px 10px;
      font-weight: 500;
    }
    .commenticonBox {
      display: flex;
      .commentIcon {
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

      .commentDelete {
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
        color: red;
        font-weight: 700;
        :hover {
          background-color: rgba(255, 0, 0, 0.3);
        }

        .ctB {
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
        .ctA {
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
  }
`;

const Comment = ({ comment, postId, commentLender, setCommentLender }) => {
  const { User, content, commentId, CommentLikes } = comment;

  const [commentLikeCheck, setCommentLikeCheck] = useState(false);
  const [updateComment, setUpdateComment] = useState(content);
  const [commentToggle, setCommentToggle] = useState(false);
  const [cDeleteCheck, setCDeleteCheck] = useState(false);

  //수정
  const handlerCommentEdit = async () => {
    const { status } = await commentUpdate({
      commentId,
      content: updateComment,
    });
    setCommentToggle(false);
    if (status) {
      window.location.href = `/detail?${postId}`;
    }
  };
  //삭제
  const handlerCommentDelete = async () => {
    const { status } = await commentDelete({ commentId });
    if (status) {
      window.location.href = `/detail?${postId}`;
    }
  };

  const handlerCommentLike = async () => {
    const { status } = await commentLike(commentId);
    if (status) {
      setCommentLikeCheck(!commentLikeCheck);
      setCommentLender(true);
    }
  };

  useEffect(() => {
    const signData = loginInfo();
    if (!commentLikeCheck && signData) {
      for (let like of CommentLikes) {
        if (like.User.nickname === signData.nickname) {
          setCommentLikeCheck(true);
          return;
        }
      }
    }
  }, [CommentLikes]);

  return (
    <CommentBox cDeleteCheck={cDeleteCheck}>
      <div className="replyList cc">
        <div className="replyHeader">
          <div className="replyUserProfileBox">
            <img src={User.profileurl} alt="Profile" />
          </div>
          <div className="replyUserBox">
            <div className="replyUserName">{User.nickname}</div>

            {commentToggle ? (
              <div className="updateContentBox">
                <textarea
                  className="pageUserDesc ta"
                  value={updateComment}
                  onChange={(e) => {
                    setUpdateComment(e.target.value);
                  }}
                />
                <button
                  className="pageUserDesc updateButton"
                  onClick={() => handlerCommentEdit()}
                >
                  댓글 수정
                </button>
              </div>
            ) : (
              <div className="pageUserDesc">{content}</div>
            )}
          </div>
        </div>
        <div className="commentEtcBox">
          <div className="commentLBox cc">
            <div className="count">{CommentLikes.length} Likes</div>
          </div>
          <div className="commenticonBox">
            {postValidate(User.nickname) ? (
              <div className="cc">
                <div
                  className="commentIcon"
                  onClick={() => {
                    setCommentToggle(!commentToggle);
                  }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-pen" />
                </div>
                <div
                  className="commentIcon commentDelete"
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
                  <div className="ctB cc" />
                  {cDeleteCheck ? "삭제?" : null}
                  <div className="ctA cc" />
                </div>
              </div>
            ) : null}

            <div
              className="commentIcon likeButton"
              onClick={() => handlerCommentLike()}
            >
              {commentLikeCheck ? (
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
      </div>
    </CommentBox>
  );
};

export default Comment;
