import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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
  const location = useLocation();
  const { pageId, data } = location.state;
  console.log(location);

  const [comment, setComment] = useState("");

  const { nickname, img } = useSelector((state) => state.user);
  const { commentList } = useSelector((state) => state.post);
  console.log(commentList);

  // 댓글 작성
  const commentWrite = () => {
    axios
      .delete(
        `http://localhost:3005/comment/write`,
        {
          nickname,
          comment,
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
  const commentUpdate = () => {
    axios
      .put(
        `http://localhost:3005/comment/edit`,
        {
          comment: "수정한 comment",
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
  // localStorage.setItem("text", "data");
  // console.log(localStorage);
  //  console.log(document.cookie);
  return (
    <DetailPageBox className="cc">
      <div className="pageBox">
        <Page pos="detail" data={data} />
      </div>
      {/* 댓글 박스 */}
      <div className="createReply">
        <textarea
          placeholder="Description"
          className="ta"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
        {commentList.length > 0
          ? commentList.map((data, index) => (
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
          : null}
      </div>
    </DetailPageBox>
  );
};

export default DetailPage;
