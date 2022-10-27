import React from "react";
import styled from "styled-components";
import Page from "../../common/Page";

const DetailPageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;

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
      resize: none;
      overflow: hidden;
      border: 2px solid rgba(110, 110, 110, 0.8);
    }
    .replyIn {
      position: absolute;
    }
    .createReplyProfile {
      display: flex;
      justify-content: center;
      align-items: center;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 25px;
    .replyHeader {
      display: flex;
      width: 600px;
      margin-top: 30px;
      .replyUserProfileBox {
        /* display: flex;
        justify-content: center;
        align-items: center; */
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
  return (
    <DetailPageBox>
      <div className="pageBox">
        <Page pos="detail" />
      </div>
      <div className="createReply">
        <textarea placeholder="Description" />
        <div className="createReplyProfile replyIn">
          <img src="" alt="프사" />
        </div>
        <div className="createReplyB replyIn">
          <button>reply</button>
        </div>
      </div>
      <div className="replyList">
        {[1, 2, 3].map((data, index) => (
          <div className="replyHeader" key={index}>
            <div className="replyUserProfileBox">
              <img src="" alt="Profile" />
            </div>
            <div className="replyUserBox">
              <div className="replyUserName">Test User Name</div>
              <div className="replyUserDesc">Test User Description Test</div>
            </div>
          </div>
        ))}
      </div>
    </DetailPageBox>
  );
};

export default DetailPage;
