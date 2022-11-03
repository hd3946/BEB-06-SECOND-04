import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { postListCall } from "../../../api/post";
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
`;

const DetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;
  const postId = search.slice(1);
  const [content, setContent] = useState("");

  const { nickname, img } = useSelector((state) => state.user);
  const { detailPage, commentList } = useSelector((state) => state.post);

  // 댓글 작성
  const commentWrite = () => {
    axios
      .delete(
        `http://localhost:3005/comment/write`,
        {
          nickname,
          content,
          img,
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };

  //수정
  const commentEdit = () => {
    axios
      .put(
        `http://localhost:3005/comment/edit`,
        {
          content: "수정한 comment",
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };
  //삭제
  const commentDelete = () => {
    axios
      .delete(
        `http://localhost:3005/comment/delete`,
        {
          commentId: "선택한 contentId",
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const test = async () => {
      const { data } = await postListCall();
      dispatch(postlist({ list: data.postList.reverse() }));
      dispatch(detailPageCall({ postId }));
    };
    test();
    return;
  }, [postId]);

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
          <button onClick={() => commentWrite()}>reply</button>
        </div>
      </div>
      <div className="replyList cc">
        {/* page 컴포넌트 사용 고려하기 */}
        {commentList.length > 0 ? (
          commentList.map((data, index) => (
            <div className="replyHeader" key={index}>
              <div className="replyUserProfileBox">
                <img src={data.img} alt="Profile" />
              </div>
              <div className="replyUserBox">
                <div className="replyUserName">{data.nickname}</div>
                <div className="replyUserDesc">{data.comment}</div>
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
