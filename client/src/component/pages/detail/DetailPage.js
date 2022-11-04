import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { commentListCall, commentWrite } from "../../../api/comment";
import { postListCall } from "../../../api/post";
import { detailPageCall, postlist } from "../../../store/slice";
import Comment from "../../common/comment/Comment";
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
`;

const DetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;
  const postId = search.slice(1);
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentLender, setCommentLender] = useState(false);

  const { detailPage } = useSelector((state) => state.post);
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

  return (
    <DetailPageBox className="cc">
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
      {commentList.length > 0 ? (
        commentList.map((comment, index) => (
          <Comment
            key={index}
            postId={postId}
            comment={comment}
            commentLender={commentLender}
            setCommentLender={setCommentLender}
          />
        ))
      ) : (
        <div>작성된 댓글이 없습니다!</div>
      )}
    </DetailPageBox>
  );
};

export default DetailPage;
